import { createRouter, createWebHistory } from 'vue-router'

// Test
// const initialRoutes = [
//   {
//     path: '/',
//     name: 'home',
//     // component: HomePage
//     component: () => import('@/pages/HomePage.vue'),
//   },
//   {
//     path: '/search',
//     name: 'search',
//     // component: SearchPage
//     component: () => import('@/pages/SearchPage.vue'),
//   },
//   {
//     path: '/favourite',
//     name: 'favourite',
//     // component: FavouritePage
//     component: () => import('@/pages/FavouritePage.vue'),
//   },
//   {
//     path: '/movies',
//     name: 'movies',
//     // component: MoviesPage
//     component: () => import('@/pages/MoviesPage.vue'),
//   },
//   {
//     path: '/tv-shows',
//     name: 'tv-shows',
//     // component: TvShowsPage
//     component: () => import('@/pages/TvShowsPage.vue'),
//   },
//   {
//     path: '/:mediaType/:id',
//     name: 'media-details',
//     // component: FilmsDescPage,
//     component: () => import('@/pages/FilmsDescPage.vue'),
//     props: true
//   },
//   {
//     path: '/persons',
//     name: 'persons',
//     // component: PersonsPage
//     component: () => import('@/pages/PersonsPage.vue'),
//   },
//   {
//     path: '/persons/:alias',
//     name: 'person-details',
//     // component: PersonDescPage,
//     component: () => import('@/pages/PersonDescPage.vue'),
//     props: true
//   },
// ]

// export default i18n => {
//   const i18nGlobal = i18n.global;
//   const defaultLocale = i18nGlobal.fallbackLocale;
//   const supportedLocales = i18nGlobal.availableLocales;

//   const createRoute = (supportedLocales, targetLocale, initialRoute) => {
//     const route = Object.assign({}, initialRoute);

//     if (defaultLocale.value !== targetLocale) {
//       route.name = `${route.name}-${targetLocale}`;
//       route.path = `/${targetLocale}/${route.path}`;
//     } else {
//       route.path = `/${route.path}`;
//     }

//     if (route.children) {
//       const childrenRoutes = [];

//       supportedLocales.forEach(supportedLocale => {
//         route.children.forEach(initialChildRoute => childrenRoutes.push(
//           createRoute(supportedLocales, supportedLocale, initialChildRoute)))
//       });

//       route.children = childrenRoutes;
//     }

//     return route;
//   };

//   const routes = [];

//   supportedLocales.forEach(supportedLocale => {
//     initialRoutes.forEach(initialRoute => routes.push(
//       createRoute(supportedLocales, supportedLocale, initialRoute)))
//   });

//   // All other supported locales
//   supportedLocales.forEach(supportedLocale => {
//     if (defaultLocale !== supportedLocale) {
//       routes.push(createRoute(supportedLocales, supportedLocale))
//     }
//   });

//   // Default locale always last one
//   routes.push(createRoute(supportedLocales, defaultLocale));

//   return createRouter({
//     history: createWebHistory(),
//     routes,
//     scrollBehavior(to, from, savedPosition) {
//       if (savedPosition) {
//         return savedPosition;
//       }
//       if (to.hash) {
//         return { el: to.hash, behavior: "smooth" };
//       } else {
//         window.scrollTo({
//           top: 0,
//           left: 0,
//           behavior: 'instant'
//         });
//       }
//     }
//   });
// };
// --------------------------------------------


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomePage
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/search',
      name: 'search',
      // component: SearchPage
      component: () => import('@/pages/SearchPage.vue'),
    },
    {
      path: '/favourite',
      name: 'favourite',
      // component: FavouritePage
      component: () => import('@/pages/FavouritePage.vue'),
    },
    {
      path: '/movies',
      name: 'movies',
      // component: MoviesPage
      component: () => import('@/pages/MoviesPage.vue'),
    },
    {
      path: '/tv-shows',
      name: 'tv-shows',
      // component: TvShowsPage
      component: () => import('@/pages/TvShowsPage.vue'),
    },
    {
      path: '/:mediaType/:id',
      name: 'media-details',
      // component: FilmsDescPage,
      component: () => import('@/pages/FilmsDescPage.vue'),
      props: true
    },
    {
      path: '/persons',
      name: 'persons',
      // component: PersonsPage
      component: () => import('@/pages/PersonsPage.vue'),
    },
    {
      path: '/persons/:alias',
      name: 'person-details',
      // component: PersonDescPage,
      component: () => import('@/pages/PersonDescPage.vue'),
      props: true
    },
  ]
})
export default router
