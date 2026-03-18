import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavouritesStore = create(
  persist(
    (set, get) => ({
      favouriteMovies: [],
      getFavouriteMovies: () => get().favouriteMovies,
      addFavouriteMovie: (movie) => set((s) => ({ favouriteMovies: [...s.favouriteMovies, movie] })),
      removeFavouriteMovie: (movie) => set((s) => ({ favouriteMovies: s.favouriteMovies.filter((i) => i.id !== movie.id) })),
    }),
    { name: 'favourites-store' },
  ),
)

