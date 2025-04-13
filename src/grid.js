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
    type = 'default'
  }
  
  console.log('Estableciendo layout:', type);
  const style = EDITOR_GRID_TEMPLATE[type] || DEFAULT_GRID_TEMPLATE

  const layoutMap = {
    'default': DEFAULT_LAYOUT,
    'horizontal': HORIZONTAL_LAYOUT,
    'bottom': BOTTOM_LAYOUT
  };
  
  const gutters = layoutMap[type] || DEFAULT_LAYOUT;

  configLayoutTabsElements(type)

  const initialStyle = !splitInstance && getInitialGridStyle()

  rootElement.setAttribute('data-layout', type)
  $editor.setAttribute('style', initialStyle || style)

  $$layoutSelector.forEach(layoutEl => {
    if (type === layoutEl.getAttribute('layout')) {
      layoutEl.setAttribute('active', 'true')
    } else {
      layoutEl.removeAttribute('active')
    }
  })

  saveGridTemplate()

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
  }

  if (splitInstance) {
    splitInstance.destroy(true)
  }

  splitInstance = Split(splitConfig)
}

export default setGridLayout
