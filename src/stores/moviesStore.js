import { defineStore } from 'pinia'

export const moviesStore = defineStore('moviesDB', {
  state: () => ({
    movies: [],
    // trandingMoviesNow: [],
    // trandingMoviesWeek: [],
    trandingMovies: [],
  }),
  actions: {
    async fetchMovies() { },
    async fetchTrandingMovies(argDay) {
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/${argDay}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_MOVIE_API_KEY}`
        }
        
      })
      const data = await response.json()
      this.trandingMovies = data.results
    },
  },
  
})
