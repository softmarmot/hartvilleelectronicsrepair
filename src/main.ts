import './assets/main.css'

import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'

// createSSRApp hydrates the HTML prerendered at build time instead of re-creating it
const app = createSSRApp(App)

app.use(router)

router.isReady().then(() => app.mount('#app'))
