import { createI18n } from 'vue-i18n'

export default env => {
  const messages = Object.fromEntries(
    Object.entries(import.meta.globEager('./locales/*.json'))
      .map(([key, value]) => {
        return [key.slice(10, -5), value.default]
      })
  )

  const defaultLocale = env?.VITE_DEFAULT_LOCALE ?? 'ua';
  return createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    globalInjection: true,
    messages
  });
};
