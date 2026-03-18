import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, FreeMode } from 'swiper/modules'

import i18n from '../i18n/i18n.js'
import { useMoviesStore } from '../stores/useMoviesStore.js'
import { useFavouritesStore } from '../stores/useFavouritesStore.js'
import { applyLocale } from '../lib/locale.js'
import { calcVoteColor } from '../lib/helpers.js'
import { toggleFavouriteMovie } from '../lib/toggleFavouriteMovie.js'

import Modal from '../components/modal/Modal.jsx'
import IconHeart from '../components/icons/IconHeart.jsx'
import ItemCard from '../components/ItemCard.jsx'

export default function FilmsDescPage() {
  const { mediaType, id } = useParams()
  const { t } = useTranslation()

  const fetchMediaDetails = useMoviesStore((s) => s.fetchMediaDetails)
  const getMoviePersons = useMoviesStore((s) => s.getMoviePersons)
  const mediaDetails = useMoviesStore((s) => s.mediaDetails)

  const favouriteMovies = useFavouritesStore((s) => s.favouriteMovies)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleToggleModal = () => setIsModalOpen((v) => !v)

  useEffect(() => {
    let alive = true
    ;(async () => {
      setIsLoading(true)
      await Promise.all([
        fetchMediaDetails({ mediaType, id, lang: i18n.language }),
        getMoviePersons({ mediaType, movieId: id }),
      ])
      if (alive) setIsLoading(false)
    })()
    return () => {
      alive = false
    }
  }, [fetchMediaDetails, getMoviePersons, id, mediaType])

  const data = mediaDetails?.data || {}
  const persons = mediaDetails?.persons || []

  const swiperBreakpoints = useMemo(
    () => ({
      320: { slidesPerView: 1 },
      480: { slidesPerView: 2 },
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 6 },
      1280: { slidesPerView: 7 },
    }),
    [],
  )

  const mediaDetailsPoster = useMemo(() => {
    const posterPath = data.poster_path
    if (posterPath !== null && posterPath !== undefined) return `https://image.tmdb.org/t/p/original/${posterPath}`
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
  }, [data.poster_path])

  const backgroundImage = useMemo(() => {
    const backdropPath = data.backdrop_path
    const gradientColor1 = 'rgba(0, 0, 0, 0.5)'
    const gradientColor2 = 'rgba(0, 0, 0, 0.7)'

    if (backdropPath !== null && backdropPath !== undefined) {
      return {
        backgroundImage: `linear-gradient(to right, ${gradientColor1} 0%, ${gradientColor2} 40%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backdropPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }

    return {
      backgroundImage: `linear-gradient(to right, ${gradientColor1} 0%, ${gradientColor2} 40%)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }, [data.backdrop_path])

  const ratingCount = useMemo(() => ((data.vote_average || 0) * 10).toFixed(), [data.vote_average])

  const mediaDetailsRelease = useMemo(() => {
    return (
      data.release_date?.split('-').reverse().join('-') ||
      data.first_air_date?.split('-').reverse().join('-') ||
      ''
    )
  }, [data.first_air_date, data.release_date])

  const mediaDetailsGenres = useMemo(() => data.genres?.map((g) => g.name).join(', '), [data.genres])

  const mediaDetailsRuntime = useMemo(() => {
    if (!data.runtime) return ''
    return `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
  }, [data.runtime])

  const favouriteColor = useMemo(() => {
    return favouriteMovies.find((m) => m.id === data.id) ? '#ff0000' : '#fff'
  }, [data.id, favouriteMovies])

  return (
    <main>
      <section className="details">
        <div className="details__movie" style={backgroundImage}>
          <div className="details__movie-image">
            <img src={mediaDetailsPoster} alt={data.title} />
          </div>

          <div className="details__movie-content">
            <div className="head">
              <div className="head__title">
                <h2>{data.title || data.name}</h2>
                {data.release_date || data.first_air_date ? (
                  <span>({data.release_date?.split('-')[0] || data.first_air_date?.split('-')[0]})</span>
                ) : null}
              </div>
              <div className="head__facts">
                <span className="release">{mediaDetailsRelease}</span>
                <span className="genres">{mediaDetailsGenres}</span>
                <span className="runtime">{mediaDetailsRuntime}</span>
              </div>
            </div>

            <div className="actions">
              <div className="actions__rating">
                <div className="icon" style={calcVoteColor(((data.vote_average || 0) * 10).toFixed())}>
                  <div>
                    <span className="icon-count"> {ratingCount}</span>
                    <span className="icon-percentage"> % </span>
                  </div>
                </div>
                <div className="icon-title">{t('pages.FilmDesc.userscore')}</div>
              </div>

              <div className="block fixed">
                <div className="tooltip">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
                  </svg>
                </div>
                <div className="tooltip" onClick={(e) => (e.preventDefault(), toggleFavouriteMovie(data))}>
                  <IconHeart color={favouriteColor} />
                </div>
                <div className="tooltip">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                  </svg>
                </div>
                <div className="tooltip">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div>
              </div>

              <div className="play" onClick={() => handleToggleModal()}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 384 512">
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                </span>
                {t('pages.FilmDesc.playtrailer')}
              </div>
            </div>

            <div className="info">
              <h3 className="tagline">{data.tagline}</h3>
              <h3 className="title">{t('pages.FilmDesc.overview')}</h3>
              <p className="overview">{data.overview}</p>
            </div>
          </div>
        </div>

        <div className="details__persons">
          <h2>{t('pages.FilmDesc.cast')}</h2>
          <Swiper
            slidesPerView={7}
            spaceBetween={20}
            freeMode={true}
            mousewheel={{ forceToAxis: true }}
            modules={[Mousewheel, FreeMode]}
            breakpoints={swiperBreakpoints}
          >
            {persons.map((p) => {
              const slug = `${p.id}-${(p.name || '').split(' ').join('-').toLowerCase()}`
              return (
                <SwiperSlide key={p.id}>
                  <Link to={applyLocale(`/persons/${slug}`)}>
                    <ItemCard person={p} personCard={true} />
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {isModalOpen ? (
          <Modal
            movie={{
              title: data.original_title || data.name,
              path: data.trailer,
            }}
            onToggleModal={handleToggleModal}
          />
        ) : null}
      </section>
    </main>
  )
}

