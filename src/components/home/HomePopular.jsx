import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, FreeMode } from 'swiper/modules'

import { applyLocale } from '../../lib/locale.js'
import { calcTabActiveClass } from '../../lib/helpers.js'
import { useMoviesStore } from '../../stores/useMoviesStore.js'
import ItemCard from '../ItemCard.jsx'
import VueMultiselect from '../VueMultiselect.jsx'

export default function HomePopular() {
  const { t } = useTranslation()

  const fetchPopularMovies = useMoviesStore((s) => s.fetchPopularMovies)
  const popularMoviesStore = useMoviesStore((s) => s.popularMovies)

  const [variant, setVariant] = useState({ label: t('components.HomePopular.tab.streaming.label'), value: '' })

  const popularMovies = useMemo(() => ({ data: popularMoviesStore, variant }), [popularMoviesStore, variant])

  const selectOptions = useMemo(
    () => [
      { label: t('components.HomePopular.tab.streaming.label'), value: t('components.HomePopular.tab.streaming.value') },
      { label: t('components.HomePopular.tab.onTv.label'), value: t('components.HomePopular.tab.onTv.value') },
      { label: t('components.HomePopular.tab.forRent.label'), value: t('components.HomePopular.tab.forRent.value') },
      { label: t('components.HomePopular.tab.inTheaters.label'), value: t('components.HomePopular.tab.inTheaters.value') },
    ],
    [t],
  )

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

  const fetchPopular = async (argDay) => {
    setVariant((v) => ({ ...v, value: argDay }))
    await fetchPopularMovies(argDay)
  }

  useEffect(() => {
    fetchPopular('now_playing')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="popular container">
      <div className="popular__wrapper">
        <h2>{t('components.HomePopular.tab.title')}</h2>

        <div className="popular__tab">
          <h3 className={calcTabActiveClass(popularMovies, t('components.HomePopular.tab.streaming.value')).active ? 'active' : ''} onClick={() => fetchPopular(t('components.HomeTrailers.tab.streaming.value'))}>
            {t('components.HomePopular.tab.streaming.label')}
          </h3>
          <h3 className={calcTabActiveClass(popularMovies, t('components.HomePopular.tab.onTv.value')).active ? 'active' : ''} onClick={() => fetchPopular(t('components.HomeTrailers.tab.onTv.value'))}>
            {t('components.HomePopular.tab.onTv.label')}
          </h3>
          <h3 className={calcTabActiveClass(popularMovies, t('components.HomePopular.tab.forRent.value')).active ? 'active' : ''} onClick={() => fetchPopular(t('components.HomeTrailers.tab.forRent.value'))}>
            {t('components.HomePopular.tab.forRent.label')}
          </h3>
          <h3 className={calcTabActiveClass(popularMovies, t('components.HomePopular.tab.inTheaters.value')).active ? 'active' : ''} onClick={() => fetchPopular(t('components.HomeTrailers.tab.inTheaters.value'))}>
            {t('components.HomePopular.tab.inTheaters.label')}
          </h3>
        </div>

        <VueMultiselect
          value={selectOptions.find((o) => o.value === variant.value) ?? selectOptions[0]}
          options={selectOptions}
          label="label"
          trackBy="value"
          onSelect={(opt) => fetchPopular(opt.value)}
        />
      </div>

      <div>
        <Swiper
          slidesPerView={7}
          spaceBetween={20}
          freeMode={true}
          mousewheel={{ forceToAxis: true }}
          modules={[Mousewheel, FreeMode]}
          breakpoints={swiperBreakpoints}
        >
          {popularMoviesStore.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link to={applyLocale(`/${movie.media_type}/${movie.id}`)}>
                <ItemCard movie={movie} type="movie" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

