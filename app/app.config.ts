export default defineAppConfig({
  brand: {
    // Nombre comercial pendiente de confirmar (dominio y OEPM). Se cambia solo aquí.
    name: 'RentaHucha',
    domain: 'rentahucha.es',
    // Ámbito del servicio, tal como se muestra en los textos.
    area: 'toda España',
    email: 'hola@rentahucha.es',
  },
  // PDFs generados con `npm run pdf` en public/dossier (nombres fijados en scripts/generate-pdfs.mjs).
  downloads: {
    propietarios: '/dossier/rentahucha-propietarios.pdf',
    inquilinos: '/dossier/rentahucha-inquilinos.pdf',
  },
})
