import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import toast_plugin from './utils/toast_plugin'
import toast_mixin from './mixin/toast'
import store from './store'
import axios from 'axios'



const app = createApp(App)

axios.defaults.baseURL = "http://localhost:8000/"

app.use(router)
app.mixin(toast_mixin)
app.use(toast_plugin)
app.use(store)
app.mount('#app')