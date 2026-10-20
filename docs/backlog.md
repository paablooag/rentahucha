# Backlog técnico y de contenido

Tareas de producto, código y contenido que Claude puede avanzar desde el código (también desde Claude Code en la web).
Lo que depende de Pablo, de datos del panel o de captación está en el tablero privado del panel (Admin → Tareas), no aquí:
este repositorio es público.

Al terminar una tarea, muévela a «Hecho» con la fecha y una línea de qué se hizo.

## Con fecha

- [ ] **Después del 12-11-2026**: actualizar los artículos sobre la votación de los decretos de vivienda con el resultado (buscar fuente oficial antes de escribir; posición neutral).
- [ ] **Después del 29-11-2026**: actualizar los artículos sobre las elecciones con los resultados oficiales.
- [ ] **Cuando se publique en el BOE la resolución de zonas tensionadas del tercer trimestre de 2026** (prevista a finales de octubre): revisar `shared/utils/cities.ts` y `CITIES_CHECKED` con la página del Ministerio (consultar zonas de mercado residencial tensionado).

## Producto

- [ ] Alertas de búsqueda por correo para inquilinos: guardar una búsqueda en /pisos y avisar (máx. 1 correo al día) cuando se publique un piso que encaje. Con baja en un clic.
- [ ] Recordatorio por correo al propietario si un interesado lleva 48 h sin respuesta.
- [ ] Mapa aproximado por barrio en la ficha del piso (sin dirección exacta).
- [ ] Cuenta de tipo inmobiliaria (varios pisos, nombre comercial) sin inventar condiciones ni precios para agencias.
- [ ] Pruebas automáticas de los flujos clave (registro, publicar piso, chat, valoración) con Playwright en GitHub Actions antes del despliegue.

## Contenido y SEO

- [ ] Cuando la encuesta del alquiler tenga 20 respuestas o más: artículo con los resultados (datos propios, citando el número de respuestas).
- [ ] Ampliar las guías por ciudad a más ciudades medianas con datos oficiales (fianza y zona tensionada), sin cifras de precios inventadas.
- [ ] Prueba social solo con datos reales (pisos publicados, propietarios en la plataforma) cuando existan; nunca testimonios inventados.

## Hecho

- 2026-10-20 · Correo transaccional con diseño de marca (Brevo) y recuperación de contraseña.
- 2026-10-20 · Cinco páginas con formulario: valoración, test, generador de anuncios, carta de inquilino y encuesta.
- 2026-10-18 · Plataforma beta: cuentas, pisos con revisión, buscador, chat con visitas, perfil de inquilino, favoritos y denuncias.
