import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useMoviesStore } from '../stores/useMoviesStore.js'
import PersonDescList from '../components/PersonDescList.jsx'
import PrimeSkeleton from '../components/PrimeSkeleton.jsx'

export default function PersonDescPage() {
  const { params } = useParams()
  const { t } = useTranslation()

  const fetchPerson = useMoviesStore((s) => s.fetchPerson)
  const isLoading = useMoviesStore((s) => s.isLoading)
  const person = useMoviesStore((s) => s.getPerson())
  const director = useMoviesStore((s) => s.getPersonDirector())
  const cast = useMoviesStore((s) => s.getPersonCast())
  const camera = useMoviesStore((s) => s.getPersonCamera())
  const crew = useMoviesStore((s) => s.getPersonCrew())
  const editing = useMoviesStore((s) => s.getPersonEditing())
  const producer = useMoviesStore((s) => s.getPersonProducer())
  const writer = useMoviesStore((s) => s.getPersonWriter())

  const [showMoreBio, setShowMoreBio] = useState(false)

  const personId = useMemo(() => {
    const raw = params || ''
    const idx = raw.indexOf('-')
    const idStr = idx >= 0 ? raw.slice(0, idx) : raw
    const idNum = Number(idStr)
    return Number.isFinite(idNum) ? idNum : null
  }, [params])

  useEffect(() => {
    if (personId) fetchPerson(personId)
  }, [personId, fetchPerson])

  const personBiography = useMemo(() => {
    const bio = person?.bio?.biography || ''
    if (!bio) return ''
    return showMoreBio ? bio : bio.slice(0, 1200) + '...'
  }, [person, showMoreBio])

  const personPoster = useMemo(() => {
    const p = person?.bio?.profile_path
    if (!p) {
      return (
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
            <rect width="500" height="750" fill="#1b1b1b"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9aa0a6" font-family="Arial, sans-serif" font-size="28">
              No image
            </text>
          </svg>`,
        )
      )
    }
    return `https://image.tmdb.org/t/p/w500/${p}`
  }, [person])

  const personWorks = useMemo(() => (person?.movies?.cast || []).length, [person])

  const personGender = useMemo(() => {
    return person?.bio?.gender === 1 ? t('pages.PersonDesc.About.gender.woman') : t('pages.PersonDesc.About.gender.man')
  }, [person, t])

  const personBirthday = useMemo(() => {
    return person?.bio?.birthday ? person.bio.birthday : t('pages.PersonDesc.About.birthday.unknown')
  }, [person, t])

  const personFullYears = useMemo(() => {
    if (!person?.bio?.birthday) return ''
    return `(${new Date().getFullYear() - new Date(person.bio.birthday).getFullYear()})`
  }, [person])

  const personBirthPlace = useMemo(() => {
    return person?.bio?.place_of_birth ? person.bio.place_of_birth : t('pages.PersonDesc.About.placeofbirth.unknown')
  }, [person, t])

  return (
    <main className="container">
      <section className="persondesc">
        <div className="persondesc__wrapper">
          <div className="persondesc__bio">
            <div className="block">
              <div className="block__image">
                {!isLoading ? <img src={personPoster} alt={person?.bio?.name} /> : null}
              </div>
              {isLoading ? <PrimeSkeleton width="100%" height="450px" /> : null}

              {!isLoading ? <h2 className="block__title">{person?.bio?.name}</h2> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="30px" /> : null}

              <div className="block__info">
                <div className="block__info-icons">
                  {person?.externalIds?.facebook_id && !isLoading ? (
                    <a href={`https://www.facebook.com/${person.externalIds.facebook_id}`} target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                      </svg>
                    </a>
                  ) : null}
                  {isLoading ? <PrimeSkeleton width="40px" height="40px" shape="circle" /> : null}

                  {person?.externalIds?.instagram_id && !isLoading ? (
                    <a href={`https://www.instagram.com/${person.externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </a>
                  ) : null}
                  {isLoading ? <PrimeSkeleton width="40px" height="40px" shape="circle" /> : null}

                  {person?.externalIds?.twitter_id && !isLoading ? (
                    <a href={`https://twitter.com/${person.externalIds.twitter_id}`} target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                      </svg>
                    </a>
                  ) : null}
                  {isLoading ? <PrimeSkeleton width="40px" height="40px" shape="circle" /> : null}
                </div>

                {!isLoading ? <h3>{t('pages.PersonDesc.About.personalnfo')}</h3> : null}
                {isLoading ? <PrimeSkeleton width="100%" height="25px" /> : null}

                {!isLoading ? (
                  <div className="block__info-desc">
                    <div className="head">
                      {t('pages.PersonDesc.About.knownfor')}
                      <span>{person?.bio?.known_for_department}</span>
                    </div>
                    <div className="head">
                      {t('pages.PersonDesc.About.knowncredits')}
                      <span>{personWorks}</span>
                    </div>
                    <div className="head">
                      {t('pages.PersonDesc.About.gender.title')}
                      <span>{personGender}</span>
                    </div>
                    <div className="head">
                      {t('pages.PersonDesc.About.birthday.title')}
                      <span>
                        {personBirthday} {personFullYears}
                      </span>
                    </div>
                    <div className="head">
                      {t('pages.PersonDesc.About.placeofbirth.title')}
                      <span>{personBirthPlace}</span>
                    </div>
                    <div className="head know_how">
                      {t('pages.PersonDesc.About.alsoKnownAs')}
                      {(person?.bio?.also_known_as || []).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="persondesc__content">
            {!isLoading ? <h2 className="persondesc__content-title">{person?.bio?.name}</h2> : null}
            {isLoading ? <PrimeSkeleton width="40%" height="30px" /> : null}

            {!isLoading ? (
              <div className="persondesc__content-textblock">
                <h3>{t('pages.PersonDesc.Bio.biography')}</h3>
                {person?.bio?.biography ? (
                  <p className={`text ${showMoreBio ? 'expanded' : ''}`}>
                    {personBiography}
                    <button onClick={() => setShowMoreBio((v) => !v)}>
                      {showMoreBio ? t('pages.PersonDesc.Bio.showmore.less') : t('pages.PersonDesc.Bio.showmore.more')}
                    </button>
                  </p>
                ) : (
                  <p>
                    {t('pages.PersonDesc.Bio.nowbiography')} {person?.bio?.name}. <br />
                  </p>
                )}
              </div>
            ) : null}
            {isLoading ? <PrimeSkeleton width="100%" height="330px" /> : null}

            {!isLoading ? (
              <div className="persondesc__content-knownFor">
                <h3>{t('pages.PersonDesc.Bio.knownfor')}</h3>
                <div>Slider</div>
              </div>
            ) : null}
            {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}

            <div className="persondesc__content-list">
              {!isLoading ? <PersonDescList getPersonData={director} title={t('pages.PersonDesc.Cast.direction')} /> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}
              {!isLoading ? <PersonDescList getPersonData={cast} title={t('pages.PersonDesc.Cast.acting')} /> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}
              {!isLoading ? <PersonDescList getPersonData={camera} title={t('pages.PersonDesc.Cast.operatorwork')} /> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}
              {!isLoading ? <PersonDescList getPersonData={crew} title={t('pages.PersonDesc.Cast.team')} /> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}
              {!isLoading ? <PersonDescList getPersonData={editing} title={t('pages.PersonDesc.Cast.scenario')} /> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}
              {!isLoading ? <PersonDescList getPersonData={producer} title={t('pages.PersonDesc.Cast.production')} /> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}
              {!isLoading ? <PersonDescList getPersonData={writer} title={t('pages.PersonDesc.Cast.assembling')} /> : null}
              {isLoading ? <PrimeSkeleton width="100%" height="130px" /> : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

