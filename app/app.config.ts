export default defineAppConfig({
  brand: {
    // Nombre comercial pendiente de confirmar (dominio y OEPM). Se cambia solo aquí.
    name: 'RentaHucha',
    domain: 'rentahucha.es',
    // Ámbito del servicio, tal como se muestra en los textos.
    area: 'toda España',
    email: 'hola@rentahucha.es',
  },
  // Datos del titular para el aviso legal (LSSI art. 10) y la privacidad (RGPD). Los vacíos se
  // muestran como «pendiente» en la web hasta que se rellenen.
  legal: {
    holder: '', // Nombre y apellidos o razón social
    nif: '',
    address: '', // Domicilio completo
    registry: '', // Solo si es sociedad: datos del Registro Mercantil
    formsProvider: 'Formspree', // Servicio que recibe los formularios (encargado del tratamiento)
  },
  // PDFs generados con `npm run pdf` en public/dossier (nombres fijados en scripts/generate-pdfs.mjs).
  downloads: {
    propietarios: '/dossier/rentahucha-propietarios.pdf',
    inquilinos: '/dossier/rentahucha-inquilinos.pdf',
  },
})
