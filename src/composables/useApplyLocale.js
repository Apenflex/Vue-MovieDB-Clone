import { i18nGlobal } from "@/main";

export const applyLocale = (path, { query = {}, params = {} } = {}) => {
  const defaultLocale = i18nGlobal.fallbackLocale;

  let currentPath = path;
  if (currentPath === '/') {
    currentPath = '';
  }

  let newPath = i18nGlobal.locale.value !== defaultLocale.value ?
    `/${i18nGlobal.locale.value}${currentPath}` : currentPath;
  if (newPath === '') {
    newPath = '/';
  }

  return { path: newPath, query, params };
};
