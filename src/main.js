import './assets/sass/app.scss'

import App from './App.vue'
import { createApp } from 'vue'

import { createPinia } from 'pinia'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import VueMultiselect from 'vue-multiselect'

const app = createApp(App)
// Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// Router
app.use(router)
// Axios
app.use(VueAxios, axios)
// PrimeVue
app.use(PrimeVue);
app.component('Dropdown', Dropdown);

// Vue Multiselect
app.component('VueMultiselect', VueMultiselect)

app.mount('#app')
