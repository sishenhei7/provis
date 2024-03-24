import { createApp } from 'vue'
import 'reset.css'
import naive from './naive'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .use(naive)
  .mount('#app')
