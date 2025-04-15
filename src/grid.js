import Split from 'split-grid'
import {
  DEFAULT_GRID_TEMPLATE,
  EDITOR_GRID_TEMPLATE
} from './constants/editor-grid-template'
import {
  BOTTOM_LAYOUT,
  DEFAULT_LAYOUT,
  HORIZONTAL_LAYOUT
} from './constants/grid-templates'
import { getState } from './state'
import { $, $$ } from './utils/dom'

const $editor = $('#editor')
const rootElement = document.documentElement
const $$layoutSelector = $$('layout-preview')
const $$editors = $$('#editor codi-editor')
const $tabsContainer = $('#tabs')
const $$tabs = $$('#tabs label')
let splitInstance

// Lista de layouts disponibles
const AVAILABLE_LAYOUTS = ['default', 'horizontal', 'bottom']

const selectTab = (event) => {
  $$editors.forEach($editor => ($editor.style.display = 'none'))
  const $targetEditor = $(`#${event.target.getAttribute('for')}`)
  $targetEditor.style.display = 'block'
  $$tabs.forEach($t => $t.classList.remove('active'))
  event.target.classList.add('active')
}

$$tabs.forEach($tab => {
  $tab.addEventListener('click', selectTab)
})

const formatGutters = gutter => ({
  ...gutter,
  element: $(gutter.element)
})

// Método de preservación de grid
const saveGridTemplate = () => {
  const gridStyles = $('.grid').style

  const gridTemplate = JSON.stringify({
    'grid-template-columns': gridStyles['grid-template-columns'],
    'grid-template-rows': gridStyles['grid-template-rows']
  })

  window.localStorage.setItem('gridTemplate', gridTemplate)
}

const getInitialGridStyle = () => {
  try {
    const gridTemplate = JSON.parse(window.localStorage.getItem('gridTemplate'))

    return (
      gridTemplate &&
      `grid-template-columns: ${gridTemplate['grid-template-columns']}; grid-template-rows: ${gridTemplate['grid-template-rows']}`
    )
  } catch (e) {
    return null
  }
}

const configLayoutTabsElements = (type) => {
  // Ya no necesitamos el caso especial para tabs
  $tabsContainer.setAttribute('hidden', 'hidden')
  $tabsContainer.style.display = 'none'
  $('.second-gutter').style.display = 'block'
  $('.last-gutter').style.display = 'block'
  $$editors.forEach(($editor, i) => {
    $editor.style.display = 'block'
    $editor.style.gridArea = $editor.getAttribute('data-grid-area')
  })
}

