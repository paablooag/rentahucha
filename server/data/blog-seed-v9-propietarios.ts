import type { BlogPost } from '#shared/utils/blog'

// Novena versión del contenido inicial: 18 artículos para propietarios (checklists, señales de alarma, plantillas,
// fiscalidad de no residentes y calendario del primer año). Importes orientativos; normativa con remisión oficial.

type Seed = Omit<BlogPost, 'updatedAt' | 'published'>
const D = '2026-10-17'
const A = 'propietarios' as const
const CTA = `¿Quieres alquilar a inquilinos verificados y con una hucha que responde si hay impago? [Apúntate a la lista de espera de RentaHucha](/apuntate?tipo=propietario#formulario).`

export const BLOG_SEED_V9_PROPIETARIOS: Seed[] = [
  {
    slug: 'checklist-para-alquilar-tu-piso-2027',
    title: 'Checklist para alquilar tu piso en 2027 sin errores (30 puntos)',
    excerpt: 'Antes de anunciar, al elegir inquilino, al firmar y después: los 30 puntos que evitan multas, impagos y discusiones.',
    audience: A,
    category: 'Poner en alquiler',
    publishedAt: D,
    body: `Guarda esta lista y ve marcando. Cubre todo el proceso, desde que decides alquilar hasta los primeros meses.

## Antes de anunciar

- [ ] 1. Revisión del estado del piso y reparaciones pendientes
- [ ] 2. Certificado energético (obligatorio para anunciar)
- [ ] 3. Cédula de habitabilidad, si tu comunidad la exige
- [ ] 4. Comprobar si tu municipio es zona tensionada
- [ ] 5. Precio con comparables y el índice de referencia
- [ ] 6. Decidir: vivienda habitual o temporada
- [ ] 7. Decidir: amueblado o sin amueblar
- [ ] 8. Fotos con luz natural y plano
- [ ] 9. Anuncio con renta, gastos, calificación energética y condiciones
- [ ] 10. Número de registro, si es alquiler de corta duración

## Al elegir inquilino

- [ ] 11. Filtro previo antes de dar visitas
- [ ] 12. Ratio renta/ingresos por debajo del 30–35 %
- [ ] 13. Verificación de ingresos (documentos o verificación bancaria con su consentimiento)
- [ ] 14. Referencias de caseros anteriores
- [ ] 15. Mismos criterios para todos los candidatos
- [ ] 16. Pedir solo los datos necesarios y borrar los de quien no elijas

## Al firmar

- [ ] 17. Contrato conforme a la LAU vigente
- [ ] 18. Cláusula de necesidad, si puedes necesitar el piso
- [ ] 19. Actualización de renta conforme a los límites legales
- [ ] 20. Reparto de gastos claro
- [ ] 21. Fianza de un mes y, si quieres, garantía adicional dentro del límite (dos meses en vivienda habitual, uno en temporada)
- [ ] 22. Inventario con fotos, firmado
- [ ] 23. Lecturas de contadores
- [ ] 24. Entrega de llaves documentada

## Después

- [ ] 25. Depositar la fianza en el organismo de tu comunidad
- [ ] 26. Cambio de titular de los suministros
- [ ] 27. Avisar a tu seguro de que el piso está alquilado
- [ ] 28. Calendario de fechas: actualización, fin de contrato, preavisos
- [ ] 29. Registro de ingresos y gastos para la renta
- [ ] 30. Canal claro para incidencias

## Preguntas frecuentes

### ¿Qué pasa si alquilo sin certificado energético?
Te expones a sanciones según la normativa aplicable. Además, el anuncio debe mostrar la calificación.

### ¿Tengo que depositar la fianza?
En la mayoría de comunidades autónomas, sí, en un plazo corto desde la firma. Lee [cómo depositar la fianza](/blog/depositar-la-fianza-en-tu-comunidad).

### ¿Puedo pedir más de un mes de fianza?
La fianza legal es de un mes en vivienda habitual. Puedes pedir además hasta dos mensualidades de garantía adicional.

${CTA}`,
  },
  {
    slug: 'senales-de-alarma-en-un-candidato-a-inquilino',
    title: '10 señales de alarma en un candidato a inquilino',
    excerpt: 'Prisa, pagos por adelantado, documentos raros… Las señales que conviene revisar antes de firmar, sin caer en prejuicios.',
    audience: A,
    category: 'Selección',
    publishedAt: D,
    body: `Ninguna señal por sí sola descarta a nadie, pero varias juntas merecen una comprobación extra.

1. **Prisa extrema** por firmar sin ver el piso con calma.
2. **Ofrece pagar muchos meses por adelantado** en efectivo.
3. **Documentos con incoherencias**: fechas, importes o empresas que no cuadran.
4. **Pagos desde cuentas de terceros** sin explicación.
5. **Evita la videollamada o el encuentro** para verificar su identidad.
6. **No quiere dar referencias** de alquileres anteriores sin un motivo.
7. **Cambia la versión** sobre quién vivirá en el piso.
8. **Pide no firmar contrato** o "hacerlo más adelante".
9. **Ingresos muy justos** para la renta y sin ahorros.
10. **Presiona** con que tiene otras opciones si no decides hoy.

## Cómo comprobar sin discriminar

Aplica los **mismos criterios a todos**: identidad, ingresos, historial y referencias. Nunca por origen, edad u otros motivos personales.

Más en [cómo verificar la identidad del inquilino](/blog/verificar-identidad-del-inquilino) y [cómo elegir entre varios candidatos](/blog/elegir-entre-varios-candidatos-a-inquilino).

${CTA}`,
  },
  {
    slug: 'cuanto-cuesta-preparar-un-piso-para-alquilar',
    title: 'Cuánto cuesta preparar un piso para alquilar: presupuesto tipo',
    excerpt: 'Limpieza, pintura, pequeñas reparaciones, certificado y fotos: un presupuesto orientativo para poner tu piso a punto.',
    audience: A,
    category: 'Rentabilidad',
    publishedAt: D,
    body: `Preparar bien el piso acorta el tiempo vacío y atrae mejores inquilinos. Este es un presupuesto orientativo para un piso de unos 70 m² en buen estado.

| Partida | Orientación |
|---|---|
| Limpieza a fondo profesional | Unos cientos de euros |
| Pintura (paredes y techos) | De mil a dos mil euros, según el estado |
| Pequeñas reparaciones (grifos, persianas, silicona) | Unos cientos de euros |
| Iluminación LED y mecanismos | Desde menos de cien euros |
| Certificado energético | Variable según el técnico y la ciudad |
| Fotos profesionales (opcional) | Variable |

Los importes cambian mucho por ciudad y estado del piso: pide siempre presupuesto.

## Dónde no recortar
- Seguridad: electricidad y gas.
- Humedades.
- Limpieza: es lo primero que se ve.

## Dónde puedes ahorrar
- Pintar tú si tienes mano.
- Hacer las fotos con el móvil siguiendo [esta guía](/blog/fotos-que-alquilan-guia-con-el-movil).
- Home staging de bajo coste.

## Recuerda
Las reparaciones son gasto deducible del año en tu IRPF. Las mejoras se amortizan. Más en [qué se deduce de una reforma](/blog/deducir-reforma-piso-alquilado-en-la-renta).

${CTA}`,
  },
  {
    slug: 'inventario-piso-amueblado-plantilla',
    title: 'Inventario de un piso amueblado: plantilla y consejos',
    excerpt: 'El inventario es tu mejor prueba al final del contrato. Estructura por estancias, qué anotar y cómo hacer las fotos.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `Un buen inventario evita el 90 % de las discusiones por la fianza. Esta es una estructura que puedes copiar.

## Estructura por estancia

**Salón**
| Elemento | Marca/modelo | Estado | Foto |
|---|---|---|---|
| Sofá 3 plazas | — | Bueno, sin manchas | 1–2 |
| Mesa y 4 sillas | — | Bueno | 3 |
| Lámpara de techo | — | Funciona | 4 |

**Cocina**
| Elemento | Marca/modelo | Estado | Foto |
|---|---|---|---|
| Frigorífico | [marca] | Funciona, sin golpes | 5 |
| Placa | [marca] | Funciona | 6 |
| Menaje | Lista aparte | — | 7 |

Repite para dormitorios, baño y terraza.

## Consejos

- Fotos con **fecha** y desde varios ángulos.
- Anota **números de serie** de los electrodomésticos.
- Describe el estado con palabras concretas: "arañazo de 5 cm en la puerta del armario".
- **Firmado por ambos** y anexado al contrato.
- Envía las fotos por email el mismo día.

Al final del contrato, compara con el inventario. Lee [desgaste normal o daños](/blog/revision-de-la-fianza-desgaste-normal-o-danos).

${CTA}`,
  },
  {
    slug: 'el-inquilino-se-va-plan-de-60-dias',
    title: 'Tu inquilino avisa de que se va: plan de 60 días para no perder ni un mes',
    excerpt: 'Del preaviso a la entrada del siguiente inquilino: qué hacer cada semana para encadenar contratos sin meses vacíos.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `El preaviso es un regalo: tienes tiempo para que el siguiente inquilino entre casi sin hueco.

| Semana | Qué hacer |
|---|---|
| 1 | Confirmar la fecha de salida por escrito y revisar el contrato |
| 1 | Revisar la renta: comparables, índice y, si aplica, zona tensionada |
| 2 | Pactar con el inquilino visitas avisadas (si el contrato lo prevé) |
| 2–3 | Actualizar anuncio y fotos |
| 3–6 | Visitas y selección |
| 6–7 | Firma con el nuevo inquilino, con fecha de entrada pocos días después de la salida |
| 8 | Revisión conjunta con el inquilino saliente, lecturas y llaves |
| 8 | Pequeñas reparaciones y limpieza |
| 8–9 | Entrada del nuevo inquilino |

## Consejos

- Deja **unos días** entre salida y entrada para revisar y limpiar.
- Liquida la fianza del saliente **en plazo**.
- Aprovecha para pequeñas mejoras: pintura, bombillas, silicona.

${CTA}`,
  },
  {
    slug: 'alquiler-y-comunidad-de-vecinos-evitar-conflictos',
    title: 'Alquiler y vecinos: cómo evitar conflictos con la comunidad',
    excerpt: 'Normas, presentaciones y canal de quejas: lo que puedes hacer como propietario para que tu inquilino y tus vecinos convivan bien.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `Como propietario sigues siendo miembro de la comunidad, aunque no vivas allí.

## Antes de que entre el inquilino
- Entrega las **normas de la comunidad** con el contrato.
- Informa al **administrador** de quién vivirá en el piso.

## Durante el contrato
- Pide a la comunidad que te avise **a ti** de cualquier problema.
- Transmite las quejas al inquilino con hechos y sin juicios.
- Paga las cuotas y derramas a tiempo: son del propietario salvo pacto.

## Si hay un conflicto serio
Las actividades molestas pueden acabar en acciones de la comunidad contra el ocupante y en la resolución del contrato. Documenta y busca primero una solución hablada.

${CTA}`,
  },
  {
    slug: 'inquilino-ha-subarrendado-sin-permiso',
    title: 'Mi inquilino ha subarrendado el piso sin permiso: qué hacer',
    excerpt: 'El subarriendo sin consentimiento escrito es causa de resolución del contrato. Cómo comprobarlo y actuar con seguridad.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `Según la **LAU (artículo 8)**, el inquilino solo puede subarrendar **parte** de la vivienda y con tu **consentimiento escrito**. Subarrendar sin permiso es causa de **resolución** del contrato (artículo 27).

## Cómo comprobarlo
- Anuncios de habitaciones con tu dirección.
- Información de la comunidad sobre personas nuevas.
- Comunicación directa con el inquilino.

## Qué hacer
1. **Recopila pruebas**: capturas de anuncios con fecha.
2. **Requerimiento por escrito** al inquilino.
3. Si no se corrige, consulta con un abogado para resolver el contrato.

## Lo que no debes hacer
Entrar en el piso sin permiso ni cambiar la cerradura.

## Si te parece bien que comparta
Mejor que firmen todos el contrato o autorizarlo por escrito con condiciones claras.

${CTA}`,
  },
  {
    slug: 'danos-al-terminar-el-alquiler-como-reclamar',
    title: 'Daños en el piso al terminar el alquiler: cómo reclamarlos',
    excerpt: 'Fianza, garantía adicional y, si no basta, la reclamación judicial. Cómo documentar y cuantificar los daños.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `## 1. Diferencia daño de desgaste
El desgaste normal por el uso no se puede cobrar. Los daños por mal uso, sí. Lee [desgaste normal o daños](/blog/revision-de-la-fianza-desgaste-normal-o-danos).

## 2. Documenta
- Revisión conjunta con fotos y vídeo.
- Comparación con el inventario inicial.
- Presupuestos o facturas de las reparaciones.

## 3. Aplica la fianza y la garantía
Descuenta los daños justificados y comunica el detalle por escrito al inquilino. Devuelve el resto en plazo: si tardas más de un mes, la fianza genera intereses.

## 4. Si los daños superan la fianza
- Intenta un acuerdo por escrito.
- Requerimiento formal.
- Reclamación judicial: para importes pequeños, el procedimiento es sencillo; consulta con un profesional.

## 5. Para la próxima vez
- Inventario detallado.
- Revisión anual acordada.
- Garantía adicional si el piso está amueblado.

${CTA}`,
  },
  {
    slug: 'puedo-pedir-nominas-y-vida-laboral-al-inquilino',
    title: '¿Puedo pedir nóminas y vida laboral a un inquilino?',
    excerpt: 'Sí, si es necesario y proporcionado, y solo al candidato preseleccionado. Cómo pedirlos y cuánto tiempo guardarlos.',
    audience: A,
    category: 'Selección',
    publishedAt: D,
    body: `Puedes pedir documentación para **valorar la solvencia** del candidato, pero con límites:

| Pide | Mejor no |
|---|---|
| Nóminas recientes o declaración de la renta | Datos de salud |
| Contrato de trabajo | Ideología, religión u orientación |
| DNI o NIE al formalizar | Copias del DNI de todos los interesados |
| Vida laboral, si es proporcionado | Más documentación de la necesaria |

## Buenas prácticas
- Pídelo **solo** al candidato con el que vas a cerrar.
- Infórmale de para qué y cuánto tiempo lo guardarás.
- **Borra** la documentación de quien no elijas.
- Guárdala de forma segura.

Más detalle en [verificación de inquilinos y RGPD](/blog/verificacion-de-inquilinos-rgpd-inmobiliarias).

${CTA}`,
  },
  {
    slug: 'alquilar-tu-piso-viviendo-en-el-extranjero',
    title: 'Alquilar tu piso en España viviendo en el extranjero: impuestos y gestión',
    excerpt: 'Si eres no residente, tributas por el Impuesto sobre la Renta de No Residentes. Tipos, gastos deducibles y cómo gestionar el piso a distancia.',
    audience: A,
    category: 'Fiscalidad',
    publishedAt: D,
    body: `Si vives fuera de España y alquilas tu piso aquí, no declaras el alquiler en el IRPF, sino en el **Impuesto sobre la Renta de No Residentes (IRNR)**.

## Cómo tributa

| Residencia | Tipo general | Gastos deducibles |
|---|---|---|
| UE o Espacio Económico Europeo (con intercambio de información) | 19 % | Sí, los gastos asociados al alquiler |
| Resto de países | 24 % | No: tributa el ingreso íntegro |

Se declara con el **modelo 210**, con la periodicidad que marque la normativa. Las reducciones por alquiler de vivienda del IRPF no se aplican igual a no residentes. Revisa también el convenio de doble imposición con tu país de residencia.

## Gestión a distancia

- **Una persona de confianza o una agencia** para visitas, incidencias y entregas.
- **Cobro por domiciliación** a una cuenta española o de la UE.
- **Firma electrónica** del contrato.
- **Inventario con fotos** muy detallado.

## Consejo

Consulta con un asesor fiscal que conozca la fiscalidad de no residentes: los errores en el modelo 210 pueden generar recargos.

${CTA}`,
  },
  {
    slug: 'herencia-con-inquilino-dentro',
    title: 'Heredas un piso con inquilino dentro: qué pasa con el contrato',
    excerpt: 'El contrato sigue y los herederos pasan a ser los arrendadores. Qué hacer los primeros días y cómo organizarse entre herederos.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `Si heredas un piso alquilado, **el contrato continúa**: los herederos se colocan en el lugar del propietario fallecido.

## Primeros pasos
1. Localiza el **contrato** y los justificantes de pago.
2. Comprueba dónde está **depositada la fianza**.
3. Comunica al inquilino, por escrito, quién gestiona ahora la vivienda y la nueva cuenta de cobro.
4. Cambia la titularidad del recibo del **IBI** y del seguro cuando corresponda.

## Entre varios herederos
Acordad quién gestiona, cómo se reparten ingresos y gastos y quién firma. Lee [alquilar un piso heredado entre hermanos](/blog/alquilar-piso-heredado-entre-hermanos).

## Fiscalidad
Cada heredero declara su parte de los ingresos desde que lo es. Consulta con un asesor.

## ¿Y si queréis vender?
Se puede, respetando el contrato y el derecho de tanteo del inquilino. Lee [vender un piso alquilado](/blog/vender-piso-alquilado-con-inquilino).

${CTA}`,
  },
  {
    slug: 'fianza-y-garantia-en-alquiler-de-temporada',
    title: 'Fianza y garantía en el alquiler de temporada tras el decreto de octubre de 2026',
    excerpt: 'Garantía adicional de una mensualidad como máximo, sin poder exigir seguro de impago, y qué fianza corresponde según la fecha del contrato. Con ejemplo.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `> **Actualizado a 22 de octubre de 2026.** El Real Decreto-ley 29/2026 (en vigor desde el 8 de octubre y pendiente de convalidación) cambia las reglas de la temporada, que pasa a ser **arrendamiento de vivienda temporal**.

## Según la fecha del contrato

| | Contratos firmados antes del 8-10-2026 | Contratos nuevos |
|---|---|---|
| Naturaleza | Uso distinto del de vivienda | Arrendamiento de vivienda temporal |
| Fianza legal | Dos mensualidades | La de vivienda: una mensualidad (artículo 36.1 de la LAU) |
| Garantía adicional | Sin el límite de la vivienda habitual | **Como máximo una mensualidad** |
| Seguro de impago | — | **No se puede exigir al inquilino** |
| Prórroga | No se pueden prorrogar al terminar | Hasta 12 meses en total como regla general |

Los contratos anteriores mantienen su régimen hasta que terminan; si se renuevan, pasan a las reglas nuevas. Confirma con el organismo de tu comunidad el importe a depositar.

## Ejemplo (contrato nuevo)

Renta de 1.200 € al mes durante 6 meses:

- Fianza legal: **1.200 €** (una mensualidad), depositada si tu comunidad lo exige.
- Garantía adicional: como máximo **1.200 €**.
- Total como máximo al firmar, además de la primera renta: 2.400 €.

## Al terminar

Hay que firmar un **documento de finalización** con el estado de la vivienda. Si no se firma, o no recoge desperfectos, se presume que la vivienda se entregó en buen estado: hazlo siempre, con fotos.

## Recuerda

- La causa temporal tiene que estar escrita en el contrato y la prueba es tuya.
- Duración de más de 31 días y, en general, hasta 12 meses.
- Todas las reglas, en [el alquiler de temporada con el decreto de octubre](/blog/alquiler-de-temporada-nuevas-reglas-12-meses).

## Fuentes

- BOE: [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823), artículo 3 (nuevos artículos 2.3, 7, 9 bis, 11.2 y 36.5 y 36.7 de la LAU, y disposición transitoria octava). Consultado el 22-10-2026.

${CTA}`,
  },
  {
    slug: 'alquilar-a-jovenes-ventajas-fiscales',
    title: 'Alquilar a jóvenes: la reducción fiscal del 70 % en zonas tensionadas',
    excerpt: 'Si alquilas tu vivienda por primera vez a un joven de 18 a 35 años en zona tensionada, puedes reducir el 70 % del rendimiento neto.',
    audience: A,
    category: 'Fiscalidad',
    publishedAt: D,
    body: `Desde la Ley 12/2023, la reducción del rendimiento neto por alquilar vivienda habitual es, en general, del **50 %**. Sube al **70 %** en este caso:

- Vivienda en **zona de mercado residencial tensionado**.
- Contrato con un inquilino de **18 a 35 años**.
- Es la **primera vez** que alquilas esa vivienda.
- Los requisitos se cumplen al firmar el contrato, y la reducción se aplica mientras se sigan cumpliendo.

Se aplica solo si no te corresponde la del 90 % (nuevo contrato en zona tensionada con una rebaja de más del 5 % de la renta).

## Ejemplo
| Concepto | Importe |
|---|---|
| Rendimiento neto anual | 8.000 € |
| Reducción del 50 % | Tributarías por 4.000 € |
| Reducción del 70 % | Tributarías por 2.400 € |

## Comprueba los requisitos
Cada reducción tiene condiciones concretas. Revisa la información de la Agencia Tributaria del año correspondiente o consulta a un asesor. Más en [bonificaciones fiscales para caseros](/blog/bonificaciones-fiscales-caseros-que-bajan-el-alquiler).

${CTA}`,
  },
  {
    slug: 'normas-de-la-casa-sin-clausulas-abusivas',
    title: 'Cómo fijar las normas de tu piso sin cláusulas abusivas',
    excerpt: 'Mascotas, fumar, obras, visitas… Qué normas puedes poner en el contrato y cuáles serían nulas.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `| Puedes pactar | Sería nulo o problemático |
|---|---|
| Admitir o no mascotas | Prohibir el empadronamiento |
| No fumar dentro de la vivienda | Entrar sin permiso del inquilino |
| Pedir permiso para obras o pintar | Renunciar a la prórroga legal |
| Visitas razonables avisadas para reparaciones | Fianza o garantías por encima de la ley |
| Uso exclusivo como vivienda | Cobrar al inquilino los gastos de agencia |

## Cómo redactarlas
- Claras y concretas.
- Proporcionadas.
- Coherentes con la LAU: lo que la contradiga en perjuicio del inquilino no vale.

## Consejo
Las normas razonables y explicadas generan menos conflictos que una lista de prohibiciones.

${CTA}`,
  },
  {
    slug: 'primer-ano-como-casero-calendario',
    title: 'Tu primer año como casero: calendario mes a mes',
    excerpt: 'Qué hacer y cuándo: depósito de fianza, revisiones, actualización de renta y declaración. Para no olvidarte de nada.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `| Mes | Tarea |
|---|---|
| Mes 0 (firma) | Contrato, inventario, fianza cobrada, lecturas y llaves |
| Mes 1 | Depositar la fianza, cambio de suministros, avisar al seguro |
| Mes 2 | Confirmar que la domiciliación funciona |
| Mes 3 | Primera llamada de seguimiento al inquilino |
| Mes 6 | Revisar incidencias y gastos acumulados |
| Abril–junio | Declaración de la renta con ingresos, gastos y reducciones |
| Antes del aniversario | Calcular la actualización de la renta y comunicarla por escrito |
| Mes 12 | Revisión anual del piso, acordada con el inquilino |

## Hábitos que ahorran disgustos
- Una carpeta con todo: contrato, fotos, facturas.
- Un registro de ingresos y gastos.
- Recordatorios en el calendario.

Empieza con la [checklist para alquilar tu piso](/blog/checklist-para-alquilar-tu-piso-2027).

${CTA}`,
  },
  {
    slug: 'alquilar-un-bajo-o-local-como-vivienda',
    title: 'Alquilar un bajo o un local como vivienda: requisitos',
    excerpt: 'Para alquilar como vivienda un local, necesitas que tenga ese uso legalmente. Cambio de uso, habitabilidad y riesgos.',
    audience: A,
    category: 'Legal',
    publishedAt: D,
    body: `Un local comercial **no se puede alquilar como vivienda** si no tiene uso residencial reconocido.

## Requisitos habituales
1. **Cambio de uso** a vivienda en el ayuntamiento, si la normativa urbanística lo permite.
2. **Condiciones de habitabilidad**: superficie, ventilación, luz natural, altura.
3. **Licencia o cédula** de primera ocupación o habitabilidad, según la comunidad.
4. **Autorización de la comunidad** si afecta a elementos comunes o a los estatutos.

## Riesgos de no hacerlo
- Sanciones urbanísticas.
- Problemas para dar de alta suministros o para empadronar al inquilino.
- Un contrato con un objeto problemático.

## Antes de invertir
Consulta en el ayuntamiento si el cambio de uso es posible en ese edificio y pide un estudio técnico.

${CTA}`,
  },
  {
    slug: 'compensa-alquilar-con-inmobiliaria-que-exigirle',
    title: '¿Compensa alquilar a través de una inmobiliaria? Lo que debes exigirle',
    excerpt: 'Una buena agencia te ahorra tiempo y riesgos. Diez cosas que deberías pedir antes de firmar la hoja de encargo.',
    audience: A,
    category: 'Gestión',
    publishedAt: D,
    body: `Una buena inmobiliaria compensa si vives lejos, tienes poco tiempo o no quieres lidiar con incidencias. Exígele:

1. **Valoración con datos**: comparables, índice de referencia y zona tensionada.
2. **Proceso de selección** explicado y con verificación de ingresos.
3. **Contrato actualizado** a la normativa vigente.
4. **Inventario con fotos**.
5. **Depósito de la fianza** gestionado y con justificante.
6. **Protocolo de impago** concreto.
7. **Informe periódico** de cobros e incidencias.
8. **Honorarios claros**, con factura (son deducibles).
9. **Que no cobre honorarios al inquilino** (lo prohíbe la Ley 12/2023).
10. **Protección de datos** cuidada.

## Señales de una mala agencia
Promesas de renta muy por encima del mercado, "renta garantizada" sin una cobertura real detrás o falta de transparencia en los cobros.

Si trabajas con una agencia, pregúntale por RentaHucha: puede ofrecerte inquilinos verificados y la hucha anti-impago.

${CTA}`,
  },
  {
    slug: 'bajar-el-alquiler-para-ganar-dinero',
    title: 'Por qué bajar 30 € el alquiler puede hacerte ganar dinero',
    excerpt: 'Un mes vacío cuesta más que un año de una pequeña rebaja. Las cuentas que todo propietario debería hacer.',
    audience: A,
    category: 'Rentabilidad',
    publishedAt: D,
    body: `Muchos propietarios mantienen un precio alto "por si acaso". Las cuentas dicen otra cosa.

## El ejemplo

| Escenario | Ingreso del primer año |
|---|---|
| 900 € y se alquila en 2 meses | 900 × 10 = 9.000 € |
| 870 € y se alquila en 2 semanas | 870 × 11,5 ≈ 10.005 € |

La rebaja de 30 € al mes "cuesta" 360 € al año; un mes y medio vacío cuesta mucho más.

## Además
- Precio ajustado = **más candidatos** = puedes elegir mejor.
- Un buen inquilino suele **quedarse más**.
- En zona tensionada, una rebaja puede darte **más reducción fiscal**.

## Cuándo no bajar
Si recibes muchas visitas y varias candidaturas, tu precio es correcto: mejora la selección, no el precio.

Más en [el precio de salida y cuándo bajarlo](/blog/precio-de-salida-y-cuando-bajarlo).

${CTA}`,
  },
]
