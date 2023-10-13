import { createRouter, createWebHistory } from 'vue-router'

const initialRoutes = [
  {
    path: '',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    props: true
  },
  {
    path: 'search',
    name: 'search',
    component: () => import('@/pages/SearchPage.vue'),
    props: true
  },
  {
    path: 'favourite',
    name: 'favourite',
    component: () => import('@/pages/FavouritePage.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'movies',
    name: 'movies',
    component: () => import('@/pages/MoviesPage.vue'),
    props: true
  },
  {
    path: 'tv',
    name: 'tv',
    component: () => import('@/pages/TvShowsPage.vue'),
    props: true
  },
  {
    path: ':mediaType/:id',
    name: 'media-details',
    component: () => import('@/pages/FilmsDescPage.vue'),
    props: true
  },
  {
    path: 'persons',
    name: 'persons',
    component: () => import('@/pages/PersonsPage.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'persons/:params',
    name: 'person-details',
    component: () => import('@/pages/PersonDescPage.vue'),
    props: true
  }
]

export default i18n => {
  const i18nGlobal = i18n.global;
  const defaultLocale = i18nGlobal.fallbackLocale.value;
  const supportedLocales = i18nGlobal.availableLocales;

  const createRoute = (supportedLocales, targetLocale, initialRoute) => {
    const route = Object.assign({}, initialRoute);

    if (defaultLocale !== targetLocale) {
      route.name = `${route.name}-${targetLocale}`;
      route.path = `/${targetLocale}/${route.path}`;
    } else {
      route.path = `/${route.path}`;
    }

    if (route.children) {
      const childrenRoutes = [];

      supportedLocales.forEach(supportedLocale => {
        route.children.forEach(initialChildRoute => childrenRoutes.push(
          createRoute(supportedLocales, supportedLocale, initialChildRoute)))
      });

      route.children = childrenRoutes;
    }

    return route;
  };

  const routes = [];

  supportedLocales.forEach(supportedLocale => {
    initialRoutes.forEach(initialRoute => routes.push(
      createRoute(supportedLocales, supportedLocale, initialRoute)))
  });

  // All other supported locales
  supportedLocales.forEach(supportedLocale => {
    if (defaultLocale !== supportedLocale) {
      routes.push(createRoute(supportedLocales, supportedLocale))
    }
  });

  // Default locale always last one
  routes.push(createRoute(supportedLocales, defaultLocale));
  // console.log(routes, 'routes')

  return createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { el: to.hash, behavior: "smooth" };
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }
    },
  });
};