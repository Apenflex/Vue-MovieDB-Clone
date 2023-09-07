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
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjUyOGIzNjZhOTU4NDdiNzZhZjYwZjgyNGQxYmQ4MiIsInN1YiI6IjY0MmQyMDEzNTRhOGFjMGIzNDg0NmQyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K33PWQfw-4n_PsH2UlpJpOgbJofd_9OLmvHi6yLqYEg`
        }
      })
      const data = await response.json()
      this.trandingMovies = data.results
    },
  },
  
})
