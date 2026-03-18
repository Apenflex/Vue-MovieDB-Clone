import React, { useMemo } from 'react'
import { toast } from 'react-toastify'
import { getAuth, signOut } from 'firebase/auth'

import { useUserStore } from '../../stores/useUserStore.js'

export default function AuthButton({ onToggleMenu }) {
  const isUserLogged = useUserStore((s) => s.isUserLogged)
  const openAuthModal = useUserStore((s) => s.openAuthModal)
  const setIsUserLogged = useUserStore((s) => s.setIsUserLogged)

  const name = useMemo(() => (isUserLogged ? 'Sign out' : 'Sign in/Sign up'), [isUserLogged])

  const handleAuth = async () => {
    if (isUserLogged) {
      try {
        const auth = getAuth()
        await signOut(auth)
        setIsUserLogged(false)
        toast.warning('You are logged out')
      } catch (error) {
        toast.error(error?.message ?? 'Failed to sign out')
      }
    } else {
      openAuthModal()
    }
    onToggleMenu?.()
  }

  return (
    <button className="authbtn" onClick={(e) => (e.preventDefault(), handleAuth())}>
      {name}
    </button>
  )
}

