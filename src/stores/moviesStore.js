import { defineStore } from 'pinia'
import axios from 'axios'

export const moviesStore = defineStore('moviesDB', {
  state: () => ({
    movies: [],
    // trandingMoviesNow: [],
    // trandingMoviesWeek: [],
    trandingMovies: [],
    randomPosterURL: '',
  }),
  getters: {
    getTrendingMovies: state => state.trandingMovies,
  },
  actions: {
    async fetchMovies() { },
    async fetchTrandingMovies(argDay) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/trending/all/${argDay}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_MOVIE_API_KEY}`
        }
      })
        .then((response) => {
          this.trandingMovies = response.data.results
        })
        .catch((error) => {
          console.log(error);
        })
      // const response = await fetch(`https://api.themoviedb.org/3/trending/all/${argDay}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${import.meta.env.VITE_API_MOVIE_API_KEY}`
      //   }

      // })
      // const data = await response.json()
      // // console.log(data.results)
      // this.trandingMovies = data.results
    },
    async getRandomPoster() {
      axios.get(`${import.meta.env.VITE_API_MOVIE_BASE_URL}/movie/popular`, {
        params: {
          api_key: import.meta.env.VITE_API_MOVIE_API_KEY,
        }
      })
        .then((response) => {
          const randomPosters = response.data.results.map((item) => `https://image.tmdb.org/t/p/w500${item.backdrop_path}`);
          const randomIndex = Math.floor(Math.random() * randomPosters.length);
          const randomPosterUrl = randomPosters[randomIndex];
          this.randomPosterURL = randomPosterUrl;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },

})
