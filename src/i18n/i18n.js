import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ua from './locales/ua.json'

const DEFAULT_LOCALE = import.meta.env?.VITE_DEFAULT_LOCALE ?? 'ua'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ua: { translation: ua },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
})

export const defaultLocale = DEFAULT_LOCALE
export const supportedLocales = ['ua', 'en']
export default i18n

