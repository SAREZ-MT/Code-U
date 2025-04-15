import { eventBus, EVENTS } from './events-controller.js'
import { $, $$ } from './utils/dom.js'
import { BUTTON_ACTIONS } from './constants/button-actions.js'

const $aside = $('aside')
const $asideBar = $('.aside-bar')
const $buttons = $$('button', $aside)
const $editorAsideButton = $('#editor-aside-button')

const toggleAsideBar = (isHidden) => {
  $asideBar.toggleAttribute('hidden', isHidden)
}

const SIMPLE_CLICK_ACTIONS = {
  [BUTTON_ACTIONS.backToDashboard]: () => {
    // Redirigir al dashboard
    if (window.location.pathname.includes('/editor/')) {
      // Si estamos usando Vue Router
      if (window.__vue_app__ && window.__vue_app__.$router) {
        window.__vue_app__.$router.push('/dashboard');
      } else {
        // Redirección directa
        window.location.href = '/dashboard';
      }
    }
  }
}

const NON_SIMPLE_CLICK_ACTIONS = {
  [BUTTON_ACTIONS.closeAsideBar]: () => {
    toggleAsideBar(true)
    $('.scroll-buttons-container')?.removeAttribute('hidden')
  },

  [BUTTON_ACTIONS.showSettingsBar]: () => {
    showAsideBar('#settings')
    $('.scroll-buttons-container')?.setAttribute('hidden', '')
  }
}

const showAsideBar = (selector) => {
  $asideBar.removeAttribute('hidden')
  $$('.bar-content').forEach(el => el.setAttribute('hidden', ''))
  $(selector).removeAttribute('hidden')
}

const ACTIONS = {
  ...SIMPLE_CLICK_ACTIONS,
  ...NON_SIMPLE_CLICK_ACTIONS
}

$buttons.forEach(button => {
  button.addEventListener('click', ({ currentTarget }) => {
    let action = button.getAttribute('data-action')
    const isSimpleClickAction = button.getAttribute('data-is-simple-click-action') === 'true'

    if (isSimpleClickAction) return ACTIONS[action]?.()

    const alreadyActive = currentTarget.classList.contains('is-active')
    $('.is-active')?.classList.remove('is-active')

    const buttonToActive = alreadyActive ? $editorAsideButton : currentTarget
    buttonToActive.classList.add('is-active')

    action = alreadyActive
      ? 'close-aside-bar'
      : action

    ACTIONS[action]?.()
  })
})

// Añadir dinámicamente el botón de volver al dashboard si estamos en la página del editor
const addBackToDashboardButton = () => {
  if (window.location.pathname.includes('/editor/') || document.body.classList.contains('editor-mode')) {
    // Verificar si el botón ya existe
    if (!$('#back-to-dashboard-button')) {
      const footerElement = $('aside .aside-sections footer');
      
      if (footerElement) {
        // Crear el botón
        const backButton = document.createElement('button');
        backButton.id = 'back-to-dashboard-button';
        backButton.className = 'bar-button';
        backButton.setAttribute('aria-label', 'Volver al Dashboard');
        backButton.setAttribute('data-action', 'back-to-dashboard');
        backButton.setAttribute('data-is-simple-click-action', 'true');
        
        // Crear el contenido del botón
        backButton.innerHTML = `
          <span role="tooltip" class="button-title">Volver</span>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M10.78 19.03a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 1 1 1.06 1.06L5.81 11.5h12.44a.75.75 0 0 1 0 1.5H5.81l4.97 4.97a.75.75 0 0 1 0 1.06z" fill="currentColor"/>
          </svg>
        `;
        
        // Añadir al inicio del footer
        footerElement.insertBefore(backButton, footerElement.firstChild);
      }
    }
  }
};

// Ejecutar la función para añadir el botón cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addBackToDashboardButton);
} else {
  addBackToDashboardButton();
}

// También escuchar cambios en la URL para añadir el botón cuando sea necesario
window.addEventListener('popstate', addBackToDashboardButton);
