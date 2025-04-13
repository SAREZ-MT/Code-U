import { decode } from 'js-base64'

class EventBus extends window.EventTarget {
  on (type, listener) {
    this.addEventListener(type, listener)
  }

  off (type, listener) {
    this.removeEventListener(type, listener)
  }

  emit (type, detail) {
    const event = new window.CustomEvent(type, { detail, cancelable: true })

    this.dispatchEvent(event)
  }
}

export const eventBus = new EventBus()

let jsEditor
let htmlEditor
let cssEditor

export const initializeEventsController = ({
  jsEditor: _jsEditor,
  htmlEditor: _htmlEditor,
  cssEditor: _cssEditor
}) => {
  jsEditor = _jsEditor
  htmlEditor = _htmlEditor
  cssEditor = _cssEditor
}

export const EVENTS = {
  DRAG_FILE: 'DRAG_FILE'
}

eventBus.on(EVENTS.DRAG_FILE, ({ detail: { content, typeFile } }) => {
  const file = typeFile

  switch (file) {
    case 'text/javascript': jsEditor.setValue(content); break
    case 'text/css': cssEditor.setValue(content); break
    case 'text/html': htmlEditor.setValue(content); break
    default: break
  }
})
