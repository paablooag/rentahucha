// Tipos mínimos para librerías sin declaraciones propias (solo se usan en la importación del panel).
declare module 'turndown-plugin-gfm' {
  import type TurndownService from 'turndown'
  export const gfm: TurndownService.Plugin
}

declare module 'mammoth/mammoth.browser' {
  interface ConvertResult { value: string; messages: unknown[] }
  interface Images { imgElement: (fn: (image: unknown) => Promise<{ src: string }>) => unknown }
  const mammoth: {
    convertToHtml: (input: { arrayBuffer: ArrayBuffer }, options?: { convertImage?: unknown }) => Promise<ConvertResult>
    images: Images
  }
  export default mammoth
}
