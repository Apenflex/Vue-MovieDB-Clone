import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { applyLocale } from '../../lib/locale.js'
import { useMoviesStore } from '../../stores/useMoviesStore.js'
import SearchForm from '../form/SearchForm.jsx'

export default function HomeSearch() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const getRandomPoster = useMoviesStore((s) => s.getRandomPoster)
  const randomPosterURL = useMoviesStore((s) => s.randomPosterURL)

  useEffect(() => {
    getRandomPoster()
  }, [getRandomPoster])

  const backgroundImage = useMemo(() => {
    return {
      backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.8) 100%), url(${randomPosterURL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }, [randomPosterURL])

  const handleSearch = (query) => {
    if (!query?.trim()) return
    const newRoute = applyLocale(`/search?query=${encodeURIComponent(query.trim())}&page=1`)
    navigate(newRoute)
  }

  return (
    <div className="container">
      <section className="searchblock" style={backgroundImage}>
        <div className="searchblock__wrapper">
          <div className="searchblock__title">
            <h1>{t('components.HomeSearch.h1')}</h1>
            <h2>{t('components.HomeSearch.h2')}</h2>
          </div>
          <SearchForm onSubmit={handleSearch} />
        </div>
      </section>
    </div>
  )
}

