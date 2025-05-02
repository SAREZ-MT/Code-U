<template>
  <div class="editor-wrapper">
    <!-- Este div es solo para Vue Router, el editor real se muestra directamente -->
  </div>
</template>

<script>
import { getProject, updateProject } from '../../firebase/projects-service';
import { getCurrentUser } from '../../firebase/auth-service';
import { encode, decode } from 'js-base64';

export default {
  name: 'EditorContainer',
  data() {
    return {
      scriptLoaded: false,
      originalPath: null,
      editorInitialized: false,
      editorInstance: null,
      projectId: null,
      projectData: null,
      saving: false
    }
  },
  async created() {
    // Obtener el ID del proyecto de los parámetros de ruta si existe
    this.projectId = this.$route.params.projectId;
    
    if (this.projectId) {
      try {
        // Cargar el proyecto desde Firebase
        this.projectData = await getProject(this.projectId);
      } catch (error) {
        console.error('Error al cargar el proyecto:', error);
      }
    }
  },
  mounted() {
    // Guardar la ruta original antes de que el editor la modifique
    this.originalPath = window.location.pathname;
    
    // Configurar evento personalizado para capturar actualizaciones de URL
    window.addEventListener('editor-url-updated', this.handleEditorUrlUpdate);
    
    // Asegurarse que el div del editor es visible y tiene el estilo correcto
    const editorContainer = document.getElementById('editor-container');
    if (editorContainer) {
      editorContainer.style.display = 'block';
      document.body.classList.add('editor-mode');
    }
    
    // Añadir la clase editor-layout al body para aplicar el layout del editor
    document.body.classList.add('editor-layout');

    // Establecer manejo de errores de WebSocket
    this.setupWebSocketErrorHandling();

    // Cargar primero el CSS del editor
    this.loadEditorCSS();

    // Cargar el script del editor solo si aún no está cargado
    if (!this.scriptLoaded && !document.getElementById('main-editor-script')) {
      this.loadMainScript();
    } else if (this.scriptLoaded) {
      // Si ya está cargado, reinicializar el editor
      this.initializeEditor();
    }

    // Desactivar el historial del navegador mientras el editor está activo
    this.patchHistoryMethods();
    
    // Forzar un repintado después de un breve delay
    setTimeout(() => {
      this.forceEditorsRefresh();
      
      // Asegurar que el botón de volver al dashboard esté presente
      this.addBackToDashboardButton();
    }, 300);
    
    // Configurar tecla rápida para guardar (Ctrl+S)
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    // Eliminar listeners cuando el componente se desmonta
    window.removeEventListener('editor-url-updated', this.handleEditorUrlUpdate);
    document.removeEventListener('keydown', this.handleKeyDown);
    
    // Restaurar los métodos originales del historial si los hemos parcheado
    if (window.history._originalPushState) {
      window.history.pushState = window.history._originalPushState;
      window.history.replaceState = window.history._originalReplaceState;
    }
    
    // Usar replaceState para limpiar la URL correctamente
    window.history.replaceState(null, null, '/dashboard');
    
    // Ocultar el editor cuando se navega a otra página
    const editorContainer = document.getElementById('editor-container');
    if (editorContainer) {
      editorContainer.style.display = 'none';
      document.body.classList.remove('editor-mode');
    }
    
    // Remover la clase editor-layout al salir del editor
    document.body.classList.remove('editor-layout');
    
    // Limpiar el estado del editor
    this.editorInitialized = false;
  },
  methods: {
    handleKeyDown(e) {
      // Detectar Ctrl+S o Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Prevenir el comportamiento predeterminado (guardar página)
        this.saveProject();
      }
    },
    async saveProject() {
      if (!this.projectId || !this.editorInstance || this.saving) return;
      
      this.saving = true;
      
      try {
        // Obtener el contenido actual del editor
        const editors = this.editorInstance.editors;
        const html = editors.html.getValue();
        const css = editors.css.getValue();
        const js = editors.javascript.getValue();
        
        // Actualizar el proyecto en Firebase
        await updateProject(this.projectId, {
          html,
          css,
          js,
          updatedAt: new Date()
        });
        
        console.log('Proyecto guardado correctamente');
        // Aquí podrías mostrar una notificación de éxito
      } catch (error) {
        console.error('Error al guardar el proyecto:', error);
        // Aquí podrías mostrar una notificación de error
      } finally {
        this.saving = false;
      }
    },
    async loadProjectContent() {
      if (!this.projectData || !this.editorInstance) return;
      
      const { html, css, js } = this.projectData;
      
      // Obtener referencia a los editores
      const editors = this.editorInstance.editors;
      
      // Establecer contenido
      if (editors.html && html) editors.html.setValue(html);
      if (editors.css && css) editors.css.setValue(css);
      if (editors.javascript && js) editors.javascript.setValue(js);
      
      // Actualizar la vista previa
      if (this.editorInstance.update) {
        this.editorInstance.update();
      }
    },
    handleEditorUrlUpdate(event) {
      // Notificar a Vue Router sobre el cambio en la URL
      console.log('Editor URL actualizada:', event.detail.path);
      
      // Si estamos editando un proyecto existente, guardar los cambios
      if (this.projectId) {
        this.saveProject();
      }
    },
    loadEditorCSS() {
      // Asegurarse de que los estilos estén cargados
      if (!document.getElementById('editor-styles')) {
        const link = document.createElement('link');
        link.id = 'editor-styles';
        link.rel = 'stylesheet';
        
        // Usar rutas relativas a la raíz para que funcione en producción
        const isProduction = import.meta.env?.PROD;
        link.href = isProduction ? '/assets/index-BVpZ1eyq.css' : '/src/style.css';
        
        document.head.appendChild(link);
        console.log('Estilos del editor cargados:', link.href);
      }
    },
    loadMainScript() {
      // Carga del script principal del editor
      const script = document.createElement('script');
      script.id = 'main-editor-script';
      script.type = 'module';
      
      // Usar rutas relativas a la raíz que funcionen en producción
      const isProduction = import.meta.env?.PROD;
      
      // En producción, cargar el script compilado desde assets, en desarrollo usar la ruta del código fuente
      script.src = isProduction ? '/assets/index-CIRy2lpn.js' : '/src/main.js';
      
      script.onload = () => {
        this.scriptLoaded = true;
        console.log('Editor script loaded successfully');
        
        // Inicializar el editor después de cargar el script
        this.initializeEditor();
      };
      
      script.onerror = (error) => {
        console.error('Error loading editor script:', error);
        
        // Si falla en producción con el nombre de archivo con hash, intentar buscar un patrón alternativo
        if (isProduction && script.src.includes('index-')) {
          // Buscar cualquier script que comience con 'index-' en la carpeta assets
          const fallbackScript = document.createElement('script');
          fallbackScript.id = 'main-editor-script-fallback';
          fallbackScript.type = 'module';
          fallbackScript.src = '/assets/index.js'; // Nombre genérico como respaldo
          
          fallbackScript.onload = () => {
            this.scriptLoaded = true;
            console.log('Editor script loaded with fallback');
            this.initializeEditor();
          };
          
          fallbackScript.onerror = (error) => {
            console.error('Error loading fallback editor script:', error);
          };
          
          document.body.appendChild(fallbackScript);
        }
      };
      
      document.body.appendChild(script);
    },
    initializeEditor() {
      // Verificar que los editores estén disponibles
      if (this.editorInitialized) return;
      
      console.log('Iniciando proceso de inicialización del editor');
      
      // Esperar a que todos los elementos estén disponibles
      setTimeout(() => {
        // Forzar un reflow/repaint para asegurarse de que todo se renderiza correctamente
        window.dispatchEvent(new Event('resize'));
        
        // Reinicializar manualmente el editor si es necesario
        const editorElements = document.querySelectorAll('codi-editor');
        console.log('Elementos de editor encontrados:', editorElements.length);
        
        if (editorElements.length > 0) {
          // Verificar si los editores ya tienen instancias de Monaco
          const needsInit = Array.from(editorElements).some(el => !el.editor);
          console.log('El editor necesita inicialización:', needsInit);
          
          // Intentar inicializar incluso si no se detecta la necesidad
          if (window.initializeApp) {
            console.log('Inicializando manualmente el editor');
            try {
              this.editorInstance = window.initializeApp();
              console.log('Editor inicializado correctamente');
            } catch (error) {
              console.error('Error al inicializar editor:', error);
              // Reintentar en caso de error
              setTimeout(() => this.retryEditorInitialization(), 1000);
              return;
            }
            
            // Si hay un proyecto, cargar su contenido
            if (this.projectData) {
              // Dar tiempo para que los editores se inicialicen completamente
              setTimeout(() => {
                this.loadProjectContent();
              }, 500);
            }
          } else {
            console.error('window.initializeApp no está disponible');
            // Recargar el script principal
            this.loadMainScript();
            return;
          }
          
          // Forzar el enfoque en el editor HTML (fundamental para que funcione)
          const htmlEditor = document.getElementById('markup');
          if (htmlEditor && htmlEditor.focus) {
            htmlEditor.focus();
          }
          
          this.editorInitialized = true;
          
          // Una vez que todo esté listo, asegurarse que los layouts y settings funcionen
          this.ensureLayoutSettingsWork();
          // Forzar un refresh adicional
          setTimeout(() => this.forceEditorsRefresh(), 1000);
        } else {
          console.error('No se encontraron elementos de editor');
          // Reintentar si no hay editores
          setTimeout(() => this.initializeEditor(), 1000);
        }
      }, 500);
    },
    retryEditorInitialization() {
      console.log('Reintentando inicialización del editor...');
      // Reiniciar el estado
      this.editorInitialized = false;
      
      // Recargar los scripts necesarios
      this.loadMainScript();
      
      // Reintentar la inicialización
      setTimeout(() => this.initializeEditor(), 1500);
    },
    ensureLayoutSettingsWork() {
      // Asegurarse de que los controles de layout funcionan
      setTimeout(() => {
        console.log('Configurando controles de layout...');
        
        // Verificar si los elementos de layout existen
        const layoutRadios = document.querySelectorAll('input[name="layout"]');
        console.log('Radio buttons de layout encontrados:', layoutRadios.length);
        
        // Crear contenedor de layouts si no existe o está vacío
        const layoutContainer = document.querySelector('.layout-preview-container');
        if (!layoutContainer || !layoutContainer.querySelector('label')) {
          console.log('Recreando contenedor de layouts...');
          this.recreateLayoutControls();
          return; // Salir y esperar a que la recreación termine
        }
        
        if (layoutRadios.length === 0) {
          console.error('No se encontraron controles de layout');
          // Reintentar más tarde si no se encuentran los controles
          setTimeout(() => this.ensureLayoutSettingsWork(), 1000);
          return;
        }
        
        // Asegurar que al menos uno esté seleccionado (default por defecto)
        let hasChecked = false;
        layoutRadios.forEach(radio => {
          if (radio.checked) hasChecked = true;
        });
        
        if (!hasChecked && layoutRadios[0]) {
          console.log('Seleccionando layout por defecto');
          layoutRadios[0].checked = true;
        }
        
        // Aplicar el layout actual inmediatamente
        const currentLayout = Array.from(layoutRadios).find(radio => radio.checked)?.value || 'default';
        console.log('Aplicando layout actual:', currentLayout);
        
        // Forzar la aplicación del layout al inicio
        if (window.setState) {
          window.setState({ layout: currentLayout });
          // Forzar un redibujado
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);
        }
        
        // Agregar event listeners a los controles de layout
        layoutRadios.forEach(radio => {
          // Eliminar listeners existentes para evitar duplicados
          const newRadio = radio.cloneNode(true);
          radio.parentNode.replaceChild(newRadio, radio);
          
          // Agregar nuevo listener
          newRadio.addEventListener('change', (event) => {
            console.log('Cambio de layout a:', newRadio.value);
            
            if (window.setState) {
              window.setState({ layout: newRadio.value });
              
              // Forzar actualización de la interfaz
              setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
                this.forceEditorsRefresh();
              }, 100);
            }
          });
          
          // Asegurar que los controles estén habilitados
          newRadio.disabled = false;
        });
        
        // Forzar que estén habilitados y sean interactivos
        document.querySelectorAll('.settings-item input, .settings-item select').forEach(input => {
          input.disabled = false;
          input.style.pointerEvents = 'auto';
        });
        
        // Asegurar que los divisores (gutters) son visibles e interactivos
        document.querySelectorAll('.first-gutter, .second-gutter, .last-gutter').forEach(gutter => {
          gutter.style.display = 'block';
          gutter.style.visibility = 'visible';
          gutter.style.zIndex = '10';
          gutter.style.pointerEvents = 'auto';
        });
        
        // Forzar un refresco de los editores
        setTimeout(() => {
          this.forceEditorsRefresh();
        }, 500);
        
      }, 1000);
    },
    recreateLayoutControls() {
      console.log('Recreando controles de layout...');
      
      // Buscar el contenedor de la configuración de layouts
      const layoutContainer = document.querySelector('.layout-preview-container');
      if (!layoutContainer) {
        console.error('No se encontró el contenedor de configuración de layouts');
        return;
      }
      
      // Vaciar el contenedor
      layoutContainer.innerHTML = '';
      
      // Crear los controles para cada layout
      const layouts = [
        { id: 'default', name: 'Default' },
        { id: 'horizontal', name: 'Horizontal' },
        { id: 'bottom', name: 'Bottom' }
      ];
      
      // Obtener el layout actual del estado
      const currentLayout = window.getState ? window.getState().layout : 'default';
      
      // Crear los elementos para cada layout
      layouts.forEach(layout => {
        // Crear elemento label
        const label = document.createElement('label');
        label.setAttribute('for', layout.name.toLowerCase());
        
        // Crear el radio button
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'layout';
        radio.id = layout.name.toLowerCase();
        radio.value = layout.id;
        radio.checked = layout.id === currentLayout;
        
        // Crear el componente de visualización
        const preview = document.createElement('div');
        preview.className = `layout-preview layout-${layout.id}`;
        preview.setAttribute('layout', layout.id);
        
        // Añadir elementos visuales al preview
        const html = document.createElement('div');
        html.className = 'html';
        const css = document.createElement('div');
        css.className = 'css';
        const js = document.createElement('div');
        js.className = 'js';
        const result = document.createElement('div');
        result.className = 'result';
        
        // Añadir elementos al preview
        preview.appendChild(html);
        preview.appendChild(css);
        preview.appendChild(js);
        preview.appendChild(result);
        
        // Añadir elementos al label
        label.appendChild(radio);
        label.appendChild(preview);
        
        // Añadir label al contenedor
        layoutContainer.appendChild(label);
        
        // Añadir estilos al preview
        this.addPreviewStyles(layout.id);
      });
      
      // Configurar los event listeners para los radio buttons
      setTimeout(() => this.ensureLayoutSettingsWork(), 100);
    },
    addPreviewStyles(layoutId) {
      // Estilos para los previews de layout
      const styleId = 'layout-preview-styles';
      
      // Verificar si ya existe el estilo
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .layout-preview {
            display: grid;
            height: 40px;
            width: 40px;
            padding: 3px;
            background-color: #2a2a2a;
            border-radius: 4px;
            box-sizing: border-box;
            gap: 3px;
            margin: 5px;
            transition: all 0.2s ease;
            border: 2px solid transparent;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          }
          
          .layout-preview:hover {
            transform: scale(1.05);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
          }
          
          input[type="radio"]:checked + .layout-preview {
            border: 2px solid #4c84ff;
            background-color: #333;
          }
          
          .layout-preview .html {
            background-color: #e34f26;
            grid-area: html;
            border-radius: 2px;
          }
          
          .layout-preview .css {
            background-color: #30a9dc;
            grid-area: css;
            border-radius: 2px;
          }
          
          .layout-preview .js {
            background-color: #f7df1e;
            grid-area: js;
            border-radius: 2px;
          }
          
          .layout-preview .result {
            background-color: #ffffff;
            grid-area: result;
            border-radius: 2px;
          }
          
          /* Default layout */
          .layout-default {
            grid-template-areas:
              "html js"
              "css result";
          }
          
          /* Horizontal layout */
          .layout-horizontal {
            grid-template-areas:
              "html"
              "css"
              "js"
              "result";
          }
          
          /* Bottom layout */
          .layout-bottom {
            grid-template-areas:
              "result result result"
              "html js css";
          }
          
          .layout-preview-container {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 10px;
            justify-content: center;
            padding: 5px;
          }
          
          .layout-preview-container label {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }
          
          .layout-preview-container label::after {
            content: attr(for);
            font-size: 12px;
            margin-top: 5px;
            color: #ccc;
            text-transform: capitalize;
          }
          
          .layout-preview-container input[type="radio"] {
            display: none;
          }
        `;
        document.head.appendChild(style);
      }
    },
    forceEditorsRefresh() {
      // Forzar que los editores Monaco se repinten
      const editorElements = document.querySelectorAll('codi-editor');
      editorElements.forEach(editor => {
        if (editor && editor.editor) {
          editor.editor.layout();
          
          // Añadir estilos que fuercen la interactividad
          const monacoElement = editor.querySelector('.monaco-editor');
          if (monacoElement) {
            monacoElement.style.pointerEvents = 'auto';
            const inputArea = monacoElement.querySelector('.inputarea');
            if (inputArea) {
              inputArea.style.pointerEvents = 'auto';
              inputArea.style.opacity = '1';
              inputArea.focus();
            }
          }
        }
      });
    },
    patchHistoryMethods() {
      // Guardar referencia a los métodos originales
      window.history._originalPushState = window.history.pushState;
      window.history._originalReplaceState = window.history.replaceState;
      
      // Crear un shim para las funciones de historial que evita conflictos con Vue Router
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      const self = this;
      
      window.history.pushState = function(...args) {
        const result = originalPushState.apply(this, args);
        
        // Si la URL empieza con /, considerarlo una operación de editor
        if (typeof args[2] === 'string' && args[2].startsWith('/') && 
            (args[2].includes('|') || args[2].includes('%7C')) && 
            !args[2].startsWith('/editor')) {
          // Este es un cambio de URL del editor, dejarlo procesarse normalmente
          console.log('URL del editor actualizada (pushState):', args[2]);
        }
        
        return result;
      };
      
      window.history.replaceState = function(...args) {
        const result = originalReplaceState.apply(this, args);
        
        // Si la URL empieza con /, considerarlo una operación de editor
        if (typeof args[2] === 'string' && args[2].startsWith('/') && 
            (args[2].includes('|') || args[2].includes('%7C')) && 
            !args[2].startsWith('/editor')) {
          // Este es un cambio de URL del editor, dejarlo procesarse normalmente
          console.log('URL del editor actualizada (replaceState):', args[2]);
        }
        
        return result;
      };
    },
    // Método para añadir el botón "Volver al Dashboard" al editor
    addBackToDashboardButton() {
      // Verificar si estamos en modo editor
      if (document.body.classList.contains('editor-mode')) {
        const footerElement = document.querySelector('aside .aside-sections footer');
        
        // Si no existe el botón, crearlo
        if (footerElement && !document.getElementById('back-to-dashboard-button')) {
          const backButton = document.createElement('button');
          backButton.id = 'back-to-dashboard-button';
          backButton.className = 'bar-button';
          backButton.setAttribute('aria-label', 'Volver al Dashboard');
          backButton.setAttribute('data-action', 'back-to-dashboard');
          backButton.setAttribute('data-is-simple-click-action', 'true');
          
          // Crear contenido del botón
          backButton.innerHTML = `
            <span role="tooltip" class="button-title">Volver</span>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 1 1 1.06 1.06L5.81 11.5h12.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06z" fill="currentColor"/>
            </svg>
          `;
          
          // Añadir el botón al inicio del footer
          footerElement.insertBefore(backButton, footerElement.firstChild);
          
          // Eliminar cualquier event listener existente para evitar duplicación
          backButton.replaceWith(backButton.cloneNode(true));
          const newBackButton = document.getElementById('back-to-dashboard-button');
          
          // Usar goBackToDashboard directamente para asegurar consistencia
          newBackButton.addEventListener('click', () => {
            this.goBackToDashboard();
          });
        } else if (document.getElementById('back-to-dashboard-button')) {
          // Si el botón ya existe, asegurarse de que tenga el event listener correcto
          const existingButton = document.getElementById('back-to-dashboard-button');
          const newButton = existingButton.cloneNode(true);
          existingButton.replaceWith(newButton);
          
          newButton.addEventListener('click', () => {
            this.goBackToDashboard();
          });
        }
      }
    },
    
    // Método para regresar al dashboard (mantenerlo para compatibilidad)
    goBackToDashboard() {
      // Guardar cambios antes de salir si hay un proyecto abierto
      if (this.projectId && this.editorInstance) {
        this.saveProject();
      }
      
      // Restaurar los métodos originales del historial si los hemos parcheado
      if (window.history._originalPushState) {
        window.history.pushState = window.history._originalPushState;
        window.history.replaceState = window.history._originalReplaceState;
      }
      
      // Limpiar la URL explícitamente antes de redirigir
      window.history.replaceState(null, null, '/dashboard');
      
      // Redirigir al dashboard
      this.$router.replace('/dashboard');
    },
    // Método para manejar errores de WebSocket
    setupWebSocketErrorHandling() {
      // Variable para almacenar errores anteriores y evitar duplicados
      window._wsErrorsEncountered = window._wsErrorsEncountered || new Set();
      
      // Proxy para WebSocket para capturar errores
      if (!window._originalWebSocket) {
        window._originalWebSocket = window.WebSocket;
        
        window.WebSocket = function(url, protocols) {
          const ws = new window._originalWebSocket(url, protocols);
          
          // Manejar errores en la conexión
          ws.addEventListener('error', function(event) {
            const errorKey = url + '-error';
            
            // Evitar mostrar el mismo error múltiples veces
            if (!window._wsErrorsEncountered.has(errorKey)) {
              window._wsErrorsEncountered.add(errorKey);
              
              console.warn('WebSocket connection error:', url);
              
              // Si el error es con localhost o HMR, no es crítico para el editor
              const isHMRSocket = url.includes('localhost') || url.includes('127.0.0.1');
              
              if (isHMRSocket) {
                console.log('HMR WebSocket fallido, pero no afecta la funcionalidad principal del editor');
              }
            }
          });
          
          return ws;
        };
        
        // Copiar propiedades y prototipo
        window.WebSocket.prototype = window._originalWebSocket.prototype;
        window.WebSocket.CONNECTING = window._originalWebSocket.CONNECTING;
        window.WebSocket.OPEN = window._originalWebSocket.OPEN;
        window.WebSocket.CLOSING = window._originalWebSocket.CLOSING;
        window.WebSocket.CLOSED = window._originalWebSocket.CLOSED;
      }
    }
  }
}
</script>

<style>
/* Estilos específicos para la página del editor */
.editor-wrapper {
  display: none; /* Este div es solo para Vue Router */
}

/* Estilos para forzar que el editor ocupe toda la ventana */
body.editor-mode {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

body.editor-mode #editor-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  display: block !important;
}

body.editor-mode #vue-app {
  display: none;
}

/* Estilos para el botón Volver al Dashboard */
#back-to-dashboard-button {
  position: relative;
  margin-bottom: 15px;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 10px;
}

#back-to-dashboard-button::before {
  content: '';
  display: block;
  width: 16px;
  height: 1px;
  margin: 0 auto;
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
}

#back-to-dashboard-button:hover {
  background-color: rgba(255,255,255,0.1);
}

/* Asegurar que los editores Monaco son interactivos */
body.editor-mode .monaco-editor,
body.editor-mode .monaco-editor .inputarea {
  pointer-events: auto !important;
  opacity: 1 !important;
}

/* Forzar interactividad de los elementos del editor */
body.editor-mode codi-editor,
body.editor-mode .grid,
body.editor-mode #editor,
body.editor-mode #app {
  pointer-events: auto !important;
}

/* Estilos para los botones y controles */
body.editor-mode input,
body.editor-mode select,
body.editor-mode button {
  pointer-events: auto !important;
}

/* Asegurar que los iframes funcionen correctamente */
body.editor-mode iframe {
  pointer-events: auto !important;
}
</style> 