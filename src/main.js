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
import { toastOptions } from './helpers/configs/toast'
import PrimeVue from 'primevue/config';
import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';
import createI18N from './i18n'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './helpers/configs/firebase'
import VueProgressBar from '@aacassandra/vue3-progressbar'
import { progressBarOptions } from './helpers/configs/progressbar'

//Firebase
// Initialize Firebase
initializeApp(firebaseConfig);
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
  .use(Toast, toastOptions)
  .use(PrimeVue)
  .use(VueProgressBar, progressBarOptions)
  .component('PrimePaginator', Paginator)
  .component('PrimeSkeleton', Skeleton)
  .component('VueMultiselect', VueMultiselect)
  .mount('#app')

export default i18n
