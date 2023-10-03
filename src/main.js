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
import Toast from "vue-toastification";
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';


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
// Toast Notification
app.use(Toast, {
  position: "top-center",
  timeout: 2800,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: false,
  rtl: false,
})
// PrimeVue
app.use(PrimeVue)
app.component('PrimePaginator', Paginator)

app.mount('#app')
