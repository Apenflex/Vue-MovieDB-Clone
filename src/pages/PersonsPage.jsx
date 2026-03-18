import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/i18n.js'

import { applyLocale } from '../lib/locale.js'
import { useMoviesStore } from '../stores/useMoviesStore.js'
import ItemCard from '../components/ItemCard.jsx'
import Paginator from '../components/Paginator.jsx'

export default function PersonsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const persons = useMoviesStore((s) => s.persons)
  const getPersons = useMoviesStore((s) => s.getPersons)
  const fetchPersons = useMoviesStore((s) => s.fetchPersons)

  const pageFromQuery = Number(searchParams.get('page') || '1')
  const [currentPage, setCurrentPage] = useState(Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? pageFromQuery : 1)

  useEffect(() => {
    const p = Number(searchParams.get('page') || '1')
    setCurrentPage(Number.isFinite(p) && p > 0 ? p : 1)
  }, [searchParams])

  useEffect(() => {
    fetchPersons({ page: currentPage, lang: i18n.language })
  }, [currentPage, fetchPersons])

  const list = useMemo(() => getPersons(), [getPersons, persons.data])

  const handleChangePage = async (options) => {
    const next = options.page + 1
    setCurrentPage(next)
    await fetchPersons({ page: next, lang: i18n.language })
    navigate(applyLocale(`/persons?page=${next}`))
  }

  return (
    <main className="container">
      <section className="persons">
        <div className="persons__content">
          <h1>{t('pages.Persons.H1')}</h1>

          <div className="persons__items">
            {list.map((person) => {
              const slug = `${person.id}-${(person.name || '').split(' ').join('-').toLowerCase()}`
              return (
                <Link key={person.name} to={applyLocale(`/persons/${slug}`)}>
                  <ItemCard person={person} personCard={true} />
                </Link>
              )
            })}
          </div>

          <div className="persons__pagination">
            <Paginator page={currentPage} rows={20} totalRecords={persons.totalResults} onPage={handleChangePage} />
          </div>
        </div>
      </section>
    </main>
  )
}

