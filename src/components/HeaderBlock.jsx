import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { defaultLocale } from '../i18n/i18n.js'
import { applyLocale, getLocaleFromPathname, stripLocalePrefix } from '../lib/locale.js'
import { useUserStore } from '../stores/useUserStore.js'
import IconHeart from './icons/IconHeart.jsx'
import AuthButton from './auth/AuthButton.jsx'

export default function HeaderBlock() {
  const { t } = useTranslation()
  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const lastYRef = useRef(0)

  const isUserLogged = useUserStore((s) => s.isUserLogged)

  const toggleMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false)
  }

  // Block body scroll when mobile menu open (parity with Vue watch).
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Header hide/show on scroll (parity with Vue useWindowScroll+watch).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY ?? window.pageYOffset ?? 0
      const lastY = lastYRef.current
      const headerEl = headerRef.current
      if (!headerEl) return

      if (y > 60 && y > lastY) headerEl.classList.remove('header--show')
      else headerEl.classList.add('header--show')

      lastYRef.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const locales = useMemo(
    () => [
      { label: 'Укр', value: 'ua' },
      { label: 'Eng', value: 'en' },
    ],
    [],
  )

  const localeFromUrl = getLocaleFromPathname(location.pathname)
  const currentLocaleValue = ['ua', 'en'].includes(localeFromUrl) ? localeFromUrl : defaultLocale

  const changeLocale = (newLocaleValue) => {
    if (newLocaleValue === currentLocaleValue) return
    const normalized = stripLocalePrefix(location.pathname) + location.search + location.hash
    const path = normalized === '' ? '/' : normalized
    const nextPath = applyLocale(path, newLocaleValue)
    window.location.assign(nextPath)
  }

  return (
    <header ref={headerRef} className="header header--show">
      <div className="container">
        <div className="header__wrapper">
          <div className={`header__logo ${isMenuOpen ? 'header__logo--mobile' : ''}`} onClick={() => (isMenuOpen ? setIsMenuOpen(false) : null)}>
            <Link to={applyLocale('/')}>
              <img src="/images/movie_logo.svg" alt="logo" />
            </Link>
          </div>

          <nav className={`header__nav ${isMenuOpen ? 'menu-active' : ''}`}>
            <select
              value={currentLocaleValue}
              onChange={(e) => changeLocale(e.target.value)}
              style={{ marginRight: 12 }}
            >
              {locales.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>

            {isUserLogged ? (
              <Link to={applyLocale('/favourite')} onClick={toggleMenu} className="header__nav-item">
                <IconHeart />
              </Link>
            ) : null}

            <Link to={applyLocale('/movies')} onClick={toggleMenu} className="header__nav-item">
              {t('components.HeaderBlock.movies')}
            </Link>
            <Link to={applyLocale('/tv')} onClick={toggleMenu} className="header__nav-item">
              {t('components.HeaderBlock.tvshows')}
            </Link>
            <Link to={applyLocale('/persons?page=1')} onClick={toggleMenu} className="header__nav-item">
              {t('components.HeaderBlock.persons')}
            </Link>
            <AuthButton onToggleMenu={toggleMenu} />
          </nav>

          <div className={`hamburger hamburger--spring ${isMenuOpen ? 'is-active' : ''}`} onClick={() => setIsMenuOpen((v) => !v)}>
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

