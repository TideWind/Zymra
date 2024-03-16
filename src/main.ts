import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import ColorThief from 'colorthief/dist/color-thief.mjs'
import api from './api/api.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.provide('$axios',axios)
app.mount('#app')
app.config.globalProperties.$api = api