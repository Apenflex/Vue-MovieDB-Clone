import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import FavouritePage from '@/pages/FavouritePage.vue'
import MoviesPage from '@/pages/MoviesPage.vue'
import TvShowsPage from '@/pages/TvShowsPage.vue'
import PersonsPage from '@/pages/PersonsPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import DetailsPage from '@/pages/DetailsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
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
      path: '/persons',
      name: 'persons',
      component: PersonsPage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/:mediaType/:id',
      name: 'item-details',
      component: DetailsPage,
      props: true
    },
  ]
})
export default router
