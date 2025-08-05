import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlusX from 'vue-element-plus-x'


// createApp(App).mount('#app')
Office.onReady(() => {
    const app = createApp(App)
    app.use(ElementPlusX)
    app.mount("#app")
})
