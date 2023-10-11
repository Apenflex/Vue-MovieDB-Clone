import { useFavouritesStore } from '@/stores/useFavouritesStore'
import { useToast } from 'vue-toastification'

const favouriteStore = useFavouritesStore()
const toast = useToast()

/**
 * @param {object} movie
 * @param {boolean} notToast - if true, no toast notification will be shown
 * @returns {void} - adds or removes movie from favourites
 * @description - adds or removes movie from favourites
 * @example
 * toggleFavouriteMovie(movie)
 * toggleFavouriteMovie(movie, true)
  */
export const toggleFavouriteMovie = (movie, notToast) => {
  // console.log('add')
  // console.log(movie)
  if (!favouriteStore.favouriteMovies.map((item) => item.id).includes(movie.id)) {
    favouriteStore.addFavouriteMovie(movie)
    !notToast ? toast.success(`${movie.original_title || movie.name} - Added to favourites`) : null
  } else {
    favouriteStore.removeFavouriteMovie(movie)
    !notToast ? toast.error(`${movie.original_title || movie.name} - Removed from favourites`) : null
  }
}

/**
 * @param {number} vote
 * @returns {object} - CSS background property in this format: { background: `conic-gradient(from 0deg, green 0% ${vote}%, black 10% 100%)` }
 */
export const calcVoteColor = (vote) => {
  switch (true) {
    case vote >= 70:
      return { background: `conic-gradient(from 0deg, green 0% ${vote}%, black 10% 100%)` }
    case vote >= 50:
      return { background: `conic-gradient(from 0deg, orange 0% ${vote}%, black 10% 100%)` }
    case vote >= 0:
      return { background: `conic-gradient(from 0deg, red 0% ${vote}%, black 10% 100%)` }
    default:
      return { color: '#fff' }
  }
}

/**
 * @param {object} moviesType - moviesType
 * @param {string} variant - variant
 * @returns {object} - { active: true } or { active: false }
 */
export const calcTabActiveClass = (moviesType, variant) => {
  return {
    active: moviesType.variant.value === variant,
  }
}

export const correctLanguageCode = (lang) => {
  lang === 'ua' ? lang = 'uk-UA' : lang = 'en-US'
  return lang;
}