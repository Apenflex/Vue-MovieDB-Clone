import './assets/sass/app.scss'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import createRouter from './router'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMultiselect from 'vue-multiselect'
import Toast from "vue-toastification";
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import createI18N from './i18n'

const app = createApp(App);

// I18n Translations
const metaEnv = import.meta.env ? import.meta.env : {};
const env = { ...metaEnv };
const i18n = createI18N(env);
export const i18nGlobal = i18n.global;

// Router
const router = createRouter(i18n);

// Pinia
const pinia = createPinia().use(piniaPluginPersistedstate)

app.use(VueAxios, axios)
  .use(pinia)
  .use(router)
  .use(RouterLink)
  .use(i18n)
  .use(Toast, {
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
  .use(PrimeVue)
  .component('PrimePaginator', Paginator)
  .component('PrimeSkeleton', Skeleton)
  .component('VueMultiselect', VueMultiselect)
  .mount('#app')

export default i18n
