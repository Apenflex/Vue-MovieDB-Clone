import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useMoviesStore } from '../../stores/useMoviesStore.js'

export default function SearchForm({ searchQuery, onSubmit }) {
  const { t } = useTranslation()
  const isLoading = useMoviesStore((s) => s.isLoading)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const findScreenWidth = () => setIsSmallScreen(window.innerWidth <= 490)
    findScreenWidth()
    window.addEventListener('resize', findScreenWidth)
    return () => window.removeEventListener('resize', findScreenWidth)
  }, [])

  return (
    <form className="search__form" onSubmit={(e) => (e.preventDefault(), onSubmit?.())}>
      <input
        value={searchQuery.query}
        onChange={(e) => (searchQuery.query = e.target.value)}
        type="text"
        placeholder={isSmallScreen ? t('components.SearchForm.placeholder.mobile') : t('components.SearchForm.placeholder.desktop')}
      />
      <button disabled={isLoading || !searchQuery.query} className="searchBtn">
        {t('components.SearchForm.button')}
      </button>
    </form>
  )
}

