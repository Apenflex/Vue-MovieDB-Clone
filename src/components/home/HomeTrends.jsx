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

export default function HomeTrends() {
  const { t } = useTranslation()
  const fetchTrandingMovies = useMoviesStore((s) => s.fetchTrandingMovies)
  const trandingMovies = useMoviesStore((s) => s.trandingMovies)

  const [variant, setVariant] = useState({ label: t('components.HomeTrends.tab.day.label'), value: '' })

  const activeMovies = useMemo(() => ({ data: trandingMovies, variant }), [trandingMovies, variant])

  const selectOptions = useMemo(
    () => [
      { label: t('components.HomeTrends.tab.day.label'), value: t('components.HomeTrends.tab.day.value') },
      { label: t('components.HomeTrends.tab.week.label'), value: t('components.HomeTrends.tab.week.value') },
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

  const fetchTrends = async (argDay) => {
    setVariant((v) => ({ ...v, value: argDay }))
    await fetchTrandingMovies(argDay)
  }

  useEffect(() => {
    fetchTrends('day')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="trend container">
      <div className="trend__wrapper">
        <h2>{t('components.HomeTrends.tab.title')}</h2>

        <div className="trend__tabs">
          <h3 className={calcTabActiveClass(activeMovies, t('components.HomeTrends.tab.day.value')).active ? 'active' : ''} onClick={() => fetchTrends('day')}>
            {t('components.HomeTrends.tab.day.label')}
          </h3>
          <h3 className={calcTabActiveClass(activeMovies, t('components.HomeTrends.tab.week.value')).active ? 'active' : ''} onClick={() => fetchTrends('week')}>
            {t('components.HomeTrends.tab.week.label')}
          </h3>
        </div>

        <VueMultiselect
          value={selectOptions.find((o) => o.value === variant.value) ?? selectOptions[0]}
          options={selectOptions}
          label="label"
          trackBy="value"
          onSelect={(opt) => fetchTrends(opt.value)}
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
          {trandingMovies.map((movie) => (
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

