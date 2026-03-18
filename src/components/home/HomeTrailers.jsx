import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { calcTabActiveClass } from '../../lib/helpers.js'
import { useMoviesStore } from '../../stores/useMoviesStore.js'
import VueMultiselect from '../VueMultiselect.jsx'
import Modal from '../modal/Modal.jsx'

export default function HomeTrailers() {
  const { t } = useTranslation()

  const fetchTrailerMovies = useMoviesStore((s) => s.fetchTrailerMovies)
  const setTrailerMovieUrl = useMoviesStore((s) => s.setTrailerMovieUrl)
  const trailerMovies = useMoviesStore((s) => s.trailerMovies)

  const [variant, setVariant] = useState({ label: t('components.HomeTrailers.tab.streaming.label'), value: '' })
  const trailerState = useMemo(() => ({ data: trailerMovies.data, variant }), [trailerMovies.data, variant])

  const [backgroundImage, setBackgroundImage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectOptions = useMemo(
    () => [
      { label: t('components.HomeTrailers.tab.streaming.label'), value: t('components.HomeTrailers.tab.streaming.value') },
      { label: t('components.HomeTrailers.tab.onTv.label'), value: t('components.HomeTrailers.tab.onTv.value') },
      { label: t('components.HomeTrailers.tab.forRent.label'), value: t('components.HomeTrailers.tab.forRent.value') },
      { label: t('components.HomeTrailers.tab.inTheaters.label'), value: t('components.HomeTrailers.tab.inTheaters.value') },
    ],
    [t],
  )

  const swiperBreakpoints = useMemo(
    () => ({
      320: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      993: { slidesPerView: 3 },
      1280: { slidesPerView: 4, spaceBetween: 30 },
      1600: { slidesPerView: 5, spaceBetween: 30 },
    }),
    [],
  )

  const changeSectionBackground = (image) => {
    setBackgroundImage(`https://image.tmdb.org/t/p/original/${image}`)
  }

  const moviePoster = (poster) => {
    if (!poster) return ''
    return `https://image.tmdb.org/t/p/w500/${poster}`
  }

  const handleToggleModal = async (movieId) => {
    if (isModalOpen) {
      setIsModalOpen(false)
      return
    }
    setIsModalOpen(true)
    await setTrailerMovieUrl(movieId)
  }

  const fetchTrailers = async (argDay) => {
    setVariant((v) => ({ ...v, value: argDay }))
    await fetchTrailerMovies(argDay)
  }

  useEffect(() => {
    fetchTrailers('now_playing')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      className="trailers"
      style={{
        background: `linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0.8) 100%), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="trailers__wrapper">
        <h2>{t('components.HomeTrailers.tab.title')}</h2>

        <div className="trailers__tab">
          <h3 className={calcTabActiveClass(trailerState, t('components.HomeTrailers.tab.streaming.value')).active ? 'active' : ''} onClick={() => fetchTrailers(t('components.HomeTrailers.tab.streaming.value'))}>
            {t('components.HomeTrailers.tab.streaming.label')}
          </h3>
          <h3 className={calcTabActiveClass(trailerState, t('components.HomeTrailers.tab.onTv.value')).active ? 'active' : ''} onClick={() => fetchTrailers(t('components.HomeTrailers.tab.onTv.value'))}>
            {t('components.HomeTrailers.tab.onTv.label')}
          </h3>
          <h3 className={calcTabActiveClass(trailerState, t('components.HomeTrailers.tab.forRent.value')).active ? 'active' : ''} onClick={() => fetchTrailers(t('components.HomeTrailers.tab.forRent.value'))}>
            {t('components.HomeTrailers.tab.forRent.label')}
          </h3>
          <h3 className={calcTabActiveClass(trailerState, t('components.HomeTrailers.tab.inTheaters.value')).active ? 'active' : ''} onClick={() => fetchTrailers(t('components.HomeTrailers.tab.inTheaters.value'))}>
            {t('components.HomeTrailers.tab.inTheaters.label')}
          </h3>
        </div>

        <VueMultiselect
          value={selectOptions.find((o) => o.value === variant.value) ?? selectOptions[0]}
          options={selectOptions}
          label="label"
          trackBy="value"
          onSelect={(opt) => fetchTrailers(opt.value)}
        />
      </div>

      <div className="video">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          mousewheel={{ forceToAxis: true }}
          modules={[Mousewheel, FreeMode]}
          breakpoints={swiperBreakpoints}
        >
          {trailerMovies.data.map((movie) => (
            <SwiperSlide key={movie.id} onMouseOver={() => changeSectionBackground(movie.backdrop_path)}>
              <div className="image" onClick={() => handleToggleModal(movie.id)}>
                <img src={moviePoster(movie.poster_path)} alt={movie.title} />
                <svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 0 384 512">
                  <path
                    d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <h3>{movie.title}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isModalOpen ? <Modal movie={trailerMovies.url} onToggleModal={() => handleToggleModal()} /> : null}
    </section>
  )
}

