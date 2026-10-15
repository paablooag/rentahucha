#!/usr/bin/env bash
# Preparación inicial del VPS (Ubuntu 24.04). Se ejecuta una sola vez como root:
#   ssh root@IP 'bash -s -- rentahucha.es tu@correo.es' < deploy/setup-server.sh
# Es idempotente: se puede volver a lanzar sin romper nada.
set -euo pipefail

DOMAIN="${1:?Uso: setup-server.sh dominio email}"
EMAIL="${2:-}"  # Correo para avisos de Let's Encrypt; sin él no se pide el certificado
APP=rentahucha
BASE=/opt/$APP

export DEBIAN_FRONTEND=noninteractive

echo "==> Sistema al día y paquetes básicos"
apt-get update -y
apt-get upgrade -y
apt-get install -y curl ca-certificates gnupg ufw nginx certbot python3-certbot-nginx unattended-upgrades rsync

echo "==> Actualizaciones de seguridad automáticas"
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "==> Swap de 2 GB (colchón de memoria)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Node.js 22 LTS"
if ! command -v node >/dev/null || [[ "$(node -v)" != v22* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
node -v

echo "==> Usuario sin privilegios para la web"
id -u $APP >/dev/null 2>&1 || useradd --system --create-home --home-dir $BASE --shell /usr/sbin/nologin $APP
mkdir -p $BASE/releases $BASE/shared/.data $BASE/backups
chown -R $APP:$APP $BASE
chmod 750 $BASE

echo "==> Variables de entorno (se crean una vez; el despliegue no las toca)"
if [[ ! -f $BASE/shared/.env ]]; then
  ADMIN_PASS="$(openssl rand -base64 18 | tr -d '/+=' | cut -c1-20)"
  SESSION="$(openssl rand -hex 32)"
  cat > $BASE/shared/.env <<EOF
NODE_ENV=production
HOST=127.0.0.1
PORT=3000
NUXT_ADMIN_USER=paablooag
NUXT_ADMIN_PASSWORD=$ADMIN_PASS
NUXT_SESSION_PASSWORD=$SESSION
EOF
  chown $APP:$APP $BASE/shared/.env
  chmod 600 $BASE/shared/.env
  echo "$ADMIN_PASS" > /root/rentahucha-admin-password.txt
  chmod 600 /root/rentahucha-admin-password.txt
  echo "    Contraseña del panel guardada en /root/rentahucha-admin-password.txt"
fi

echo "==> Servicio systemd"
cat > /etc/systemd/system/$APP.service <<EOF
[Unit]
Description=RentaHucha (Nuxt)
After=network.target

[Service]
Type=simple
User=$APP
Group=$APP
# Los datos (.data/db) quedan en shared/ y sobreviven a cada despliegue.
WorkingDirectory=$BASE/shared
EnvironmentFile=$BASE/shared/.env
ExecStart=/usr/bin/node $BASE/current/server/index.mjs
Restart=always
RestartSec=3
# Endurecimiento básico
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$BASE/shared
MemoryMax=900M

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable $APP >/dev/null

echo "==> Nginx como proxy inverso"
cat > /etc/nginx/sites-available/$APP <<EOF
server {
  listen 80;
  listen [::]:80;
  server_name $DOMAIN www.$DOMAIN;

  client_max_body_size 2m;
  server_tokens off;
  add_header X-Content-Type-Options nosniff always;
  add_header Referrer-Policy strict-origin-when-cross-origin always;
  add_header X-Frame-Options SAMEORIGIN always;

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml text/plain;

  # Ficheros con hash: caché larga.
  location /_nuxt/ {
    proxy_pass http://127.0.0.1:3000;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    # Se sobrescribe con la IP real: el cliente no puede falsearla para saltarse los límites.
    proxy_set_header X-Forwarded-For \$remote_addr;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
EOF
ln -sf /etc/nginx/sites-available/$APP /etc/nginx/sites-enabled/$APP
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> Cortafuegos: solo SSH y web"
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null
ufw status | head -5

echo "==> Copia diaria de los datos (se guardan 30 días)"
cat > /etc/cron.daily/$APP-backup <<EOF
#!/bin/sh
tar -czf $BASE/backups/data-\$(date +%F).tar.gz -C $BASE/shared .data 2>/dev/null
find $BASE/backups -name 'data-*.tar.gz' -mtime +30 -delete
EOF
chmod +x /etc/cron.daily/$APP-backup

echo "==> HTTPS con Let's Encrypt (si el dominio ya apunta aquí)"
SERVER_IP="$(curl -s4 https://ifconfig.me || true)"
DNS_IP="$(getent ahostsv4 $DOMAIN | awk 'NR==1{print $1}' || true)"
if [[ -z "$EMAIL" ]]; then
  echo "    Sin correo: HTTPS pendiente. Repite el script con el correo cuando el DNS apunte aquí."
elif [[ -n "$SERVER_IP" && "$SERVER_IP" == "$DNS_IP" ]]; then
  certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m "$EMAIL" --redirect
else
  echo "    El dominio ($DNS_IP) aún no apunta a este servidor ($SERVER_IP). Repite este script cuando el DNS esté listo."
fi

echo "==> Listo"
