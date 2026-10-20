<script setup lang="ts">
const route = useRoute()
const { brand, legal } = useAppConfig()

// Texto provisional para revisar con un abogado antes del lanzamiento.
interface Block { h?: string; p: string[] }

const pending = (v: string, what: string) => v || `[pendiente: ${what}]`
const holder = pending(legal.holder, 'nombre o razón social')

const pages: Record<string, { title: string; updated: string; blocks: Block[] }> = {
  'aviso-legal': {
    title: 'Aviso legal',
    updated: 'octubre de 2026',
    blocks: [
      {
        h: 'Titular del sitio web',
        p: [
          `En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI), se informa de que este sitio web (${brand.domain}) es titularidad de:`,
          `Titular: ${holder}`,
          `NIF: ${pending(legal.nif, 'NIF')}`,
          `Domicilio: ${pending(legal.address, 'domicilio')}`,
          `Correo electrónico: ${brand.email}`,
          ...(legal.registry ? [`Datos registrales: ${legal.registry}`] : []),
        ],
      },
      {
        h: 'Objeto',
        p: [
          `${brand.name} está en fase beta. Esta web informa sobre el servicio y permite apuntarse a una lista de espera y a una newsletter, crear una cuenta, publicar anuncios de pisos en alquiler y que propietarios e inquilinos se escriban. La hucha, la firma del contrato y la gestión de cobros se activarán en el lanzamiento; hasta entonces no se contrata ni se paga nada a través de la web.`,
          `${brand.name} no es una entidad aseguradora ni comercializa, gestiona o intermedia seguros. Desde el lanzamiento, la hucha la custodiará una entidad financiera autorizada, en una cuenta a nombre de cada inquilino; ${brand.name} solo gestiona las reglas y no custodia fondos de terceros.`,
        ],
      },
      {
        h: 'Información orientativa',
        p: ['Las calculadoras, simuladores y dossieres ofrecen estimaciones con los datos indicados y no constituyen asesoramiento jurídico, financiero ni una oferta vinculante. Precios, porcentajes y condiciones pueden cambiar antes del lanzamiento.'],
      },
      {
        h: 'Propiedad intelectual',
        p: [`Los textos, el diseño, la marca y los elementos gráficos de esta web pertenecen a su titular. No se permite su reproducción sin autorización, salvo para uso personal o para compartir los dossieres tal cual se descargan.`],
      },
      {
        h: 'Legislación aplicable',
        p: ['Este sitio web se rige por la legislación española.'],
      },
    ],
  },
  'privacidad': {
    title: 'Política de privacidad',
    updated: 'octubre de 2026',
    blocks: [
      {
        h: 'Responsable del tratamiento',
        p: [`${holder} · NIF ${pending(legal.nif, 'NIF')} · ${pending(legal.address, 'domicilio')} · ${brand.email}`],
      },
      {
        h: 'Qué datos tratamos y para qué',
        p: [
          'Lista de espera, propietarios: nombre, correo, ciudad, teléfono si lo das, número de pisos, renta aproximada, situación y características del piso (tipo, habitaciones, baños, estado, superficie, mobiliario y extras) y cuándo quieres empezar.',
          'Lista de espera, inquilinos: nombre, correo, ciudad, teléfono si lo das, renta máxima, habitaciones y baños que buscas, tu rango de edad, cuántas personas viviréis y cuándo te mudarías. Si quieres, también con quién vivirás, tu situación laboral, si tienes mascota, el tipo de estancia y lo que consideras imprescindible.',
          'En ambos casos, opcionalmente, qué te interesa del servicio y tus comentarios. No pedimos DNI, ingresos, nóminas ni documentos.',
          'Los usamos para avisarte del lanzamiento, darte prioridad para dar de alta tu piso o crear tu pasaporte de inquilino, y analizar de forma agregada el interés en el servicio (cuánta gente lo quiere, en qué ciudades y qué le importa).',
          'Newsletter: tu correo electrónico, para enviarte novedades del servicio y consejos sobre alquiler. Solo si marcas esa casilla.',
          'Valoración del alquiler: tu nombre, correo, teléfono si lo das y los datos del piso que nos cuentas, para enviarte la valoración y hablar contigo sobre ella.',
          'Alertas de pisos: tu correo y tu búsqueda (ciudad, renta máxima, habitaciones), para avisarte de los pisos nuevos que encajan, como mucho una vez al día. Cada correo trae un enlace para cancelar la alerta, y se borra al cancelarla.',
          'Encuesta: tus respuestas, que se guardan sin nombre y se muestran solo de forma agregada. Si dejas tu correo y marcas la casilla, lo usamos para enviarte el informe y novedades.',
          'Cuenta de usuario: nombre, correo, teléfono si lo das y tu contraseña cifrada (nunca la guardamos en claro). La usamos para que puedas entrar, publicar anuncios o escribir a propietarios.',
          'Anuncios: los datos del piso que publicas y sus fotos. La dirección exacta no se muestra en público; del anunciante solo se muestra el nombre de pila. Revisamos cada anuncio antes de publicarlo.',
          'Mensajes: lo que os escribís propietario e inquilino a través de la web, para que podáis hablar sin dar vuestro teléfono o correo. Solo lo ven las dos partes; el equipo solo accede si hay que atender una denuncia de abuso o una obligación legal.',
          'Guardamos la fecha y el texto del consentimiento que diste, para poder demostrarlo. No guardamos tu dirección IP.',
        ],
      },
      {
        h: 'Base jurídica',
        p: ['Lista de espera y newsletter: tu consentimiento, que das al marcar la casilla de cada formulario. Puedes retirarlo en cualquier momento sin que afecte a lo anterior: en cada correo hay un enlace para darte de baja, o puedes escribirnos.', 'Cuenta, anuncios y mensajes: la ejecución de las condiciones de uso que aceptas al crear la cuenta (RGPD art. 6.1.b).'],
      },
      {
        h: 'Quién más accede a tus datos',
        p: [
          `Los datos se guardan en nuestros propios sistemas, alojados por ${legal.hostingProvider}, que actúa como encargado del tratamiento con un contrato que garantiza la protección de tus datos. Si el proveedor está fuera del Espacio Económico Europeo, la transferencia se ampara en las cláusulas contractuales tipo de la Comisión Europea o en el Marco de Privacidad de Datos UE-EE. UU.`,
          'Los correos que te enviamos (avisos de tu cuenta, valoraciones y, si lo pides, novedades) salen a través de Brevo (Sendinblue SAS, Francia, en la Unión Europea), que actúa como encargado del tratamiento. Los que nos escribes a nuestra dirección de correo se reciben a través de ImprovMX.',
          'Solo las personas autorizadas del equipo acceden a ellos, con usuario y contraseña.',
          'No vendemos ni cedemos tus datos a terceros, salvo obligación legal.',
        ],
      },
      {
        h: 'Cuánto tiempo los conservamos',
        p: ['Lista de espera: hasta el lanzamiento y, como máximo, 24 meses desde que te apuntas. Newsletter: hasta que te des de baja. Valoraciones del alquiler: 12 meses desde que la pides. Encuesta: las respuestas, anónimas y sin límite; el correo, hasta que te des de baja. Cuenta, anuncios y mensajes: mientras tengas la cuenta; puedes borrarla tú mismo desde «Mi cuenta» y se eliminan con ella tus anuncios, fotos y conversaciones.'],
      },
      {
        h: 'Tus derechos',
        p: [`Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${brand.email}. Si consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`],
      },
    ],
  },
  'condiciones': {
    title: 'Condiciones de uso',
    updated: 'octubre de 2026',
    blocks: [
      {
        h: 'Qué es este servicio',
        p: [
          `${brand.name} está en fase beta. Con una cuenta, los propietarios pueden publicar anuncios de sus pisos en alquiler y quienes buscan piso pueden verlos y escribir a los propietarios a través de la web.`,
          `En esta fase ${brand.name} no cobra nada, no firma contratos en nombre de nadie, no gestiona cobros y no custodia dinero. La hucha, la firma del contrato y los cobros se activarán en el lanzamiento, con condiciones que se aceptarán aparte. ${brand.name} no es una aseguradora.`,
        ],
      },
      {
        h: 'Cuenta',
        p: ['Tienes que ser mayor de edad y dar datos reales. Eres responsable de guardar tu contraseña. Puedes borrar tu cuenta cuando quieras desde «Mi cuenta».'],
      },
      {
        h: 'Anuncios',
        p: [
          'Solo puedes anunciar viviendas que tengas derecho a alquilar (como propietario o con su autorización). El anuncio debe ser veraz: fotos del piso real, renta y condiciones correctas, y la calificación energética, que es obligatoria en los anuncios de alquiler.',
          'Revisamos cada anuncio antes de publicarlo y podemos pedir cambios o retirarlo si incumple estas condiciones o la ley (por ejemplo, si discrimina por origen, sexo, religión, orientación o discapacidad).',
          'Los gastos de gestión inmobiliaria y de formalización del contrato no se pueden repercutir al inquilino (Ley 12/2023).',
        ],
      },
      {
        h: 'Mensajes',
        p: ['Los mensajes son para hablar del alquiler. No se permite el acoso, el spam, pedir dinero por adelantado antes de ver el piso ni compartir datos de terceros. Si recibes algo así, escríbenos y actuaremos.', `Nunca pagues una señal ni envíes dinero a nadie antes de visitar el piso y comprobar quién es el propietario. ${brand.name} nunca te pedirá pagos por mensaje.`],
      },
      {
        h: 'Responsabilidad',
        p: [`${brand.name} pone en contacto a propietarios e inquilinos y revisa los anuncios, pero el acuerdo de alquiler es entre ellos. No garantizamos que un anuncio termine en contrato.`],
      },
      {
        h: 'Cambios y ley aplicable',
        p: ['Podemos actualizar estas condiciones; si el cambio es importante, te avisaremos. Se rigen por la legislación española.'],
      },
    ],
  },
  'cookies': {
    title: 'Política de cookies',
    updated: 'octubre de 2026',
    blocks: [
      {
        h: 'Esta web no usa cookies de seguimiento',
        p: ['No instalamos cookies de análisis, de publicidad ni de redes sociales, ni propias ni de terceros. Por eso no te mostramos un aviso de cookies.', 'Para saber qué páginas se visitan, contamos las visitas de forma agregada y anónima: sin cookies, sin guardar nada en tu dispositivo y sin guardar tu dirección IP. Cada visita se asocia a una huella que cambia cada día y no permite identificarte ni seguirte de un día para otro.'],
      },
      {
        h: 'Cookie técnica de tu cuenta',
        p: ['Si creas una cuenta o entras en ella, instalamos una cookie técnica de sesión («rh-user») para mantenerte dentro hasta 30 días o hasta que salgas. Es imprescindible para el servicio que pides y no requiere consentimiento (LSSI, art. 22.2). Si solo navegas por la web, no se instala.'],
      },
      {
        h: 'Cookie técnica del panel interno',
        p: ['Solo el panel de administración, que usa el equipo, instala una cookie técnica de sesión («rh-admin») para mantener iniciada la sesión durante 8 horas. Es imprescindible para ese servicio y no requiere consentimiento (LSSI, art. 22.2). Si solo visitas la web, no se instala.'],
      },
      {
        h: 'Recursos de terceros',
        p: ['La tipografía y el resto de recursos se sirven desde nuestro propio dominio, sin peticiones a servicios externos. Si en el futuro añadimos herramientas que usen cookies, actualizaremos esta política y te pediremos tu consentimiento antes de instalarlas.'],
      },
    ],
  },
}

const page = computed(() => pages[route.params.slug as string])
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada', fatal: true })
}

useSeoMeta({ title: () => page.value?.title ?? '', robots: 'noindex' })
</script>

<template>
  <section v-if="page" class="section">
    <div class="container prose">
      <h1>{{ page.title }}</h1>
      <p class="updated">Última actualización: {{ page.updated }}</p>
      <div v-for="(b, i) in page.blocks" :key="i" class="block">
        <h2 v-if="b.h">{{ b.h }}</h2>
        <p v-for="(p, j) in b.p" :key="j" :class="{ todo: p.includes('[pendiente') }">{{ p }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prose { max-width: 760px; }
.updated { color: var(--muted); font-size: 0.9rem; margin-bottom: 40px; }
.block { margin-bottom: 32px; }
h2 { font-size: 1.4rem; margin-bottom: 12px; }
p { color: var(--muted); }
.todo { color: var(--danger); }
</style>
