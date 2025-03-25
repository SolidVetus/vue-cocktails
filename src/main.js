import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PiniaColada, {})
app.use(router)
app.use(ElementPlus)

app.mount('#app')
