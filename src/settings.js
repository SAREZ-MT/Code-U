import { getState, setState } from './state.js'
import { $, $$ } from './utils/dom.js'

const ELEMENT_TYPES = {
  INPUT: 'input',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio'
}

/**
 * @type {HTMLFormElement}
 */
const $settingsForm = $('#settings')

// Obtener la configuración actual
const settings = getState()

$settingsForm.addEventListener('submit', e => e.preventDefault())
$settingsForm.addEventListener('input', updateSettingValue)
$settingsForm.addEventListener('change', updateSettingValue)

// Inicializar controles de formulario con los valores actuales
function initializeFormControls() {
  Array.from($settingsForm.elements).forEach((el) => {
    const { name: settingKey, type, value } = el
  
    if (!settingKey) return
  
    let settingValue = settings[settingKey]

    if (type === ELEMENT_TYPES.CHECKBOX) {
      el.checked = settingValue
    } else if (type === ELEMENT_TYPES.RADIO) {
      // Manejo especial para los radio buttons de layout
      if (settingKey === 'layout') {
        el.checked = (value === settingValue)
      } else {
        el.checked = (value === settingValue)
      }
    } else {
      el.value = settingValue
    }
  })
}

// Inicializar controles
initializeFormControls()

// Actualizar configuración cuando cambia un valor
function updateSettingValue({ target }) {
  const { value, checked, name: settingKey, type } = target

  const isCheckbox = type === ELEMENT_TYPES.CHECKBOX
  const isRadio = type === ELEMENT_TYPES.RADIO

  if (isRadio && !checked) return
  
  const settingValue = isCheckbox ? checked : value
  
  // Actualizar el estado
  setState({ [settingKey]: settingValue })
}
