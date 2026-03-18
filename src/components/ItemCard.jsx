import React, { useMemo } from 'react'

import { useFavouritesStore } from '../stores/useFavouritesStore.js'
import { calcVoteColor } from '../lib/helpers.js'
import { toggleFavouriteMovie } from '../lib/toggleFavouriteMovie.js'
import IconHeart from './icons/IconHeart.jsx'
import IconTrash from './icons/IconTrash.jsx'

export default function ItemCard({
  movie,
  person,
  type,
  filmCard,
  tvShowCard,
  personCard,
  favouriteCard,
}) {
  const favouriteMovies = useFavouritesStore((s) => s.favouriteMovies)

  const noImageDataUri =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
        <rect width="500" height="750" fill="#1b1b1b"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9aa0a6" font-family="Arial, sans-serif" font-size="28">
          No image
        </text>
      </svg>`,
    )

  const formatDate = useMemo(() => {
    if (movie?.release_date || movie?.first_air_date) {
      const date = new Date(movie.release_date || movie.first_air_date)
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return date.toLocaleDateString('eu', options)
    }
    return ''
  }, [movie])

  const moviePoster = useMemo(() => {
    if (movie?.poster_path !== null && movie?.poster_path !== undefined) {
      return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    }
    return noImageDataUri
  }, [movie, noImageDataUri])

  const personPoster = useMemo(() => {
    if (person?.profile_path !== null && person?.profile_path !== undefined) {
      return `https://image.tmdb.org/t/p/w500/${person.profile_path}`
    }
    return noImageDataUri
  }, [person, noImageDataUri])

  const personKnownFor = useMemo(() => {
    if (person?.known_for) return person.known_for[0]?.original_title
    return person?.character
  }, [person])

  const favouriteColor = useMemo(() => {
    return favouriteMovies.some((i) => i.id === movie?.id) ? '#ff0000' : '#fff'
  }, [favouriteMovies, movie])

  const movieAvgCount = useMemo(() => {
    if (movie?.vote_average === undefined) return 0
    return (movie.vote_average * 10).toFixed()
  }, [movie])

  return (
    <div className={`movieCard ${filmCard || tvShowCard || personCard || favouriteCard ? 'box-shadow' : ''}`}>
      <div className="movieCard__icons">
        {type === 'movie' && !favouriteCard ? (
          <span onClick={(e) => (e.preventDefault(), toggleFavouriteMovie(movie))} className="movieCard__icons-heart">
            <IconHeart color={favouriteColor} />
          </span>
        ) : null}

        {favouriteCard ? (
          <span onClick={(e) => (e.preventDefault(), toggleFavouriteMovie(movie, true))} className="movieCard__icons-trash">
            <IconTrash />
          </span>
        ) : null}

        {type === 'movie' ? (
          <img src={moviePoster} alt={movie?.title || movie?.original_name} loading="lazy" />
        ) : null}
        {personCard ? <img src={personPoster} alt={person?.name} loading="lazy" /> : null}
      </div>

      <div className="movieCard__description">
        {type === 'movie' ? (
          <div className="rating" style={calcVoteColor((movie?.vote_average * 10).toFixed())}>
            <div className="rating__content">
              <span className="rating__content-count">{movieAvgCount}</span>
              <span className="rating__content-percentage">%</span>
            </div>
          </div>
        ) : null}

        {type === 'movie' ? (
          <div>
            <h4>{movie?.title || movie?.name}</h4>
            <span>{formatDate}</span>
          </div>
        ) : null}

        {personCard ? (
          <div>
            <h4>{person?.name}</h4>
            <span>{personKnownFor}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

