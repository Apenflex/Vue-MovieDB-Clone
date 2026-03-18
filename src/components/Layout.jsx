import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import HeaderBlock from './HeaderBlock.jsx'
import FooterBlock from './FooterBlock.jsx'
import ModalAuth from './ModalAuth.jsx'
import ScrollUp from './ScrollUp.jsx'
import ProgressBar from './ProgressBar.jsx'
import { useUserStore } from '../stores/useUserStore.js'

import '../lib/firebase.js'

export default function Layout() {
  const setIsUserLogged = useUserStore((s) => s.setIsUserLogged)

  // Placeholder for Vue's router.beforeEach requiresAuth guard.
  // We will later mirror meta.requiresAuth per-route by wrapping protected routes.
  useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsUserLogged(!!user)
    })
    return () => unsub()
  }, [setIsUserLogged])

  // Keep similar structure: RouterView + progressbar + header/modal/scroll/footer.
  // Progress/modal/scroll will be ported after stores/components are in place.
  return (
    <>
      <ProgressBar />
      <Outlet />
      <HeaderBlock />
      <ModalAuth />
      <ScrollUp />
      <FooterBlock />
    </>
  )
}

