# Backlog técnico y de contenido

Tareas de producto, código y contenido que Claude puede avanzar desde el código (también desde Claude Code en la web).
Lo que depende de Pablo, de datos del panel o de captación está en el tablero privado del panel (Admin → Tareas), no aquí:
este repositorio es público.

Al terminar una tarea, muévela a «Hecho» con la fecha y una línea de qué se hizo.

## Con fecha

- [ ] 13-11-2026: resultado de la convalidación del RDL 29/2026 → actualizar artículos «pendiente de convalidación», calculadora del IRPF, banners y textos de captación.
- [ ] **Después del 12-11-2026**: actualizar los artículos sobre la votación de los decretos de vivienda con el resultado (buscar fuente oficial antes de escribir; posición neutral).
- [ ] **Después del 29-11-2026**: actualizar los artículos sobre las elecciones con los resultados oficiales.
- [ ] **Cuando se publique en el BOE la resolución de zonas tensionadas del tercer trimestre de 2026** (prevista a finales de octubre): revisar `shared/utils/cities.ts` y `CITIES_CHECKED` con la página del Ministerio (consultar zonas de mercado residencial tensionado).

## Producto

- [ ] Mapa aproximado por barrio en la ficha del piso (sin dirección exacta).
- [ ] Pruebas automáticas de los flujos clave (registro, publicar piso, chat, valoración) con Playwright en GitHub Actions antes del despliegue.

## Contenido y SEO

- [ ] Cuando la encuesta del alquiler tenga 20 respuestas o más: artículo con los resultados (datos propios, citando el número de respuestas).
- [ ] Ampliar las guías por ciudad a más ciudades medianas con datos oficiales (fianza y zona tensionada), sin cifras de precios inventadas.
- [ ] Prueba social solo con datos reales (pisos publicados, propietarios en la plataforma) cuando existan; nunca testimonios inventados.

## Hecho

- 2026-10-22 · Calculadora de la reducción del IRPF por alquiler (/herramientas/reduccion-irpf-alquiler), destacada en portada y propietarios.
- 2026-10-22 · Reducción del IRPF del RDL 29/2026 (hasta el 100 % desde el 1-12-2026): artículo nuevo y cifras corregidas en 10 sitios.
- 2026-10-22 · Artículos «¿Es Madrid zona tensionada?» y «¿Cuánto cobra una inmobiliaria por gestionar tu alquiler?»; artículos de la convalidación completados.
- 2026-10-22 · El despliegue se salta los commits que ya no son el último de main (evita despliegues fuera de orden).
- 2026-10-21 · Search Console en el panel (Admin → Google): sincronización cada 6 h con cuenta de servicio de solo lectura; oportunidades y páginas sin clics.
- 2026-10-21 · Datos obligatorios del anuncio (art. 20 RDL 29/2026) en formulario, ficha, panel y generador; 3 artículos sobre las nuevas obligaciones.
- 2026-10-21 · Revisión del responsive de toda la web (320-1440 px) y del panel; /panel y /pasaporte redirigen a sus demos.
- 2026-10-21 · Artículo del límite del 2 % reescrito según Search Console (82 impresiones, 0 clics).
- 2026-10-21 · Cuentas de inmobiliaria: registro con nombre comercial, hasta 300 pisos, marca en anuncios y tarjetas; /inmobiliarias lleva al registro.
- 2026-10-20 · Recordatorio único al propietario cuando un interesado lleva 48 h sin respuesta.
- 2026-10-20 · Alertas de pisos por correo (máx. una al día, baja en un clic) y demanda real por ciudad para propietarios (desde 5 personas).
- 2026-10-20 · Portal /alquiler (64 ciudades), guía del modelo oficial de contrato, CTA dentro de los artículos y artículos sobre el 29-N.
- 2026-10-20 · Captación B2B en el panel y cartel con QR.

- 2026-10-20 · Correo transaccional con diseño de marca (Brevo) y recuperación de contraseña.
- 2026-10-20 · Cinco páginas con formulario: valoración, test, generador de anuncios, carta de inquilino y encuesta.
- 2026-10-18 · Plataforma beta: cuentas, pisos con revisión, buscador, chat con visitas, perfil de inquilino, favoritos y denuncias.
