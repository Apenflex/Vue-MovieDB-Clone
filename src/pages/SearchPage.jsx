import React, { useEffect } from 'react'
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

  const queryFromUrl = searchParams.get('query') || ''
  const pageFromUrl = Number(searchParams.get('page') || '1')

  const handleSearch = (query) => {
    const q = (query ?? queryFromUrl).trim()
    if (!q) return
    navigate(applyLocale(`/search?query=${encodeURIComponent(q)}&page=1`))
  }

  const handleChangePage = (options) => {
    const nextPage = options.page + 1
    const q = queryFromUrl
    if (!q) return
    navigate(applyLocale(`/search?query=${encodeURIComponent(q)}&page=${nextPage}`))
  }

  useEffect(() => {
    if (!queryFromUrl) return
    fetchSearch({ query: queryFromUrl, page: pageFromUrl })
  }, [queryFromUrl, pageFromUrl])

  return (
    <main className="container">
      <section className="search">
        <SearchForm
          key={queryFromUrl || 'search'}
          initialQuery={queryFromUrl}
          onSubmit={handleSearch}
        />

        <div className="search__content">
          <div className="search__content-items">
            {searchMovies.data.map((movie) => (
              <Link key={movie.id} to={applyLocale(`/${movie.media_type}/${movie.id}`)}>
                <ItemCard movie={movie} type="movie" />
              </Link>
            ))}
          </div>

          <Paginator page={pageFromUrl} rows={20} totalRecords={searchMovies.totalResults} onPage={handleChangePage} />
        </div>
      </section>
    </main>
  )
}

