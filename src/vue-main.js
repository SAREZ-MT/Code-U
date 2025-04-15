import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Crear la aplicación Vue
const app = createApp(App)

// Usar el router
app.use(router)

// Montar la aplicación
app.mount('#vue-app') 