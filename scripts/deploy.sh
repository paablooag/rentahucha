#!/usr/bin/env bash
# Despliegue al VPS: compila en local, sube el build y cambia de versión sin tocar los datos.
#   DEPLOY_HOST=1.2.3.4 bash scripts/deploy.sh
# Opcional: DEPLOY_USER (por defecto root) y DEPLOY_KEY (por defecto ~/.ssh/rentahucha_vps).
set -euo pipefail

HOST="${DEPLOY_HOST:?Define DEPLOY_HOST con la IP del servidor}"
USER="${DEPLOY_USER:-root}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/rentahucha_vps}"
APP=rentahucha
BASE=/opt/$APP
RELEASE="$(date +%Y%m%d%H%M%S)"
SSH=(ssh -i "$KEY" -o StrictHostKeyChecking=accept-new "$USER@$HOST")

cd "$(dirname "$0")/.."

echo "==> Compilando"
npx nuxt build >/dev/null

echo "==> Empaquetando"
tar -czf /tmp/$APP-$RELEASE.tgz -C .output .

echo "==> Subiendo versión $RELEASE"
scp -i "$KEY" -o StrictHostKeyChecking=accept-new /tmp/$APP-$RELEASE.tgz "$USER@$HOST:/tmp/"
rm -f /tmp/$APP-$RELEASE.tgz

"${SSH[@]}" bash -s <<EOF
set -euo pipefail
mkdir -p $BASE/releases/$RELEASE
tar -xzf /tmp/$APP-$RELEASE.tgz -C $BASE/releases/$RELEASE
rm -f /tmp/$APP-$RELEASE.tgz
chown -R $APP:$APP $BASE/releases/$RELEASE
ln -sfn $BASE/releases/$RELEASE $BASE/current
systemctl restart $APP
sleep 3
systemctl is-active --quiet $APP || { journalctl -u $APP -n 30 --no-pager; exit 1; }
curl -fsS -o /dev/null http://127.0.0.1:3000/ && echo "    Web respondiendo"
# Se conservan las 5 últimas versiones para poder volver atrás.
ls -1dt $BASE/releases/* | tail -n +6 | xargs -r rm -rf
EOF

echo "==> Desplegado: versión $RELEASE"
