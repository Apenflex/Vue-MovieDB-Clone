import React, { useEffect, useMemo } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import i18n from './i18n/i18n.js'
import { defaultLocale, supportedLocales } from './i18n/i18n.js'
import { getLocaleFromPathname, stripLocalePrefix } from './lib/locale.js'

import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import FavouritePage from './pages/FavouritePage.jsx'
import MoviesPage from './pages/MoviesPage.jsx'
import TvShowsPage from './pages/TvShowsPage.jsx'
import FilmsDescPage from './pages/FilmsDescPage.jsx'
import PersonsPage from './pages/PersonsPage.jsx'
import PersonDescPage from './pages/PersonDescPage.jsx'

function RoutesWithOptionalLocale() {
  // We “normalize” the location by stripping locale prefix, but keep the URL as-is.
  const location = useLocation()
  const locale = useMemo(() => getLocaleFromPathname(location.pathname), [location.pathname])
  const normalizedPathname = useMemo(() => stripLocalePrefix(location.pathname), [location.pathname])

  // Keep i18n language in sync with URL.
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale)
  }, [locale])

  // Basic scroll behavior similar to vue-router config.
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.search, location.hash])

  return (
    <Routes location={{ ...location, pathname: normalizedPathname }}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/favourite"
          element={
            <ProtectedRoute>
              <FavouritePage />
            </ProtectedRoute>
          }
        />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv" element={<TvShowsPage />} />
        <Route path="/:mediaType/:id" element={<FilmsDescPage />} />
        <Route
          path="/persons"
          element={
            <ProtectedRoute>
              <PersonsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/persons/:params"
          element={
            <ProtectedRoute>
              <PersonDescPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <>
      <RoutesWithOptionalLocale />
      <ToastContainer position="top-center" autoClose={2800} closeOnClick pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  )
}

