import './assets/main.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import EventBus from './util/eventBus'
import { theme } from './stores'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
// 表单校验指令
import directives from './directive/index'
const $bus=new EventBus()
const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

theme.getTheme()
app.use(directives)
app.mount('#app')

app.provide('$bus',$bus)

