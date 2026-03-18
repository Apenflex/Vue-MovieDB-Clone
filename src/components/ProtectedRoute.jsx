import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'

import { applyLocale, getLocaleFromPathname } from '../lib/locale.js'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const user = getAuth().currentUser
  const locale = getLocaleFromPathname(location.pathname)

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to see this page')
    }
  }, [user])

  if (!user) {
    return <Navigate to={applyLocale('/', locale)} replace />
  }

  return children
}

