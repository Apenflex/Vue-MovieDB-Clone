import { useFavouritesStore } from '@/stores/useFavouritesStore'
import { useToast } from 'vue-toastification'

const favouriteStore = useFavouritesStore()
const toast = useToast()

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