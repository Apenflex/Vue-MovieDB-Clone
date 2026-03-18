import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useFavouritesStore } from '../stores/useFavouritesStore.js'
import { applyLocale } from '../lib/locale.js'
import ItemCard from '../components/ItemCard.jsx'

export default function FavouritePage() {
  const { t } = useTranslation()
  const favouriteMovies = useFavouritesStore((s) => s.favouriteMovies)

  const emptyFavourites = useMemo(() => !favouriteMovies.length, [favouriteMovies])

  return (
    <main className="container">
      <section className="favourite">
        <div className="favourite__content">
          <h2>{t('pages.Favourite.H1')}</h2>

          {emptyFavourites ? <div className="favourite__content-empty">{t('pages.Favourite.noFavourites')}</div> : null}

          <div className="favourite__items">
            {favouriteMovies.map((movie) => (
              <Link key={movie.id} to={applyLocale(`/${movie.media_type}/${movie.id}`)}>
                <ItemCard movie={movie} type="movie" favouriteCard={true} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

