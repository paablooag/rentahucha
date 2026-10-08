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
          `${brand.name} es un proyecto en fase previa al lanzamiento. Esta web informa sobre el servicio y permite apuntarse a una lista de espera y a una newsletter. Todavía no se presta el servicio ni se contrata nada a través de ella.`,
          'La renta garantizada se prestará, desde el lanzamiento, a través de una aseguradora autorizada y según las condiciones de su póliza, que se facilitarán antes de contratar. Los cobros y la hucha los gestionará una entidad de pago autorizada.',
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
          'Lista de espera: nombre, correo, ciudad y, según el caso, número de pisos y renta aproximada (propietarios) o renta máxima y situación laboral (inquilinos). Los usamos para avisarte del lanzamiento y darte prioridad para dar de alta tu piso o crear tu pasaporte de inquilino.',
          'Newsletter: tu correo electrónico, para enviarte novedades del servicio y consejos sobre alquiler.',
        ],
      },
      {
        h: 'Base jurídica',
        p: ['Tu consentimiento, que das al marcar la casilla de cada formulario. Puedes retirarlo en cualquier momento sin que afecte a lo anterior: en cada correo hay un enlace para darte de baja, o puedes escribirnos.'],
      },
      {
        h: 'Quién más accede a tus datos',
        p: [
          `Los formularios se reciben a través de ${legal.formsProvider}, que actúa como encargado del tratamiento con un contrato que garantiza la protección de tus datos. Si el proveedor está fuera del Espacio Económico Europeo, la transferencia se ampara en las cláusulas contractuales tipo de la Comisión Europea o en el Marco de Privacidad de Datos UE-EE. UU.`,
          'No vendemos ni cedemos tus datos a terceros, salvo obligación legal.',
        ],
      },
      {
        h: 'Cuánto tiempo los conservamos',
        p: ['Lista de espera: hasta el lanzamiento y, como máximo, 24 meses desde que te apuntas. Newsletter: hasta que te des de baja.'],
      },
      {
        h: 'Tus derechos',
        p: [`Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${brand.email}. Si consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`],
      },
    ],
  },
  'cookies': {
    title: 'Política de cookies',
    updated: 'octubre de 2026',
    blocks: [
      {
        h: 'Esta web no usa cookies',
        p: ['No instalamos cookies propias ni de terceros: ni de análisis, ni de publicidad, ni de redes sociales. Por eso no te mostramos un aviso de cookies.'],
      },
      {
        h: 'Almacenamiento local',
        p: ['Mientras el envío de formularios no está activo, la web puede guardar en tu propio navegador (almacenamiento local) los datos que envías, para que la demo funcione. Esa información no sale de tu dispositivo y puedes borrarla desde los ajustes del navegador.'],
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
