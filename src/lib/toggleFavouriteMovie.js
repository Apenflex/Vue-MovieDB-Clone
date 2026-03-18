import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'

import { useFavouritesStore } from '../stores/useFavouritesStore.js'

export function toggleFavouriteMovie(movie, notToast) {
  if (!getAuth().currentUser) {
    toast.error('Please log in to add movies to favourites')
    return
  }

  const store = useFavouritesStore.getState()
  const exists = store.favouriteMovies.map((i) => i.id).includes(movie.id)

  if (!exists) {
    store.addFavouriteMovie(movie)
    if (!notToast) toast.success(`${movie.original_title || movie.name} - Added to favourites`)
  } else {
    store.removeFavouriteMovie(movie)
    if (!notToast) toast.error(`${movie.original_title || movie.name} - Removed from favourites`)
  }
}

