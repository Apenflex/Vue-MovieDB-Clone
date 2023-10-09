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
import Skeleton from 'primevue/skeleton';
import createI18N from './i18n'

const app = createApp(App)

// Global PROPERTIES
app.config.globalProperties.$applyLocale = path => {
  const defaultLocale = i18nGlobal.fallbackLocale

  let currentPath = path
  if (currentPath === '/') {
    currentPath = '';
  }

  let newPath = i18nGlobal.locale.value !== defaultLocale.value ?
    `/${i18nGlobal.locale.value}${currentPath}` : currentPath;
  console.log(newPath)
  if (newPath === '') {
    newPath = '/';
  }

  return newPath;
}

// I18n Translations
const metaEnv = import.meta.env ? import.meta.env : {};
const env = { ...metaEnv };
const i18n = createI18N(env);
const i18nGlobal = i18n.global;
console.log(i18nGlobal)
app.use(i18n);
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
  .component('PrimePaginator', Paginator)
  .component('PrimeSkeleton', Skeleton)

app.mount('#app')
