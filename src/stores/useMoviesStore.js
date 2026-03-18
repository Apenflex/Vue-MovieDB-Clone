import { create } from 'zustand'

import { securedAxios } from '../lib/api.js'
import { correctLanguageCode } from '../lib/helpers.js'

export const useMoviesStore = create((set, get) => ({
  movies: [],
  tvShows: [],
  persons: { data: [], totalPages: 0, totalResults: 0 },
  person: {
    bio: [],
    externalIds: [],
    movies: { cast: [], crew: [] },
  },
  mediaDetails: { data: [], persons: [] },
  randomPosterURL: '',
  trandingMovies: [],
  popularMovies: [],
  trailerMovies: { data: [], url: { title: '', path: '' } },
  searchMovies: { data: [], totalPages: 0, totalResults: 0 },
  isLoading: false,
  progressData: 0,
  progress: {
    active: false,
    value: 0,
  },

  // ---- getters (Pinia parity) ----
  getMovies: () => get().movies,
  getTvShows: () => get().tvShows,
  getPersons: () => get().persons.data,
  getPerson: () => get().person,
  getPersonCast: () => get().person.movies.cast,
  getPersonCamera: () => get().person.movies.crew.filter((i) => i.department === 'Camera'),
  getPersonCrew: () => get().person.movies.crew.filter((i) => i.department === 'Crew'),
  getPersonDirector: () => get().person.movies.crew.filter((i) => i.department === 'Directing'),
  getPersonEditing: () => get().person.movies.crew.filter((i) => i.department === 'Editing'),
  getPersonProducer: () => get().person.movies.crew.filter((i) => i.department === 'Production'),
  getPersonWriter: () => get().person.movies.crew.filter((i) => i.department === 'Writing'),

  // ---- helpers ----
  addMediaType: (items, type) => items.map((m) => ({ ...m, media_type: type })),

  sortByReleaseDate: (items) => {
    const zeroDate = new Date('1970-01-01').getTime()
    const copy = [...items]
    copy.sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date || zeroDate).getTime()
      const dateB = new Date(b.release_date || b.first_air_date || zeroDate).getTime()
      if (dateA === zeroDate) return -1
      if (dateB === zeroDate) return 1
      return dateB - dateA
    })
    return copy
  },

  startProgress: () => {
    set({ progress: { active: true, value: 10 } })
  },

  setProgress: (value) => {
    set((s) => ({ progress: { ...s.progress, value } }))
  },

  finishProgress: () => {
    set((s) => ({ progress: { ...s.progress, value: 100 } }))
    setTimeout(() => {
      set({ progress: { active: false, value: 0 } })
    }, 300)
  },

  MoviesSortBy: async (sortBy) => {
    set((s) => {
      const sorted = [...s.movies]
      switch (sortBy) {
        case 'popularDesc':
          sorted.sort((a, b) => b.popularity - a.popularity)
          break
        case 'popularAsc':
          sorted.sort((a, b) => a.popularity - b.popularity)
          break
        case 'voteDesc':
          sorted.sort((a, b) => b.vote_average - a.vote_average)
          break
        case 'voteAsc':
          sorted.sort((a, b) => a.vote_average - b.vote_average)
          break
        case 'releaseDesc':
          sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          break
        case 'releaseAsc':
          sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
          break
        case 'titleAsc':
          sorted.sort((a, b) => a.original_title.localeCompare(b.original_title))
          break
        default:
          break
      }
      return { movies: sorted }
    })
  },

  TvShowsSortBy: async (sortBy) => {
    set((s) => {
      const sorted = [...s.tvShows]
      switch (sortBy) {
        case 'popularDesc':
          sorted.sort((a, b) => b.popularity - a.popularity)
          break
        case 'popularAsc':
          sorted.sort((a, b) => a.popularity - b.popularity)
          break
        case 'voteDesc':
          sorted.sort((a, b) => b.vote_average - a.vote_average)
          break
        case 'voteAsc':
          sorted.sort((a, b) => a.vote_average - b.vote_average)
          break
        case 'releaseDesc':
          sorted.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date))
          break
        case 'releaseAsc':
          sorted.sort((a, b) => new Date(a.first_air_date) - new Date(b.first_air_date))
          break
        case 'titleAsc':
          sorted.sort((a, b) => a.original_name.localeCompare(b.original_name))
          break
        default:
          break
      }
      return { tvShows: sorted }
    })
  },

  // ---- actions (Pinia parity) ----
  fetchMovies: async ({ lang }) => {
    try {
      const response = await securedAxios.get(`/movie/popular?language=${correctLanguageCode(lang)}`)
      set({ movies: get().addMediaType(response.data.results, 'movie') })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },

  fetchMoviesMore: async ({ page, sortBy, lang }) => {
    try {
      get().startProgress()
      set({ isLoading: true })
      const response = await securedAxios.get(`/movie/popular?language=${correctLanguageCode(lang)}&page=${page}`)
      const newMovies = get().addMediaType(response.data.results, 'movie')
      set((s) => ({ movies: [...s.movies, ...newMovies] }))
      await get().MoviesSortBy(sortBy)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      set({ isLoading: false })
      get().setProgress(100)
      get().finishProgress()
    }
  },

  fetchMediaDetails: async ({ mediaType, id, lang }) => {
    try {
      get().startProgress()
      set({ mediaDetails: { data: [], persons: [] } })
      const response = await securedAxios.get(`/${mediaType}/${id}?language=${correctLanguageCode(lang)}`)
      const trailerResp = await securedAxios.get(`/${mediaType}/${id}/videos`)
      const trailer = trailerResp.data.results[0]?.key || 'OOkJ54oqt5Q'
      set({ mediaDetails: { ...get().mediaDetails, data: { ...response.data, media_type: mediaType, trailer } } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      get().setProgress(100)
      get().finishProgress()
    }
  },

  fetchTvShows: async ({ lang }) => {
    try {
      get().startProgress()
      const response = await securedAxios.get(`/tv/popular?language=${correctLanguageCode(lang)}`)
      set({ tvShows: get().addMediaType(response.data.results, 'tv') })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      get().setProgress(100)
      get().finishProgress()
    }
  },

  fetchTvShowsMore: async ({ page, sortBy, lang }) => {
    try {
      get().startProgress()
      set({ isLoading: true })
      const response = await securedAxios.get(`/tv/popular?language=${correctLanguageCode(lang)}&page=${page}`)
      const newTv = get().addMediaType(response.data.results, 'tv')
      set((s) => ({ tvShows: [...s.tvShows, ...newTv] }))
      await get().TvShowsSortBy(sortBy)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      set({ isLoading: false })
      get().setProgress(100)
      get().finishProgress()
    }
  },

  fetchPersons: async ({ page, lang }) => {
    try {
      get().startProgress()
      const response = await securedAxios.get(`/person/popular?language=${correctLanguageCode(lang)}&page=${page}`)
      set({
        persons: { data: response.data.results, totalPages: response.data.total_pages, totalResults: response.data.total_results },
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      get().setProgress(100)
      get().finishProgress()
    }
  },

  fetchPerson: async (id) => {
    set({
      person: { bio: [], externalIds: [], movies: { cast: [], crew: [] } },
      isLoading: true,
    })
    try {
      const responseBio = await securedAxios.get(`/person/${id}`)
      const responseMovies = await securedAxios.get(`/person/${id}/movie_credits`)
      const responseTvShows = await securedAxios.get(`/person/${id}/tv_credits`)
      const responseExternal = await securedAxios.get(`/person/${id}/external_ids`)

      set({
        person: {
          bio: responseBio.data,
          externalIds: responseExternal.data,
          movies: {
            cast: get().sortByReleaseDate([...responseMovies.data.cast, ...responseTvShows.data.cast]),
            crew: get().sortByReleaseDate(responseMovies.data.crew),
          },
        },
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSearch: async ({ query, page }) => {
    try {
      set({ isLoading: true })
      const response = await securedAxios.get(`/search/multi?query=${query}&page=${page}`)
      set({
        searchMovies: { data: response.data.results, totalPages: response.data.total_pages, totalResults: response.data.total_results },
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      set({ isLoading: false })
    }
  },

  getRandomPoster: async () => {
    try {
      const response = await securedAxios.get(`/movie/popular`)
      const randomPosters = response.data.results.map((item) => `https://image.tmdb.org/t/p/original/${item.backdrop_path}`)
      const randomIndex = Math.floor(Math.random() * randomPosters.length)
      set({ randomPosterURL: randomPosters[randomIndex] })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },

  fetchTrandingMovies: async (argDay) => {
    try {
      const response = await securedAxios.get(`/trending/all/${argDay}`, {
        onDownloadProgress: (progressEvent) => {
          if (progressEvent?.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            set({ progressData: percentCompleted })
          }
        },
      })
      set({ trandingMovies: response.data.results })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },

  fetchPopularMovies: async (popular) => {
    try {
      const response = await securedAxios.get(`/movie/${popular}`)
      set({ popularMovies: get().addMediaType(response.data.results, 'movie') })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },

  fetchTrailerMovies: async (category) => {
    try {
      const response = await securedAxios.get(`/movie/${category}`)
      set({ trailerMovies: { ...get().trailerMovies, data: response.data.results } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },

  setTrailerMovieUrl: async (movieId) => {
    try {
      const response = await securedAxios.get(`/movie/${movieId}/videos`)
      const title = get().trailerMovies.data.find((m) => m.id === movieId)?.original_title || ''
      const path = response.data.results[0]?.key || ''
      set({ trailerMovies: { ...get().trailerMovies, url: { title, path } } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },

  getMoviePersons: async ({ mediaType, movieId }) => {
    try {
      const response = await securedAxios.get(`/${mediaType}/${movieId}/credits`)
      set({ mediaDetails: { ...get().mediaDetails, persons: response.data.cast } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },
}))