const setGridLayout = (type = '') => {
  // Si el layout solicitado no está en la lista de disponibles, usar default
  if (!AVAILABLE_LAYOUTS.includes(type)) {
    type = 'default';
  }
  
  console.log('Estableciendo layout:', type);
  
  // Verificar elementos críticos
  console.log('Elementos críticos del editor:');
  console.log('- Editor container:', $editor ? 'Presente' : 'No encontrado');
  console.log('- Tabs container:', $tabsContainer ? 'Presente' : 'No encontrado');
  console.log('- Layout selectors:', $$layoutSelector.length);
  console.log('- Editores:', $$editors.length);
  
  try {
    // Verificar que tengamos el contenedor del editor
    if (!$editor) {
      console.error('No se encontró el contenedor del editor #editor');
      return;
    }
    
    // Obtener la plantilla CSS para el layout
    const style = EDITOR_GRID_TEMPLATE[type] || DEFAULT_GRID_TEMPLATE;

    // Mapeo de configuraciones de divisores para cada layout
    const layoutMap = {
      'default': DEFAULT_LAYOUT,
      'horizontal': HORIZONTAL_LAYOUT,
      'bottom': BOTTOM_LAYOUT
    };
    
    const gutters = layoutMap[type] || DEFAULT_LAYOUT;

    // Configurar los elementos del DOM según el layout
    configLayoutTabsElements(type);

    // Guardar el layout en localStorage para persistencia
    try {
      localStorage.setItem('selectedLayout', type);
    } catch (e) {
      console.error('Error al guardar layout en localStorage:', e);
    }

    // Obtener estilo inicial si existe y no hay una instancia de Split
    const initialStyle = !splitInstance && getInitialGridStyle();
    
    // Aplicar estilo al grid principal y al elemento raíz
    rootElement.setAttribute('data-layout', type);
    $editor.setAttribute('style', initialStyle || style);
    console.log('Aplicado estilo de grid:', initialStyle || style);
    
    // Verificar que los divisores existen
    const checkGuttersExist = () => {
      const missingGutters = ['.first-gutter', '.second-gutter', '.last-gutter'].filter(selector => !$(selector));
      if (missingGutters.length > 0) {
        console.error('Faltan divisores:', missingGutters.join(', '));
        return false;
      }
      return true;
    };
    
    if (!checkGuttersExist()) {
      console.error('No se pueden aplicar los divisores porque faltan elementos en el DOM');
      // Intentar crear los divisores si faltan
      createMissingGutters();
      
      // Reintentar la aplicación del layout después de crear los divisores
      setTimeout(() => setGridLayout(type), 100);
      return;
    }

    // Actualizar la visualización de los selectores de layout en los controles visuales
    const updateLayoutRadios = () => {
      // Actualizar los radio buttons
      const layoutRadios = document.querySelectorAll('input[name="layout"]');
      layoutRadios.forEach(radio => {
        radio.checked = radio.value === type;
      });
      
      // Actualizar también los selectores de layout originales si existen
      $$layoutSelector.forEach(layoutEl => {
        if (type === layoutEl.getAttribute('layout')) {
          layoutEl.setAttribute('active', 'true');
        } else {
          layoutEl.removeAttribute('active');
        }
      });
    };
    
    updateLayoutRadios();

    // Guardar la configuración actual
    saveGridTemplate();

    // Configuración para Split.js
    const splitConfig = {
      ...gutters,
      ...(gutters.columnGutters && {
        columnGutters: gutters.columnGutters.map(formatGutters)
      }),
      ...(gutters.rowGutters && {
        rowGutters: gutters.rowGutters.map(formatGutters)
      }),
      minSize: 1,
      onDragEnd: saveGridTemplate
    };

    // Destruir instancia anterior si existe
    if (splitInstance) {
      console.log('Destruyendo instancia anterior de Split.js');
      splitInstance.destroy(true);
    }

    // Crear nueva instancia de Split.js
    try {
      console.log('Creando nueva instancia de Split.js con config:', JSON.stringify(splitConfig));
      splitInstance = Split(splitConfig);
      
      // Forzar resize para asegurar que Monaco Editor se actualice
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        
        // Asegurar que los elementos del divisor tienen el estilo correcto
        document.querySelectorAll('.first-gutter, .second-gutter, .last-gutter').forEach(gutter => {
          gutter.style.pointerEvents = 'auto';
          gutter.style.zIndex = '5';
          gutter.style.backgroundColor = 'var(--grid-background, #1e1e1e)';
        });
      }, 100);
      
    } catch (error) {
      console.error('Error al inicializar Split.js:', error);
    }
  } catch (e) {
    console.error('Error al establecer el layout:', e);
  }
}

// Función para crear divisores faltantes
const createMissingGutters = () => {
  console.log('Creando divisores faltantes...');
  
  if (!$editor) {
    console.error('No se puede crear divisores sin el contenedor del editor');
    return;
  }
  
  // Verificar y crear el primer divisor
  if (!$('.first-gutter')) {
    const firstGutter = document.createElement('div');
    firstGutter.className = 'first-gutter';
    $editor.appendChild(firstGutter);
    console.log('Creado primer divisor');
  }
  
  // Verificar y crear el segundo divisor
  if (!$('.second-gutter')) {
    const secondGutter = document.createElement('div');
    secondGutter.className = 'second-gutter';
    $editor.appendChild(secondGutter);
    console.log('Creado segundo divisor');
  }
  
  // Verificar y crear el último divisor
  if (!$('.last-gutter')) {
    const lastGutter = document.createElement('div');
    lastGutter.className = 'last-gutter';
    $editor.appendChild(lastGutter);
    console.log('Creado último divisor');
  }
}

export default setGridLayout
