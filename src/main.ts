import { createApp } from 'vue'
import App from '@/App.vue'
import { setupStore } from '@/stores'
import { setupRouter } from '@/router'
import PrimeVue from 'primevue/config'
import '@/assets/style.css'
import '@/assets/tailwind.css'
import '@/permission'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

const setupAll = async () => {
  const app = createApp(App)
  setupRouter(app)
  app.use(PrimeVue, {
    theme: 'none',
    ripple: true
  })
  app.use(ToastService)
  app.use(ConfirmationService)
  setupStore(app)
  app.mount('#app')
}

setupAll()
