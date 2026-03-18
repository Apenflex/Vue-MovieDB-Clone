import React, { useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { applyLocale } from '../lib/locale.js'
import { useMoviesStore } from '../stores/useMoviesStore.js'
import SearchForm from '../components/form/SearchForm.jsx'
import ItemCard from '../components/ItemCard.jsx'
import Paginator from '../components/Paginator.jsx'

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const fetchSearch = useMoviesStore((s) => s.fetchSearch)
  const searchMovies = useMoviesStore((s) => s.searchMovies)

  const searchQueryRef = useRef({
    query: searchParams.get('query') || '',
    page: Number(searchParams.get('page') || '1'),
  })

  // Keep ref in sync with URL (so SearchForm input reflects current query)
  useEffect(() => {
    searchQueryRef.current.query = searchParams.get('query') || ''
    searchQueryRef.current.page = Number(searchParams.get('page') || '1')
  }, [searchParams])

  const handleSearch = async () => {
    const q = searchQueryRef.current.query
    if (!q) return
    searchQueryRef.current.page = 1
    await fetchSearch({ query: q, page: 1 })
    navigate(applyLocale(`/search?query=${encodeURIComponent(q)}&page=1`))
  }

  const handleChangePage = async (options) => {
    const nextPage = options.page + 1
    searchQueryRef.current.page = nextPage
    await fetchSearch({ query: searchQueryRef.current.query, page: nextPage })
    navigate(applyLocale(`/search?query=${encodeURIComponent(searchQueryRef.current.query)}&page=${nextPage}`))
  }

  useEffect(() => {
    if (!searchQueryRef.current.query) return
    fetchSearch({ query: searchQueryRef.current.query, page: searchQueryRef.current.page })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container">
      <section className="search">
        <SearchForm searchQuery={searchQueryRef.current} onSubmit={handleSearch} />

        <div className="search__content">
          <div className="search__content-items">
            {searchMovies.data.map((movie) => (
              <Link key={movie.id} to={applyLocale(`/${movie.media_type}/${movie.id}`)}>
                <ItemCard movie={movie} type="movie" />
              </Link>
            ))}
          </div>

          <Paginator page={searchQueryRef.current.page || 1} rows={20} totalRecords={searchMovies.totalResults} onPage={handleChangePage} />
        </div>
      </section>
    </main>
  )
}

