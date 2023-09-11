import { defineStore } from 'pinia'
import securedAxios from '@/composables/useApi.js'

export const moviesStore = defineStore('moviesDB', {
  state: () => ({
    movies: [],
    randomPosterURL: '',
    trandingMovies: [],
    trailerMovies: [],
    trailerMovieUrl: { title: '', url: '' },
    popularMovies: [],
  }),
  getters: {
    getTrendingMovies: state => state.trandingMovies,
  },
  actions: {
    // async fetchMovies() { },
    async getRandomPoster() {
      securedAxios.get(`/movie/popular`)
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
    async fetchTrandingMovies(argDay) {
      securedAxios.get(`/trending/all/${argDay}`)
        .then((response) => {
          this.trandingMovies = response.data.results
          console.log(this.trandingMovies);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    async fetchPopularMovies(popular) {
      securedAxios.get(`/movie/${popular}`)
        .then((response) => {
          this.popularMovies = response.data.results
        })
        .catch((error) => {
          console.log(error);
        })
    },
    async fetchTrailerMovies(category) {
      securedAxios.get(`/movie/${category}`)
        .then((response) => {
          this.trailerMovies = response.data.results
          // console.log(this.trailerMovies);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    async setTrailerMovieUrl(movieId) {
      securedAxios.get(`/movie/${movieId}/videos`)
        .then((response) => {
          this.trailerMovieUrl.title = this.trailerMovies.find((movie) => movie.id === movieId).original_title;
          this.trailerMovieUrl.url = response.data.results[0].key
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
})
