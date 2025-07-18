// Import Vue
import { createApp } from 'vue'

// Import Framework7
import Framework7 from 'framework7/lite-bundle'

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle'

// Import Framework7 Styles
import 'framework7/css/bundle'

// Import Icons and App Custom Styles
import '../css/app.css'
import '../css/icons.css'

// Import App Component
import App from '../components/app.vue'

import router from './routes.js'

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue)

// Init App
const app = createApp(App)

// Register Framework7 Vue components
registerComponents(app)

// Use the router
app.use(router)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(registration => {
      console.log('[Service Worker] Registrado com sucesso:', registration)
    })
    .catch(error => {
      console.error('[Service Worker] Erro no registro:', error)
    })
}

// Mount the app
app.mount('#app')
