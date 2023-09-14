import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/HomeView.vue'
import FavouriteView from '@/pages/FavouriteView.vue'
import MoviesView from '@/pages/MoviesView.vue'
import TvShowsView from '@/pages/TvShowsView.vue'
import PersonsView from '@/pages/PersonsView.vue'
import SearchView from '@/pages/SearchView.vue'
import DetailsView from '@/pages/DetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: FavouriteView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/tv-shows',
      name: 'tv-shows',
      component: TvShowsView
    },
    {
      path: '/persons',
      name: 'persons',
      component: PersonsView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/:mediaType/:id',
      name: 'item-details',
      component: DetailsView,
      props: true
    },
  ]
})
export default router
