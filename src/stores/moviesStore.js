import { defineStore } from 'pinia'
import securedAxios from '@/composables/useApi.js'

export const moviesStore = defineStore('moviesDB', {
  state: () => ({
    movies: [],
    moviesSortBy: '',
    tvShows: [],
    randomPosterURL: '',
    favouriteMovies: [],
    trandingMovies: [],
    popularMovies: [],
    trailerMovies: [],
    trailerMovieUrl: { title: '', url: '' },
    persons: [],
    searchMovies: [],
    searchQuery: { query: '', page: 1 },
  }),
  getters: {
    getMovies: state => state.movies,
  },
  actions: {
    async fetchMovies() {
      try {
        const response = await securedAxios.get(`/movie/popular`);
        this.movies = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMoviesMore(page) {
      try {
        const response = await securedAxios.get(`/movie/popular?page=${page}`);
        this.movies.push(...response.data.results);
        await this.MoviesSortBy();
      } catch (error) {
        console.error(error);
      }
    },
    async MoviesSortBy() {
      switch (this.moviesSortBy) {
        case 'popularAsc':
          this.movies.sort((a, b) => a.popularity - b.popularity);
          break;
        case 'voteDesc':
          this.movies.sort((a, b) => b.vote_average - a.vote_average);
          break;
        case 'voteAsc':
          this.movies.sort((a, b) => a.vote_average - b.vote_average);
          break;
        case 'releaseDesc':
          this.movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          break;
        case 'releaseAsc':
          this.movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
          break;
        case 'titleAsc':
          this.movies.sort((a, b) => a.original_title.localeCompare(b.original_title));
          break;
        default:
          break;
      }
    },
    async fetchPersons(page) {
      try {
        const response = await securedAxios.get(`/person/popular?&page=${page}`);
        this.persons = response.data.results;
        // console.log(this.persons);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSearch({ query, page }) {
      try {
        const response = await securedAxios.get(`/search/multi?query=${query}&page=${page}`);
        this.searchMovies = response.data.results;
        this.searchQuery.query = query;
        // console.log(this.searchQuery.query)
      } catch (error) {
        console.error(error);
      }
    },
    async addFavouriteMovie(movie) {
      if (this.favouriteMovies.map((item) => item.id).includes(movie.id)) {
        return;
      }
      this.favouriteMovies.push(movie);
      localStorage.setItem('favouriteMovies', JSON.stringify(this.favouriteMovies));
    },
    async getRandomPoster() {
      securedAxios.get(`/movie/popular`)
        .then((response) => {
          const randomPosters = response.data.results.map((item) => `https://image.tmdb.org/t/p/original${item.backdrop_path}`);
          const randomIndex = Math.floor(Math.random() * randomPosters.length);
          const randomPosterUrl = randomPosters[randomIndex];
          this.randomPosterURL = randomPosterUrl;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    async fetchTrandingMovies(argDay) {
      try {
        const response = await securedAxios.get(`/trending/all/${argDay}`);
        this.trandingMovies = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPopularMovies(popular) {
      try {
        const response = await securedAxios.get(`/movie/${popular}`);
        this.popularMovies = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTrailerMovies(category) {
      try {
        const response = await securedAxios.get(`/movie/${category}`);
        this.trailerMovies = response.data.results;
        // console.log(this.trailerMovies[0].backdrop_path);
      } catch (error) {
        console.error(error);
      }
    },
    async setTrailerMovieUrl(movieId) {
      try {
        const response = await securedAxios.get(`/movie/${movieId}/videos`);
        this.trailerMovieUrl.title = this.trailerMovies.find((movie) => movie.id === movieId).original_title;
        this.trailerMovieUrl.url = response.data.results[0].key;
      } catch (error) {
        console.error(error);
      }
    },
  },
})
