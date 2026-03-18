import i18n, { defaultLocale, supportedLocales } from '../i18n/i18n.js'

export function isSupportedLocale(value) {
  return supportedLocales.includes(value)
}

export function getLocaleFromPathname(pathname) {
  const parts = (pathname || '/').split('/').filter(Boolean)
  const maybeLocale = parts[0]
  if (isSupportedLocale(maybeLocale)) return maybeLocale
  return defaultLocale
}

export function stripLocalePrefix(pathname) {
  const parts = (pathname || '/').split('/').filter(Boolean)
  if (parts.length === 0) return '/'
  if (isSupportedLocale(parts[0])) return '/' + parts.slice(1).join('/')
  return pathname || '/'
}

export function applyLocale(path, locale = i18n.language) {
  let currentPath = path
  if (currentPath === '/') currentPath = ''

  const targetLocale = locale || defaultLocale
  const withPrefix = targetLocale !== defaultLocale ? `/${targetLocale}${currentPath}` : currentPath
  return withPrefix === '' ? '/' : withPrefix
}

