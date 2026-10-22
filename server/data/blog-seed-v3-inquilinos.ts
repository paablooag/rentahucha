import type { BlogPost } from '#shared/utils/blog'

// Tercera tanda (versión 3): decoración y consejos prácticos para inquilinos.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-15'

export const BLOG_SEED_V3_INQUILINOS: Seed[] = [
  {
    slug: 'decorar-piso-de-alquiler-sin-agujeros',
    title: 'Cómo decorar un piso de alquiler sin hacer agujeros',
    excerpt: 'Ganchos adhesivos, baldas de apoyo, lámparas de pie y textiles: ideas para hacerlo tuyo y recuperar la fianza.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Quieres que tu piso se sienta tuyo sin arriesgar la fianza. Se puede.

## Para colgar sin taladrar

- **Tiras y ganchos adhesivos** que se quitan sin dejar marca, para cuadros ligeros.
- **Cuadros apoyados** sobre una balda o un mueble: queda muy actual.
- **Rieles de cortina** de presión, sin tornillos.
- **Barras extensibles** en armarios y duchas.

## Iluminación sin obras

- Lámparas de pie y de mesa con luz cálida.
- Tiras LED con adhesivo bajo los muebles.
- Bombillas inteligentes para crear ambientes.

## Textiles que transforman

- Una alfombra grande delimita el salón.
- Cortinas largas, desde casi el techo, para que parezca más alto.
- Una funda de sofá o un plaid si no te gusta el del piso.
- Cojines en dos o tres colores combinados.

## Muebles que suman

- Una estantería de pie para libros y plantas.
- Biombos para separar ambientes.
- Espejos de suelo, que no hace falta colgar.

## Antes de irte

Retira los adhesivos con calor suave (secador) y tirando en paralelo a la pared.`,
  },
  {
    slug: 'ideas-para-que-un-piso-de-alquiler-parezca-tuyo',
    title: '10 ideas para que un piso de alquiler parezca tuyo',
    excerpt: 'Pequeños cambios con mucho efecto: plantas, luz, arte, olores y orden. Sin obras ni gastos grandes.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Un piso de alquiler puede sentirse como un hogar sin cambiar nada permanente.

1. **Plantas**: dan vida desde el primer día. Empieza por especies resistentes.
2. **Luz cálida**: cambia las bombillas frías por otras de 2.700 K.
3. **Arte y fotos**: en marcos apoyados o con adhesivos.
4. **Textiles propios**: ropa de cama, cojines y mantas que te gusten.
5. **Una alfombra**: aporta calidez y reduce el ruido.
6. **Libros a la vista**: personalizan cualquier estantería.
7. **Un rincón favorito**: un sillón, una lámpara y una mesita.
8. **Olor propio**: velas, ambientador natural o flores frescas.
9. **Orden y almacenaje**: cajas bonitas y cestas.
10. **Detalles de cocina**: botes de cristal, una tabla de madera y un frutero.

## Truco

Elige **dos o tres colores** para todos los complementos: el piso parecerá pensado, aunque los muebles no sean tuyos.

## Lo que se va contigo

Todo lo de la lista se lleva en la mudanza. Inviertes en tu casa, no en el piso del propietario.`,
  },
  {
    slug: 'iluminacion-calida-en-pisos-de-alquiler',
    title: 'Iluminación cálida: el cambio más barato para tu piso de alquiler',
    excerpt: 'Qué bombillas usar, dónde poner lámparas y cómo crear ambiente sin tocar la instalación.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Muchos pisos de alquiler tienen una única lámpara de techo con luz fría. Es lo primero que conviene cambiar.

## Las bombillas

- **2.700 K** (cálida) para el salón y los dormitorios.
- **3.000–4.000 K** para la cocina y el baño.
- LED regulables para bajar la intensidad por la noche.

## Iluminación en capas

1. **General**: la del techo, más tenue.
2. **Ambiental**: lámparas de pie y de mesa.
3. **Puntual**: lectura, escritorio o cocina.

## Ideas sin obras

- Lámpara de pie junto al sofá.
- Lámpara de mesa en la mesilla y en el mueble del salón.
- Tira LED con adhesivo bajo los muebles de cocina.
- Guirnaldas de luz en la terraza.

## Ahorro

Las LED consumen mucho menos y te las llevas al mudarte. Guarda las bombillas originales para dejarlas al irte.`,
  },
  {
    slug: 'organizar-cocina-pequena-de-alquiler',
    title: 'Cómo organizar una cocina pequeña de alquiler',
    excerpt: 'Más espacio sin obras: organizadores, barras, carritos y el método para despejar la encimera.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Las cocinas de alquiler suelen ser pequeñas. Con organización, rinden mucho más.

## Despeja primero

- Deja en la encimera solo lo que usas cada día.
- Dona los duplicados.
- Agrupa por usos: desayuno, cocinar y conservar.

## Organizadores sin taladrar

- **Estantes elevadores** dentro de los armarios para tener dos niveles.
- **Organizadores extraíbles** bajo el fregadero.
- **Barras adhesivas** o de presión para utensilios.
- **Botes herméticos** apilables y transparentes.
- **Carrito auxiliar** con ruedas.

## Aprovecha la vertical

- Ganchos en el interior de las puertas.
- Balda sobre el fregadero apoyada o con adhesivo resistente.
- Imán de cuchillos con adhesivo (comprueba antes la superficie).

## Mantener el orden

Una regla sencilla: la encimera, despejada cada noche. Tardas dos minutos y la cocina parece el doble de grande.`,
  },
  {
    slug: 'bano-de-alquiler-lavado-de-cara-sin-obras',
    title: 'Baño de alquiler: lavado de cara sin obras',
    excerpt: 'Cortina, alfombra, toallas, organizadores y luz: transforma un baño anticuado sin tocar azulejos.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `El baño suele ser la estancia más anticuada del piso alquilado. Estos cambios no necesitan permiso.

## Cambios rápidos

- **Cortina de ducha** de tela lisa, en blanco o lino.
- **Toallas** de un mismo color: el efecto hotel es inmediato.
- **Alfombra de baño** de algodón o de secado rápido.
- **Dispensadores** de jabón iguales.
- **Cestas** para el almacenaje a la vista.

## Más espacio

- Estantería sobre el inodoro, de pie, sin taladrar.
- Organizador para la puerta.
- Cestas bajo el lavabo.

## Luz y espejo

Si la luz del baño es pobre, añade un espejo con luz LED de pilas o recargable.

## Antes de pintar azulejos o cambiar grifos

Pide permiso **por escrito** al propietario. Y si hay un problema de humedad o una fuga, avísale: la reparación le corresponde. Lee [qué hacer si el casero no hace reparaciones](/blog/casero-no-hace-reparaciones-que-hacer).`,
  },
  {
    slug: 'plantas-para-pisos-con-poca-luz',
    title: 'Plantas para pisos con poca luz: 8 opciones casi indestructibles',
    excerpt: 'Potos, sansevieria, zamioculca y más: plantas que aguantan interiores oscuros y olvidos de riego.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `No hace falta un ático luminoso para tener plantas.

## Las más resistentes

| Planta | Luz | Riego |
|---|---|---|
| Potos | Poca o media | Cuando la tierra esté seca |
| Sansevieria (lengua de suegra) | Poca | Muy escaso |
| Zamioculca | Poca | Muy escaso |
| Aspidistra | Muy poca | Moderado |
| Espatifilo | Poca o media | Le gusta la humedad |
| Filodendro | Media | Moderado |
| Calathea | Indirecta | Humedad constante |
| Helecho de Boston | Indirecta | Frecuente, con ambiente húmedo |

## Consejos

- **El exceso de riego** mata más plantas que la sequía.
- Macetas con agujero y un plato debajo.
- Gira la planta de vez en cuando hacia la luz.
- Si tienes mascotas, comprueba que la planta no es tóxica para ellas.

## Decorar con plantas

Agrupa plantas de distintas alturas en un rincón: crean un punto focal y se cuidan mejor juntas.`,
  },
  {
    slug: 'muebles-que-sobreviven-a-cualquier-mudanza',
    title: 'Muebles que sobreviven a cualquier mudanza',
    excerpt: 'Modulares, plegables y de medidas estándar: qué comprar si cambias de piso cada pocos años.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Si alquilas, probablemente te mudarás varias veces. Conviene comprar pensando en eso.

## Lo que funciona

- **Estanterías modulares** que se adaptan a paredes distintas.
- **Sofás desenfundables** y desmontables, o sofás cama.
- **Mesas extensibles** para pisos pequeños.
- **Camas con cajones**: almacenaje extra.
- **Medidas estándar**: un colchón de 135 o 150 cm cabe en casi todos los dormitorios.
- **Muebles con patas** desmontables.

## Lo que da problemas

- Muebles enormes a medida.
- Aglomerado de mala calidad que no aguanta montarlo y desmontarlo.
- Sofás de una pieza que no pasan por las escaleras.

## Antes de comprar

Mide puertas, ascensor y escalera del piso actual y piensa en el siguiente.

## Segunda mano

Las plataformas de segunda mano permiten comprar y vender barato en cada mudanza.`,
  },
  {
    slug: 'teletrabajar-en-un-piso-pequeno',
    title: 'Teletrabajar en un piso pequeño: cómo montar tu rincón',
    excerpt: 'Escritorios plegables, luz, ergonomía y separar trabajo y descanso cuando no tienes despacho.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Teletrabajar en el sofá pasa factura. Con poco espacio también se puede montar un buen rincón.

## Dónde ponerlo

- Junto a una ventana, con la luz de lado, no de frente ni detrás de la pantalla.
- En un hueco del salón separado con una estantería.
- En el dormitorio, solo si puedes "cerrarlo" al terminar.

## Lo esencial

- **Silla** con respaldo regulable: es la inversión más importante.
- **Mesa** a la altura adecuada: los codos a 90°.
- **Pantalla** a la altura de los ojos, con un soporte o una pila de libros.
- **Lámpara** de escritorio de luz neutra.
- **Buena conexión**: pregunta antes de alquilar si llega la fibra.

## Si no hay sitio

- Escritorio plegable de pared, de pie o con adhesivo resistente.
- Un carrito para guardar el portátil y los papeles al final del día.

## Separar trabajo y vida

Recoge al terminar. Ver el ordenador desde el sofá alarga la jornada sin darte cuenta.

## Gastos

Si eres autónomo, consulta qué parte de los suministros puedes deducir por trabajar en casa.`,
  },
  {
    slug: 'pintar-piso-de-alquiler-permiso',
    title: '¿Puedo pintar mi piso de alquiler? Permiso y cómo hacerlo bien',
    excerpt: 'Qué dice la ley, cómo pedir permiso y qué pasa con el color al terminar el contrato.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Pintar cambia por completo un piso. Pero al ser de otra persona, conviene hacerlo bien.

## ¿Necesitas permiso?

La LAU exige consentimiento por escrito para las obras que **modifican la configuración** de la vivienda. Pintar no suele considerarse así, pero:

- **Revisa tu contrato**: muchos piden avisar o devolver el piso en el mismo color.
- **Pide permiso por escrito**, aunque sea por email. Evita discusiones con la fianza.

## Cómo pedirlo

"Hola, me gustaría pintar el salón en un tono [color]. Me encargo del coste y, si lo prefieres, lo devolveré en blanco al terminar el contrato."

## Colores seguros

Blancos rotos, grises suaves y beige: es más probable que el propietario acepte, y más fácil volver al original.

## Hazlo bien

- Protege suelos y enchufes.
- Usa pintura lavable de calidad.
- Guarda la referencia del color original.

## Al irte

Si el acuerdo era devolverlo en el color original, hazlo: si no, pueden descontártelo de la fianza.`,
  },
  {
    slug: 'ahorrar-en-la-factura-de-la-luz-inquilinos',
    title: 'Cómo ahorrar en la factura de la luz si vives de alquiler',
    excerpt: 'Potencia, tarifa, horas y hábitos: lo que puedes cambiar tú aunque el piso no sea tuyo.',
    audience: 'inquilinos',
    category: 'Ahorro',
    publishedAt: D,
    body: `No puedes cambiar las ventanas, pero sí muchas cosas que bajan la factura.

## 1. Revisa la potencia contratada

Muchos pisos tienen más potencia de la necesaria. Si nunca salta el automático, quizá puedas bajarla. Cada kW de menos reduce el término fijo.

## 2. Elige la tarifa

- **Regulada (PVPC)**: precio variable por horas.
- **Mercado libre**: precio fijo o por tramos.

Compara con el comparador oficial de la CNMC y tus consumos reales.

## 3. Desplaza los consumos

Si tu tarifa tiene horas más baratas, programa la lavadora y el lavavajillas en esas franjas.

## 4. Hábitos con efecto

- Lavadora en frío y a carga completa.
- Tapa en las ollas.
- Apaga del todo los aparatos en espera.
- Frigorífico a 4–5 °C y congelador a −18 °C.
- Bombillas LED.

## 5. Bono social

Si cumples los requisitos de renta o situación familiar, puedes pedir el **bono social eléctrico**. Infórmate en tu comercializadora de referencia.

## Si el titular es el propietario

Pide ver las facturas y acordad cualquier cambio de potencia o tarifa.`,
  },
  {
    slug: 'calefaccion-barata-en-invierno-piso-alquiler',
    title: 'Calefacción barata en invierno: trucos para un piso de alquiler',
    excerpt: 'Burletes, cortinas térmicas, alfombras y temperaturas: cómo pasar el invierno caliente sin disparar la factura.',
    audience: 'inquilinos',
    category: 'Ahorro',
    publishedAt: D,
    body: `Muchos pisos de alquiler pierden calor por ventanas y puertas. Estos trucos no necesitan obras.

## Frena las fugas

- **Burletes adhesivos** en puertas y ventanas.
- **Burlete bajo la puerta** de entrada.
- **Cortinas gruesas o térmicas**: ciérralas al anochecer.
- **Alfombras** en suelos fríos.

## Aprovecha el sol

Sube las persianas en las horas de sol y bájalas al anochecer.

## Temperatura

- **19–21 °C** de día y 15–17 °C de noche.
- Cada grado de más aumenta notablemente el consumo.
- Termostato programable, si el sistema lo permite.

## Según tu sistema

| Sistema | Consejo |
|---|---|
| Radiadores de agua | Purga a principios de invierno y no los tapes |
| Bomba de calor | Temperatura estable y filtros limpios |
| Radiadores eléctricos | Solo en la estancia donde estás |

## Ojo con la humedad

Ventila 10 minutos al día, aunque haga frío: evita la condensación y el moho.

## Si el piso es imposible de calentar

Si hay ventanas rotas o la calefacción no funciona, comunícalo al propietario por escrito: le corresponde repararlo.`,
  },
  {
    slug: 'calor-en-verano-sin-aire-acondicionado',
    title: 'Cómo combatir el calor en verano sin aire acondicionado',
    excerpt: 'Persianas, ventilación cruzada, ventiladores y textiles frescos para pisos sin climatización.',
    audience: 'inquilinos',
    category: 'Ahorro',
    publishedAt: D,
    body: `Si tu piso no tiene aire acondicionado, el verano puede hacerse largo. Estas medidas ayudan de verdad.

## De día: que no entre el calor

- **Persianas bajadas y ventanas cerradas** en las horas de sol.
- **Toldos o láminas** si el propietario lo permite.
- **Cortinas claras** que reflejen la luz.

## De noche: ventilación cruzada

Abre ventanas en fachadas opuestas en las horas frescas, de madrugada o temprano por la mañana.

## Ventiladores

- **De techo**: muy eficientes. Pide permiso para instalarlo.
- **De pie**: colócalos cerca de la ventana para meter el aire fresco.
- Truco: una botella congelada delante del ventilador.

## Reduce el calor interior

- Cocina temprano o en frío.
- Apaga los aparatos que no uses.
- Bombillas LED.

## Textiles

Sábanas de lino o algodón, y alfombras guardadas en verano.

## Si quieres un aire portátil

No necesita obras, pero consume más que un split. Para instalar uno fijo, necesitas permiso del propietario y, a veces, de la comunidad.`,
  },
  {
    slug: 'convivencia-con-vecinos-ruido-y-normas',
    title: 'Convivencia con los vecinos: ruido, normas y cómo resolver conflictos',
    excerpt: 'Horarios de descanso, normas de la comunidad y pasos para resolver un problema sin escalarlo.',
    audience: 'inquilinos',
    category: 'Convivencia',
    publishedAt: D,
    body: `Como inquilino, también tienes que cumplir las normas de la comunidad de propietarios.

## Lo básico

- **Horario de descanso**: muchas ordenanzas municipales y normas de comunidad lo fijan, normalmente de noche.
- **Zonas comunes**: respeta el uso de portal, ascensor, patio y piscina.
- **Basura y reciclaje**: horarios y contenedores.
- **Obras y mudanzas**: avisa y respeta los horarios.

## Si el ruido lo haces tú

- Fieltros en las patas de las sillas.
- Alfombras.
- Evita los tacones en casa.
- Avisa a los vecinos si haces una celebración.

## Si te molesta un vecino

1. **Habla con él con calma**: muchas veces no es consciente.
2. Si sigue, informa al **presidente o al administrador** de la comunidad.
3. En casos graves y repetidos, el **ayuntamiento** (policía local) puede medir el ruido.

## Tu casero

Infórmale si el conflicto se alarga. Y recuerda que las actividades molestas pueden ser causa de resolución del contrato, para ti o para tu vecino.`,
  },
  {
    slug: 'primer-piso-lista-de-la-compra',
    title: 'Tu primer piso de alquiler: lista de la compra completa',
    excerpt: 'Cocina, baño, limpieza, dormitorio y herramientas: todo lo necesario para la primera semana, sin olvidos.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: D,
    body: `Independizarse es emocionante… hasta que te das cuenta de que no tienes ni una escoba.

## Cocina
- [ ] Sartén, olla y cazo
- [ ] Cuchillos, tabla, abrelatas y pelador
- [ ] Platos, vasos y cubiertos
- [ ] Táperes
- [ ] Trapos y estropajos

## Baño
- [ ] Toallas
- [ ] Alfombrilla
- [ ] Escobilla y papelera
- [ ] Cortina de ducha (si no hay mampara)

## Limpieza
- [ ] Escoba, recogedor y fregona
- [ ] Productos básicos: multiusos, lavavajillas, detergente
- [ ] Cubos de basura y reciclaje

## Dormitorio
- [ ] Ropa de cama (dos juegos)
- [ ] Almohada y protector de colchón
- [ ] Perchas

## Herramientas
- [ ] Destornillador, metro y llave inglesa
- [ ] Bombillas de repuesto
- [ ] Linterna
- [ ] Alargador y regleta

## Consejo

Compra lo esencial la primera semana y el resto según lo necesites. Evitarás gastar en cosas que no usarás.`,
  },
  {
    slug: 'mudanza-barata-como-ahorrar',
    title: 'Mudanza barata: cómo ahorrar sin romper nada',
    excerpt: 'Cajas gratis, fechas más baratas, alquiler de furgoneta y cómo organizar la mudanza paso a paso.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: D,
    body: `Una mudanza puede costar desde unas decenas hasta más de mil euros. Depende de cómo la organices.

## Antes

- **Desecha**: vende o dona lo que no uses. Cada caja que no mueves es dinero ahorrado.
- **Cajas gratis**: supermercados, tiendas y conocidos.
- **Etiqueta** cada caja con la estancia y el contenido.

## Opciones

| Opción | Coste | Para quién |
|---|---|---|
| Amigos y coches | Muy bajo | Pocos muebles |
| Alquilar una furgoneta | Bajo o medio | Mudanzas medianas, si tienes ayuda |
| Mudanza compartida | Medio | Distancias largas |
| Empresa de mudanzas | Alto | Muchos muebles o poco tiempo |

## Cuándo es más barato

Entre semana y a mitad de mes: los fines de semana y los finales de mes tienen más demanda.

## El día de la mudanza

- Caja "primera noche": cargadores, ropa, aseo, sábanas y documentos.
- Fotos de los contadores y del piso nuevo **antes** de meter muebles.
- Reserva el ascensor si tu comunidad lo pide.

## No olvides

Cambiar de dirección en el banco, el empadronamiento y los suministros.`,
  },
  {
    slug: 'como-buscar-piso-de-alquiler-en-2027',
    title: 'Cómo buscar piso de alquiler en 2027 (y conseguirlo antes que otros)',
    excerpt: 'Alertas, carpeta de documentos lista, mensajes que destacan y rapidez: el método para alquilar con tanta demanda.',
    audience: 'inquilinos',
    category: 'Buscar piso',
    publishedAt: D,
    body: `En muchas ciudades, un buen piso dura muy poco publicado. Ser rápido y estar preparado marca la diferencia.

## 1. Define qué buscas

Presupuesto máximo (el alquiler idealmente no debe superar el 30–35 % de tus ingresos netos), zona, habitaciones y lo que no es negociable.

## 2. Activa las alertas

En **dos o tres portales**, con notificaciones instantáneas.

## 3. Ten la carpeta lista

- DNI o NIE.
- Últimas nóminas o declaración de la renta.
- Contrato de trabajo.
- Referencia de tu casero anterior, si la tienes.
- Una breve presentación.

## 4. Un primer mensaje que destaque

"Hola, soy [nombre], trabajo como [puesto] con contrato indefinido. Busco para [fecha], somos [n.º] personas, sin mascotas. Puedo visitarlo hoy o mañana. Tengo la documentación preparada."

## 5. Visita y decide rápido

Lleva tu lista de comprobación: [qué revisar en la visita](/blog/que-revisar-en-la-visita-a-un-piso).

## 6. Cuidado con las estafas

Nunca pagues antes de ver el piso y de firmar. Lee [señales de un anuncio falso](/blog/senales-de-un-anuncio-de-alquiler-falso).`,
  },
  {
    slug: 'senales-de-un-anuncio-de-alquiler-falso',
    title: 'Señales de un anuncio de alquiler falso: cómo evitar estafas',
    excerpt: 'Precios demasiado bajos, propietarios en el extranjero y pagos por adelantado. Las alertas que no debes ignorar.',
    audience: 'inquilinos',
    category: 'Buscar piso',
    publishedAt: D,
    body: `Las estafas en el alquiler aprovechan la urgencia de quien busca piso.

## Señales de alarma

- **Precio muy por debajo** de los pisos similares de la zona.
- El "propietario" **está en el extranjero** y no puede enseñar el piso.
- Te piden **pagar una reserva** antes de visitarlo.
- Insisten en pagos por **plataformas de envío de dinero** o en criptomonedas.
- Fotos de catálogo o que aparecen en otros anuncios.
- Prisa extrema: "hay muchos interesados, paga hoy".

## Cómo comprobarlo

- **Busca las fotos** con un buscador de imágenes inverso.
- Pide una **nota simple** del Registro de la Propiedad para confirmar quién es el propietario.
- **Visita el piso** en persona o por videollamada en directo.
- Desconfía de los documentos que no puedes verificar.

## Reglas de oro

1. No pagues nada sin haber visto el piso.
2. Paga solo al firmar el contrato y con un medio trazable.
3. No envíes copias de tu DNI sin necesidad: marca encima "solo para alquiler en [dirección]".

## Si te han estafado

Denuncia en la Policía o la Guardia Civil con todas las pruebas, y avisa al portal donde estaba el anuncio.`,
  },
  {
    slug: 'casero-no-hace-reparaciones-que-hacer',
    title: 'El casero no hace las reparaciones: qué puedes hacer',
    excerpt: 'Qué reparaciones le corresponden, cómo reclamarlas y, desde el decreto de octubre de 2026, cómo puedes repararlo tú y descontarlo de la renta si no responde en 15 días.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: D,
    body: `Una caldera rota en enero o una gotera no pueden esperar semanas. Esto dice la LAU.

## Qué le corresponde al propietario (art. 21)

Las reparaciones necesarias para conservar la vivienda en condiciones de habitabilidad, salvo los daños que hayas causado tú.

## Qué te corresponde a ti

Las **pequeñas reparaciones** por el uso diario: una bombilla, un tirador, desatascar por mal uso…

## Pasos

1. **Comunica la avería por escrito** (email o mensaje) con fotos y la fecha.
2. Si no responde en un plazo razonable, envía un **burofax**.
3. Guarda todas las comunicaciones.

## Novedad: 15 días para responder (decreto de octubre de 2026)

Con el Real Decreto-ley 29/2026 (en vigor desde el 8 de octubre y pendiente de convalidación), cuando hay daños que afectan a la **habitabilidad, la seguridad o la salubridad** de la vivienda, o hacen falta reparaciones de conservación:

1. El inquilino puede **pedir la reparación por escrito**, adjuntando un **presupuesto razonable**.
2. El propietario tiene **15 días naturales** para **aceptar** el presupuesto, **proponer otra reparación** o **hacerla directamente**.
3. Si no responde o se niega sin justificación, el inquilino puede **hacer la obra y descontar su importe de las rentas siguientes**, con un coste razonable y acreditado con facturas.

En la **vivienda temporal** (temporada) es aún más estricto: el propietario también se ocupa de las pequeñas reparaciones por el uso ordinario y debe responder en **5 días hábiles**; si no, el inquilino puede repararlo y pedir el importe o descontarlo de la renta del mes siguiente.

## Reparaciones urgentes

La LAU permite al inquilino hacer las **reparaciones urgentes** para evitar un daño inminente o una incomodidad grave, y exigir su importe al propietario, **comunicándoselo antes**.

## Si no hay solución

- Oficina de vivienda o de consumo de tu ayuntamiento o comunidad.
- Asociaciones de inquilinos o de consumidores.
- Como último recurso, la vía judicial.

## No dejes de pagar la renta por tu cuenta

Aunque haya una reparación pendiente, **no retengas la renta sin más**: dejar de pagar puede justificar un desahucio. Lo que permite el decreto es **descontar el coste de una reparación ya hecha**, siguiendo el procedimiento (requerimiento por escrito con presupuesto, 15 días sin respuesta o negativa injustificada, coste razonable y facturas).

Fuente: BOE, [Real Decreto-ley 29/2026](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 3 (nuevo apartado 5 del artículo 21 y nuevo artículo 21 bis de la LAU). Consultado el 22-10-2026.`,
  },
  {
    slug: 'checklist-primer-dia-en-tu-piso-de-alquiler',
    title: 'Primer día en tu piso de alquiler: checklist para protegerte',
    excerpt: 'Fotos, contadores, inventario, llaves y desperfectos: lo que debes hacer antes de deshacer la primera caja.',
    audience: 'inquilinos',
    category: 'Entrar a vivir',
    publishedAt: D,
    body: `Lo que documentes el primer día es lo que te protegerá al recuperar la fianza.

## Antes de meter tus cosas

- [ ] **Fotos y vídeo** de cada estancia, paredes, suelos y techos
- [ ] **Primer plano** de cualquier desperfecto: arañazos, manchas, golpes
- [ ] Prueba **grifos, cisternas, enchufes, persianas y electrodomésticos**
- [ ] Mira si hay **humedades** en techos y esquinas
- [ ] Fotos de los **contadores** de luz, agua y gas, con la lectura

## Documentos

- [ ] Compara el **inventario** con lo que hay realmente
- [ ] Envía al propietario, por email, las fotos y la lista de desperfectos **en la primera semana**
- [ ] Guarda el contrato, el justificante de la fianza y los recibos

## Llaves

- [ ] Cuenta las llaves recibidas: portal, piso, buzón, trastero y garaje

## Datos útiles

- [ ] Teléfono de averías del propietario o del seguro
- [ ] Ubicación de la llave de paso y del cuadro eléctrico
- [ ] Normas de la comunidad y días de recogida de basura

## Por qué el email

Un email con fotos tiene fecha y deja constancia de que lo comunicaste.`,
  },
  {
    slug: 'salir-del-piso-y-recuperar-la-fianza-checklist',
    title: 'Salir del piso y recuperar la fianza: checklist final',
    excerpt: 'Preaviso, limpieza, pequeñas reparaciones, lecturas y entrega de llaves: todo para que te devuelvan la fianza completa.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: D,
    body: `Recuperar la fianza depende de lo bien que prepares la salida.

## Un mes antes o más

- [ ] Comprueba que has enviado el **preaviso** en plazo: normalmente 2 meses en vivienda habitual
- [ ] Revisa el inventario y el estado inicial (tus fotos del primer día)
- [ ] Planifica las pequeñas reparaciones: agujeros, bombillas, tiradores

## La última semana

- [ ] **Limpieza a fondo**: horno, campana, nevera y baños
- [ ] Tapa los agujeros pequeños con masilla
- [ ] Retira los adhesivos y los ganchos
- [ ] Deja los muebles del inventario en su sitio

## El día de la entrega

- [ ] **Revisión conjunta** con el propietario
- [ ] **Fotos y vídeo** del estado final
- [ ] Lecturas de los **contadores**
- [ ] Entrega de **todas las llaves**, con un documento firmado de entrega
- [ ] Da de baja o cambia los suministros a tu nombre

## Plazo de devolución

Si no te devuelven la fianza en **un mes** desde la entrega de llaves, la cantidad devenga el interés legal (LAU, art. 36). Reclama por escrito.

## Lo que no te pueden descontar

El **desgaste normal** por el uso: pintura deslucida tras años o pequeñas marcas.`,
  },
  {
    slug: 'empadronarse-en-un-piso-de-alquiler',
    title: 'Cómo empadronarte en un piso de alquiler (y por qué es importante)',
    excerpt: 'Documentos, trámite en el ayuntamiento y si el propietario puede negarse. El padrón te abre ayudas y servicios.',
    audience: 'inquilinos',
    category: 'Derechos',
    publishedAt: D,
    body: `Empadronarte es **una obligación** de toda persona que vive en un municipio y una puerta a muchos servicios.

## Para qué sirve

- Centro de salud y colegio.
- Ayudas al alquiler y deducciones.
- Votar en tu nuevo municipio: el censo electoral se nutre del padrón.
- Trámites como renovar documentos o pedir vivienda protegida.

## Documentación habitual

- DNI, NIE o pasaporte.
- **Contrato de alquiler** en vigor.
- Formulario del ayuntamiento.

Algunos ayuntamientos piden documentación adicional. Consulta su web.

## ¿Puede negarse el propietario?

Con un contrato de alquiler en vigor, **no necesitas su autorización** para empadronarte: es tu domicilio.

## Elecciones

Para votar en tu nuevo domicilio, el padrón debe estar actualizado antes del cierre del censo electoral. Si te has mudado hace poco, comprueba tu inscripción en la web del INE o en tu ayuntamiento.

## Al mudarte

Empadrónate en el nuevo municipio: la baja en el anterior se tramita automáticamente.`,
  },
  {
    slug: 'alquilar-en-pareja-contrato-a-nombre-de-ambos',
    title: 'Alquilar en pareja: ¿contrato a nombre de los dos?',
    excerpt: 'Ventajas de firmar ambos, qué pasa si os separáis y cómo repartir los gastos y la fianza.',
    audience: 'inquilinos',
    category: 'Convivencia',
    publishedAt: D,
    body: `Cuando alquiláis en pareja, la duda es si firmar uno o los dos.

## Firmar los dos

| Ventajas | Inconvenientes |
|---|---|
| Ambos tenéis los mismos derechos | Ambos respondéis del pago |
| Solvencia conjunta: más fácil que os acepten | Si os separáis, hay que acordar quién sigue |
| Ambos podéis empadronaros y pedir ayudas | |

## Firmar solo uno

El titular es quien tiene los derechos y las obligaciones. Si la pareja se separa, quien no firmó no tiene derecho a quedarse por el contrato.

## Si os separáis

- La LAU prevé que, en caso de separación o divorcio, el cónyuge no titular pueda continuar en el uso de la vivienda en ciertos casos, comunicándolo al arrendador.
- Para parejas de hecho o sin vínculo, lo más seguro es **firmar ambos**.

## Gastos

- Cuenta común o reparto por porcentaje de ingresos.
- La **fianza**: anotad quién pagó qué.
- Guardad los justificantes.

## Ayudas

Algunas ayudas al alquiler valoran los ingresos de la unidad de convivencia. Comprueba los requisitos.`,
  },
  {
    slug: 'decoracion-resistente-si-tienes-mascotas',
    title: 'Decoración resistente si vives de alquiler con mascotas',
    excerpt: 'Telas, suelos, protectores y rutinas para que tu perro o gato no te cueste la fianza.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `Vivir con mascotas en un piso alquilado es posible. Con algo de previsión, se nota poco en el piso.

## Textiles

- **Fundas lavables** para el sofá, de tela resistente (microfibra o lona).
- **Mantas** en las zonas donde se tumba.
- **Alfombras** de exterior o lavables.

## Protege el piso

- **Protectores** en las esquinas de los muebles y en las puertas.
- **Rascadores** para gatos en los sitios donde ya arañan.
- **Alfombrillas** bajo el comedero y el bebedero.
- **Cortinas** a media altura o recogidas.

## Rutinas

- Uñas cortadas.
- Paseos y juego suficientes: menos destrozos por aburrimiento.
- Aspirador a mano.

## Al irte

- Limpieza profesional de textiles si los hay.
- Revisa los marcos de las puertas y los rodapiés.

## El contrato

Si tu contrato dice algo sobre mascotas, cúmplelo. Si no dice nada, informa al propietario. Lee [alquilar con mascota: qué dice la ley](/blog/alquilar-con-mascota).`,
  },
  {
    slug: 'tu-hucha-de-alquiler-ahorrar-mes-a-mes',
    title: 'Tu hucha de alquiler: cómo ahorrar mes a mes mientras pagas la renta',
    excerpt: 'Ahorrar viviendo de alquiler es difícil, pero no imposible. Métodos automáticos y cómo funciona la hucha de RentaHucha.',
    audience: 'inquilinos',
    category: 'Ahorro',
    publishedAt: D,
    body: `Si pagas alquiler, ahorrar parece misión imposible. La clave es **automatizarlo**.

## Métodos que funcionan

1. **Págate primero**: transferencia automática a una cuenta de ahorro el día que cobras.
2. **Regla 50/30/20**: necesidades, deseos y ahorro, ajustada a tu realidad.
3. **Redondeo**: muchos bancos redondean las compras y ahorran la diferencia.
4. **Objetivo concreto**: fianza del próximo piso, entrada de una vivienda o un colchón de emergencia.

## La hucha de RentaHucha

Con RentaHucha, cada mes una parte de lo que pagas va a **tu hucha**:

- Se llena **mes a mes**, junto a tu alquiler.
- Es **tuya** y está separada de la fianza.
- Al terminar, se te devuelve con un **10 % extra**.
- Además, construyes un **pasaporte de inquilino** con tu historial de pagos.

## Cuánto puedes juntar

| Ahorro mensual | En 1 año | En 3 años |
|---|---|---|
| 50 € | 600 € | 1.800 € |
| 100 € | 1.200 € | 3.600 € |
| 150 € | 1.800 € | 5.400 € |

¿Quieres probarlo? [Apúntate a la lista de espera](/apuntate?tipo=inquilino).`,
  },
  {
    slug: 'almacenaje-y-minimalismo-en-piso-pequeno',
    title: 'Almacenaje y minimalismo en un piso pequeño de alquiler',
    excerpt: 'Cómo ganar espacio sin obras: debajo de la cama, detrás de las puertas y el método de una entrada, una salida.',
    audience: 'inquilinos',
    category: 'Decoración',
    publishedAt: D,
    body: `En un piso pequeño, el orden no es una manía: es espacio útil.

## Menos cosas

- Regla de **una entra, una sale**.
- Revisa el armario cada temporada.
- Digitaliza los papeles.

## Espacios escondidos

- **Debajo de la cama**: cajas con ruedas o camas canapé.
- **Detrás de las puertas**: organizadores colgantes.
- **Encima de los armarios**: cajas iguales y etiquetadas.
- **Dentro de los armarios**: separadores, bolsas de vacío y perchas finas.

## Muebles que guardan

- Pufs con almacenaje.
- Bancos de entrada con cajones.
- Mesas de centro con baldas.

## Orden visual

- Cajas y cestas **iguales**: el conjunto parece ordenado aunque dentro no lo esté tanto.
- Superficies despejadas.
- Cables recogidos.

## Lo bueno

Menos cosas significa mudanzas más baratas, menos limpieza y un piso que parece más grande.`,
  },
]
