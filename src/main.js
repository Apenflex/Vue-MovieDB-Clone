import './assets/sass/app.scss'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMultiselect from 'vue-multiselect'

const app = createApp(App)
// Pinia
const pinia = createPinia().use(piniaPluginPersistedstate)
app.use(pinia)
// Router
app.use(router)
app.use(RouterLink)
// Axios
app.use(VueAxios, axios)
// Vue Multiselect
app.component('VueMultiselect', VueMultiselect)

app.mount('#app')
