import { defineStore } from 'pinia'
import securedAxios from '@/composables/useApi.js'

export const moviesStore = defineStore('moviesDB', {
  state: () => ({
    movies: [],
    tvShows: [],
    persons: {
      data: [],
      totalPages: 0,
      totalResults: 0,
    },
    person: {
      bio: [],
      externalIds: [],
      movies: {
        cast: [],
        crew: [],
      },
    },
    mediaDetails: {
      data: [],
      persons: [],
    },
    randomPosterURL: '',
    trandingMovies: [],
    popularMovies: [],
    trailerMovies: {
      data: [],
      url: { title: '', path: '' }
    },
    searchMovies: {
      data: [],
      totalPages: 0,
    },
    isLoading: false,
  }),
  getters: {
    // Movies
    getMovies: state => state.movies,
    // TV Shows
    getTvShows: state => state.tvShows,
    // Persons
    getPersons: state => state.persons.data,
    // Person Details
    getPerson: state => state.person,
    getPersonCast: state => state.person.movies.cast,
    // Режисер
    getPersonCamera: state => state.person.movies.crew.filter((item) => item.department === 'Camera'),
    getPersonCrew: state => state.person.movies.crew.filter((item) => item.department === 'Crew'),
    getPersonDirector: state => state.person.movies.crew.filter((item) => item.department === 'Directing'),
    getPersonEditing: state => state.person.movies.crew.filter((item) => item.department === 'Editing'),
    getPersonProducer: state => state.person.movies.crew.filter((item) => item.department === 'Production'),
    getPersonWriter: state => state.person.movies.crew.filter((item) => item.department === 'Writing'),
  },
  actions: {
    async fetchMovies() {
      try {
        const response = await securedAxios.get(`/movie/popular`);
        this.movies = this.addMediaType(response.data.results, 'movie');
        // console.log(this.movies.map((item) => item.media_type));
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMoviesMore({ page, sortBy }) {
      try {
        const response = await securedAxios.get(`/movie/popular?page=${page}`);
        const newMoviesWithMediaType = this.addMediaType(response.data.results, 'movie');
        this.movies.push(...newMoviesWithMediaType);
        // console.log(this.movies.map((item) => item.media_type))
        await this.MoviesSortBy(sortBy);
      } catch (error) {
        console.error(error);
      }
    },
    async MoviesSortBy(sortBy) {
      switch (sortBy) {
        case 'popularDesc':
          this.movies.sort((a, b) => b.popularity - a.popularity);
          break;
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
    async fetchMediaDetails({ mediaType, id }) {
      try {
        const response = await securedAxios.get(`/${mediaType}/${id}`);
        const getTrailer = await securedAxios.get(`/${mediaType}/${id}/videos`);
        this.mediaDetails.data = { ...response.data, media_type: mediaType, trailer: getTrailer.data.results[0]?.key || 'OOkJ54oqt5Q' };
        // console.log(this.mediaDetails.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTvShows() {
      try {
        const response = await securedAxios.get(`/tv/popular`);
        this.tvShows = this.addMediaType(response.data.results, 'tv');
        // console.log(this.tvShows.map((item) => item.media_type));
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTvShowsMore({ page, sortBy }) {
      try {
        const response = await securedAxios.get(`/tv/popular?page=${page}`);
        const newTvShowsWithMediaType = this.addMediaType(response.data.results, 'tv');
        this.tvShows.push(...newTvShowsWithMediaType);
        // console.log(this.tvShows.map((item) => item.media_type))
        await this.TvShowsSortBy(sortBy);
      } catch (error) {
        console.error(error);
      }
    },
    async TvShowsSortBy(sortBy) {
      switch (sortBy) {
        case 'popularDesc':
          this.tvShows.sort((a, b) => b.popularity - a.popularity);
          break;
        case 'popularAsc':
          this.tvShows.sort((a, b) => a.popularity - b.popularity);
          break;
        case 'voteDesc':
          this.tvShows.sort((a, b) => b.vote_average - a.vote_average);
          break;
        case 'voteAsc':
          this.tvShows.sort((a, b) => a.vote_average - b.vote_average);
          break;
        case 'releaseDesc':
          this.tvShows.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));
          break;
        case 'releaseAsc':
          this.tvShows.sort((a, b) => new Date(a.first_air_date) - new Date(b.first_air_date));
          break;
        case 'titleAsc':
          this.tvShows.sort((a, b) => a.original_name.localeCompare(b.original_name));
          break;
        default:
          break;
      }
    },
    async fetchPersons(page) {
      try {
        const response = await securedAxios.get(`/person/popular?&page=${page}`);
        // console.log(response.data);
        this.persons.data = response.data.results;
        // console.log(this.persons.data);
        this.persons.totalPages = response.data.total_pages;
        this.persons.totalResults = response.data.total_results;
        // console.log(this.persons.totalResults);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPerson(id) {
      this.person = {
        bio: [],
        externalIds: [],
        movies: {
          cast: [],
          crew: [],
        },
      }
      try {
        this.isLoading = true;
        const responseBio = await securedAxios.get(`/person/${id}`);
        const responseMovies = await securedAxios.get(`/person/${id}/movie_credits`);
        const responseTvShows = await securedAxios.get(`/person/${id}/tv_credits`);
        const getPersonExternalIds = await securedAxios.get(`/person/${id}/external_ids`);
        this.person.bio = responseBio.data;
        // console.log(this.person.bio);
        this.person.movies.cast = this.sortByReleaseDate([...responseMovies.data.cast, ...responseTvShows.data.cast]);
        this.person.movies.crew = this.sortByReleaseDate(responseMovies.data.crew);
        this.person.externalIds = getPersonExternalIds.data;
        // console.log(this.person.movies.cast);
        // console.log(this.person.movies.cast);
        // console.log(this.person.movies.cast.map((item) => item.release_date || item.first_air_date));
        this.isLoading = false;
      } catch (error) { console.error(error); }
    },
    async fetchSearch({ query, page }) {
      try {
        const response = await securedAxios.get(`/search/multi?query=${query}&page=${page}`);
        this.searchMovies.data = response.data.results;
        this.searchMovies.totalPages = response.data.total_pages;
      } catch (error) {
        console.error(error);
      }
    },
    async getRandomPoster() {
      securedAxios.get(`/movie/popular`)
        .then((response) => {
          const randomPosters = response.data.results.map((item) => `https://image.tmdb.org/t/p/original/${item.backdrop_path}`);
          const randomIndex = Math.floor(Math.random() * randomPosters.length);
          const randomPosterUrl = randomPosters[randomIndex];
          this.randomPosterURL = randomPosterUrl;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    async fetchTrandingMovies(argDay) {
      try {
        const response = await securedAxios.get(`/trending/all/${argDay}`);
        this.trandingMovies = response.data.results;
        // console.log('Trending Movies',this.trandingMovies);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPopularMovies(popular) {
      try {
        const response = await securedAxios.get(`/movie/${popular}`);
        // this.popularMovies = response.data.results;
        this.popularMovies = this.addMediaType(response.data.results, 'movie');
        // console.log('Popular Movies', this.popularMovies);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTrailerMovies(category) {
      try {
        const response = await securedAxios.get(`/movie/${category}`);
        this.trailerMovies.data = response.data.results;
        // console.log(this.trailerMovies[0].backdrop_path);
      } catch (error) {
        console.error(error);
      }
    },
    async setTrailerMovieUrl(movieId) {
      try {
        const response = await securedAxios.get(`/movie/${movieId}/videos`);
        this.trailerMovies.url.title = this.trailerMovies.data.find((movie) => movie.id === movieId).original_title;
        this.trailerMovies.url.path = response.data.results[0].key;
      } catch (error) {
        console.error(error);
      }
    },
    async getMoviePersons({ mediaType, movieId }) {
      try {
        const response = await securedAxios.get(`/${mediaType}/${movieId}/credits`);
        this.mediaDetails.persons = response.data.cast;
        // console.log(this.mediaDetails.persons);
      } catch (error) {
        console.error(error);
      }
    },
    sortByReleaseDate(items) {
      const zeroDate = new Date('1970-01-01').getTime();
      items.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || zeroDate).getTime();
        const dateB = new Date(b.release_date || b.first_air_date || zeroDate).getTime();

        if (dateA === zeroDate) {
          return -1;
        } else if (dateB === zeroDate) {
          return 1;
        } else {
          return dateB - dateA;
        }
      });
      return items;
    },
    addMediaType(moviesData, type) {
      return moviesData.map(movie => ({ ...movie, media_type: type }));
    },
  },
})
