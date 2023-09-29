import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import FavouritePage from '@/pages/FavouritePage.vue'
import MoviesPage from '@/pages/MoviesPage.vue'
import TvShowsPage from '@/pages/TvShowsPage.vue'
import PersonsPage from '@/pages/PersonsPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import FilmsDescPage from '@/pages/FilmsDescPage.vue'
// import PersonDescPage from '@/pages/PersonDescPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: FavouritePage
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesPage
    },
    {
      path: '/tv-shows',
      name: 'tv-shows',
      component: TvShowsPage
    },
    {
      path: '/:mediaType/:id',
      name: 'media-details',
      component: FilmsDescPage,
      props: true
    },
    {
      path: '/persons',
      name: 'persons',
      component: PersonsPage
    },
    {
      path: '/persons/:alias',
      name: 'person-details',
      // component: PersonDescPage,
      component: () => import('@/pages/PersonDescPage.vue'),
    },
  ]
})
export default router
