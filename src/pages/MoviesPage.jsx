import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import i18n from '../i18n/i18n.js'
import { useMoviesStore } from '../stores/useMoviesStore.js'
import { applyLocale } from '../lib/locale.js'
import ItemCard from '../components/ItemCard.jsx'
import VueMultiselect from '../components/VueMultiselect.jsx'

export default function MoviesPage() {
  const { t } = useTranslation()

  const movies = useMoviesStore((s) => s.getMovies())
  const isLoading = useMoviesStore((s) => s.isLoading)
  const fetchMovies = useMoviesStore((s) => s.fetchMovies)
  const fetchMoviesMore = useMoviesStore((s) => s.fetchMoviesMore)
  const MoviesSortBy = useMoviesStore((s) => s.MoviesSortBy)

  const [currentPage, setCurrentPage] = useState(1)
  const [panelOpen, setPanelOpen] = useState(false)
  const [searchBtnOpen, setSearchBtnOpen] = useState(false)
  const [sortByValue, setSortByValue] = useState('popularity')

  const selectOptions = useMemo(
    () => [
      { label: t('pages.Movies.Filter.options.popularity.label'), value: 'popularity' },
      { label: t('pages.Movies.Filter.options.popularDesc.label'), value: 'popularDesc' },
      { label: t('pages.Movies.Filter.options.voteDesc.label'), value: 'voteDesc' },
      { label: t('pages.Movies.Filter.options.voteAsc.label'), value: 'voteAsc' },
      { label: t('pages.Movies.Filter.options.releaseDesc.label'), value: 'releaseDesc' },
      { label: t('pages.Movies.Filter.options.releaseAsc.label'), value: 'releaseAsc' },
      { label: t('pages.Movies.Filter.options.titleAsc.label'), value: 'titleAsc' },
    ],
    [t],
  )

  const selectedOption = useMemo(
    () => selectOptions.find((o) => o.value === sortByValue) ?? selectOptions[0],
    [selectOptions, sortByValue],
  )

  // Initial fetch (mirrors onBeforeMount)
  useEffect(() => {
    fetchMovies({ lang: i18n.language })
  }, [fetchMovies])

  const handleFilterSearch = async () => {
    await MoviesSortBy(sortByValue)
    setSearchBtnOpen(false)
  }

  const handleLoadMore = async () => {
    const next = currentPage + 1
    setCurrentPage(next)
    await fetchMoviesMore({ page: next, sortBy: sortByValue, lang: i18n.language })
  }

  return (
    <main className="container">
      <section className="movies">
        <h1>{t('pages.Movies.H1')}</h1>

        <div className="movies__wrapper">
          <div className="movies__filter">
            <div className="block-title" onClick={() => setPanelOpen((v) => !v)}>
              <h2>{t('pages.Movies.Filter.title')}</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
                className={panelOpen ? 'rotate' : ''}
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </div>

            <div className={`movies__filter-panel ${panelOpen ? '' : 'closed'}`}>
              <h3>{t('pages.Movies.Filter.sortBy')}</h3>
              <VueMultiselect
                value={selectedOption}
                options={selectOptions}
                label="label"
                trackBy="value"
                onSelect={(opt) => {
                  setSortByValue(opt.value)
                  setSearchBtnOpen(true)
                }}
              />
            </div>
          </div>

          <div className="movies__content">
            <div className="movies__content-items">
              {movies.map((movie) => (
                <Link key={movie.id} to={applyLocale(`/movie/${movie.id}`)}>
                  <ItemCard movie={movie} type="movie" filmCard={true} />
                </Link>
              ))}
            </div>

            <button className={`movies__content-loadMore ${isLoading ? 'loading' : ''}`} onClick={handleLoadMore}>
              Завантажити більше
            </button>

            {searchBtnOpen ? (
              <button className="movies__content-loadMore fixed" onClick={handleFilterSearch}>
                Шукати
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}

