const initialState = {
  layout: 'default',
  theme: 'dark',
  language: 'es',
  fontSize: 14,
  lineNumbers: 'on',
  minimap: false,
  wordWrap: 'on',
  fontLigatures: true,
  fontFamily: 'Consolas, "Courier New", monospace',
  lineHeight: 28,
  tabSize: 2,
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  saveLocalstorage: true,
  maxExecutionTime: 1000,
  padding: {
    top: 20,
    bottom: 20
  }
}

let state = { ...initialState }
const subscribers = []

export const getState = () => state

export const setState = (newState) => {
  newState = { 
    ...newState, 
    lineNumbers: 'on',
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    wordWrap: 'on'
  }
  
  state = { ...state, ...newState }
  subscribers.forEach(subscriber => subscriber(state))
  
  // Guardar en localStorage
  localStorage.setItem('appInitialState', JSON.stringify({ state }))
}

export const subscribe = (subscriber) => {
  subscribers.push(subscriber)
  return () => {
    const index = subscribers.indexOf(subscriber)
    subscribers.splice(index, 1)
  }
}

// Inicializar el estado desde localStorage si existe
try {
  const savedState = localStorage.getItem('appInitialState')
  if (savedState) {
    const { state: loadedState } = JSON.parse(savedState)
    if (loadedState) {
      state = { 
        ...state, 
        ...loadedState, 
        lineNumbers: 'on',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        wordWrap: 'on'
      }
    }
  }
} catch (error) {
  console.error('Error loading state:', error)
}
