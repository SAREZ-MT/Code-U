import { encode, decode } from 'js-base64'
import { $, $$ } from './utils/dom.js'
import debounce from './utils/debounce.js'
import runJs from './utils/run-js.js'
import { getState, subscribe, setState } from './state.js'
import * as Preview from './utils/WindowPreviewer.js'
import setGridLayout from './grid.js'
import setTheme from './theme.js'
import setLanguage from './language.js'
import './drag-file.js'
import './aside.js'
import './settings.js'
import './components/codi-editor/codi-editor.js'
import './components/layout-preview/layout-preview.jsx'
import { initializeEventsController } from './events-controller.js'

// Esperar a que todos los recursos estén cargados
window.addEventListener('load', async () => {
  // Inicializar la aplicación
  document.addEventListener('DOMContentLoaded', initializeApp);
  // Si el DOM ya está cargado, inicializar directamente
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeApp();
  }
});

// Obtener el estado actual
const { layout: currentLayout, theme, language, saveLocalstorage } = getState()

// Configurar layout y tema iniciales
setGridLayout(currentLayout)
setTheme(theme)
setLanguage(language)

// Comprobar si hay código en la URL
let { pathname } = window.location

// Recuperar código de la URL si existe
const [rawHtml, rawCss, rawJs] = pathname.slice(1).split(pathname.includes('%7C') ? '%7C' : '|')

// Valores iniciales para los editores
const VALUES = {
  html: rawHtml ? decode(rawHtml) : '',
  css: rawCss ? decode(rawCss) : '',
  javascript: rawJs ? decode(rawJs) : ''
}

// Función principal para crear un editor
const createEditor = (domElement) => {
  if (!domElement) {
    console.error('No se proporcionó un elemento DOM para crear el editor')
    return null
  }

  try {
    // Configurar valor inicial si existe
    if ('value' in domElement && domElement.value) {
      domElement.setValue(domElement.value)
    }
    
    // Crear el editor Monaco
    const editorInstance = domElement.createEditor({
      automaticLayout: true,
      theme: theme === 'dark' ? 'vs-dark-custom' : 'vs-light-custom',
      fontSize: getState().fontSize,
      minimap: { enabled: getState().minimap },
      lineNumbers: getState().lineNumbers,
      wordWrap: getState().wordWrap,
      fontLigatures: getState().fontLigatures,
      fontFamily: getState().fontFamily,
      tabSize: getState().tabSize,
      cursorBlinking: getState().cursorBlinking,
      cursorSmoothCaretAnimation: getState().cursorSmoothCaretAnimation
    })
    
    // Devolver una referencia al elemento
    return domElement
  } catch (e) {
    console.error('Error al crear editor:', e)
    return domElement
  }
}

function initializeApp() {
  console.log('Inicializando aplicación...');
  
  // Obtener referencia al iframe
  const iframe = $('iframe')
  
  // Asegurarse de que el iframe existe
  if (!iframe) {
    console.error('No se encontró el iframe')
    return
  }

  // Obtener todos los editores
  const editorElements = $$('codi-editor')
  
  if (editorElements.length === 0) {
    console.error('No se encontraron editores')
    return
  }

  // Crear los editores
  const EDITORS = Array.from(editorElements).reduce((acc, domElement) => {
    const { language } = domElement
    domElement.value = VALUES[language] || ''
    acc[language] = createEditor(domElement)
    return acc
  }, {})

  // Obtener referencias a cada editor
  const { html: htmlEditor, css: cssEditor, javascript: jsEditor } = EDITORS

  // Verificar que todos los editores estén presentes
  if (!htmlEditor || !cssEditor || !jsEditor) {
    console.error('No se pudieron inicializar todos los editores')
    return
  }

  // Inicializar el controlador de eventos
  initializeEventsController({
    jsEditor,
    htmlEditor,
    cssEditor
  })

  // Actualizar opciones del editor cuando cambia el estado
  subscribe(state => {
    const newOptions = { 
      ...state, 
      minimap: { enabled: state.minimap },
      theme: state.theme === 'dark' ? 'vs-dark-custom' : 'vs-light-custom' 
    }

    Object.values(EDITORS).forEach(editor => {
      if (editor && editor.editor && editor.editor.updateOptions) {
        editor.editor.updateOptions(newOptions)
      }
    })
    
    setGridLayout(state.layout)
    setTheme(state.theme)
    setLanguage(state.language)
  })

  // Tiempos de debounce para actualizar la vista previa y la URL
  const MS_UPDATE_DEBOUNCED_TIME = 200
  const MS_UPDATE_HASH_DEBOUNCED_TIME = 1000
  const debouncedUpdate = debounce(update, MS_UPDATE_DEBOUNCED_TIME)
  const debouncedUpdateHash = debounce(updateHashedCode, MS_UPDATE_HASH_DEBOUNCED_TIME)

  // Eventos para la visualización
  function update({ notReload } = {}) {
    try {
      // Asegurarse de que los editores están inicializados
      if (!htmlEditor.getValue || !cssEditor.getValue || !jsEditor.getValue) {
        setTimeout(() => update({ notReload }), 500);
        return;
      }

      const values = {
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue()
      }

      // Actualizar la vista previa
      Preview.updatePreview(values)

      if (!notReload) {
        // Ejecutar JS y recargar el iframe
        const { maxExecutionTime } = getState()
        runJs(values.js, parseInt(maxExecutionTime))
          .then(() => {
            iframe.setAttribute('src', Preview.getPreviewUrl())
          })
          .catch(error => {
            console.error('Error de ejecución:', error)
          })
      } else {
        // Intentar actualizar solo el CSS sin recargar
        updateCss()
      }

      // Actualizar la URL
      debouncedUpdateHash(values)
    } catch (e) {
      console.error('Error durante la actualización:', e)
    }
  }

  // Actualizar solo el CSS en la vista previa sin recargar
  function updateCss() {
    try {
      if (!iframe.contentDocument) return
      
      const iframeStyleEl = iframe.contentDocument.querySelector('#preview-style')
      if (iframeStyleEl) {
        iframeStyleEl.textContent = cssEditor.getValue()
      }
    } catch (e) {
      console.error('Error al actualizar CSS:', e)
    }
  }

  // Actualizar la URL con el código codificado
  function updateHashedCode({ html, css, js }) {
    try {
      const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
      window.history.replaceState(null, null, `/${hashedCode}`)
    } catch (e) {
      console.error('Error al actualizar la URL:', e)
    }
  }

  // Agregar eventos de cambio a todos los editores
  editorElements.forEach(editor => {
    if (editor && editor.editor) {
      editor.editor.onDidChangeModelContent(() => {
        const isCssEditor = editor === cssEditor
        debouncedUpdate({ notReload: isCssEditor })
      })
    }
  })

  // Inicializar la vista previa cuando estén listos los editores
  const checkEditorsReady = () => {
    if (
      htmlEditor.editor && 
      cssEditor.editor && 
      jsEditor.editor
    ) {
      update()
      // Enfocar el editor HTML inicialmente
      htmlEditor.focus()
    } else {
      setTimeout(checkEditorsReady, 500)
    }
  }
  
  // Comenzar verificación
  checkEditorsReady()
}
