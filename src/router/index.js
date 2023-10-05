import { createRouter, createWebHistory } from 'vue-router'

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
