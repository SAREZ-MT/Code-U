import { createHtml } from './createHtml'

let previewUrl = null
let previewWindowRef = null

export function getPreviewUrl () {
  return previewUrl
}

export function updatePreview ({ html, css, js }) {
  try {
    if (previewUrl) {
      try {
        URL.revokeObjectURL(previewUrl)
      } catch (e) {
        console.warn('Error al revocar URL:', e)
      }
    }

    // Asegurarse de que los valores sean strings
    html = html || '';
    css = css || '';
    js = js || '';

    const htmlForPreview = createHtml({ html, css, js }, true)

    // Manejar posibles errores con Blob
    let blob;
    try {
      blob = new window.Blob([htmlForPreview], { type: 'text/html' })
    } catch (e) {
      console.error('Error al crear Blob:', e)
      return;
    }

    try {
      previewUrl = URL.createObjectURL(blob)
    } catch (e) {
      console.error('Error al crear ObjectURL:', e)
      return;
    }

    if (previewWindowRef?.deref()) {
      try {
        previewWindowRef.deref().location = previewUrl
      } catch (e) {
        console.warn('Error al actualizar ventana de previsualización:', e)
      }
    }
  } catch (error) {
    console.error('Error general en updatePreview:', error)
  }
}

export function clearPreview () {
  URL.revokeObjectURL(previewUrl)
  previewUrl = null
}

export function showPreviewerWindow () {
  const previewWindow = window.open(previewUrl, '_blank')

  // Use a WeafRef so when the user closes the window it could be garbage collected.
  // We need to hold a reference so we can update the location of the window when
  // the pewview changes.
  previewWindowRef = new window.WeakRef(previewWindow)
  const title = `${document.title} | Preview`
  previewWindow.document.title = title
}
