import { createRouter, createWebHistory } from 'vue-router'

// const progressOptions = {
//   func: [
//     { call: 'color', modifier: 'temp', argument: '#00d2ff' },
//     { call: 'fail', modifier: 'temp', argument: '#6e0000' },
//     { call: 'location', modifier: 'temp', argument: 'top' },
//     { call: 'transition', modifier: 'temp', argument: { speed: '1.5s', opacity: '0.6s', termination: 400 } },
//   ],
// }

const initialRoutes = [
  {
    path: '',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    props: true,
    // meta: {
      // progress: progressOptions
    // }
  },
  {
    path: 'search',
    name: 'search',
    component: () => import('@/pages/SearchPage.vue'),
    props: true,
    // meta: {
      // progress: progressOptions
    // }
  },
  {
    path: 'favourite',
    name: 'favourite',
    component: () => import('@/pages/FavouritePage.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      // progress: progressOptions
    }
  },
  {
    path: 'movies',
    name: 'movies',
    component: () => import('@/pages/MoviesPage.vue'),
    props: true,
    // meta: {
      // progress: progressOptions
    // }
  },
  {
    path: 'tv',
    name: 'tv',
    component: () => import('@/pages/TvShowsPage.vue'),
    props: true,
    // meta: {
    //   progress: progressOptions
    // }
  },
  {
    path: ':mediaType/:id',
    name: 'media-details',
    component: () => import('@/pages/FilmsDescPage.vue'),
    props: true,
    // meta: {
    //   progress: progressOptions
    // }
  },
  {
    path: 'persons',
    name: 'persons',
    component: () => import('@/pages/PersonsPage.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      // progress: progressOptions
    }
  },
  {
    path: 'persons/:params',
    name: 'person-details',
    component: () => import('@/pages/PersonDescPage.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      // progress: progressOptions
    }
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