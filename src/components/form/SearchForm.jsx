import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useMoviesStore } from '../../stores/useMoviesStore.js'

export default function SearchForm({ onSubmit, initialQuery = '' }) {
  const { t } = useTranslation()
  const isLoading = useMoviesStore((s) => s.isLoading)
  const [query, setQuery] = useState(initialQuery)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const findScreenWidth = () => setIsSmallScreen(window.innerWidth <= 490)
    findScreenWidth()
    window.addEventListener('resize', findScreenWidth)
    return () => window.removeEventListener('resize', findScreenWidth)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      onSubmit?.(trimmed)
      setQuery('')
    }
  }

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={isSmallScreen ? t('components.SearchForm.placeholder.mobile') : t('components.SearchForm.placeholder.desktop')}
      />
      <button disabled={isLoading || !query.trim()} className="searchBtn">
        {t('components.SearchForm.button')}
      </button>
    </form>
  )
}

