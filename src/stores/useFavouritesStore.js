import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favouritesDB', {
  state: () => ({
    favouriteMovies: [],
  }),
  getters: {
    getFavouriteMovies: (state) => state.favouriteMovies,
  },
  actions: {
    addFavouriteMovie(movie) {
      this.favouriteMovies.push(movie);
      // console.log(this.favouriteMovies);
    },
    removeFavouriteMovie(movie) {
      this.favouriteMovies = this.favouriteMovies.filter((item) => item.id !== movie.id);
    },
  },
  persist: {
    enabled: true,
  },
},)