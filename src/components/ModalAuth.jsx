import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

import { useUserStore } from '../stores/useUserStore.js'

export default function ModalAuth() {
  const showAuthModal = useUserStore((s) => s.showAuthModal)
  const closeAuthModal = useUserStore((s) => s.closeAuthModal)

  const [isRegisterForm, setIsRegisterForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useMemo(() => getAuth(), [])

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      toast.success('Succesfully registered')
      closeAuthModal()
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('Email already in use')
          break
        case 'auth/invalid-email':
          toast.error('Invalid email')
          break
        case 'auth/weak-password':
          toast.error('Weak password, must be at least 6 characters')
          break
        default:
          toast.error('Email or password was incorrect')
      }
    }
  }

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      toast.success('Succesfully signed in')
      closeAuthModal()
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error('Invalid email')
          break
        case 'auth/missing-password':
          toast.error('Missing password')
          break
        case 'auth/user-not-found':
          toast.error('User not found')
          break
        case 'auth/wrong-password':
          toast.error('Wrong password')
          break
        default:
          toast.error('Email or password was incorrect')
      }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(getAuth(), provider)
      toast.success('Succesfully signed in with Google')
      closeAuthModal()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  if (!showAuthModal) return null

  return (
    <div className="modal-overlay">
      <div className="auth__modal">
        <button onClick={closeAuthModal} className="auth__modal-close">
          X
        </button>
        <form className="auth__modal-form">
          <h2>{isRegisterForm ? 'Sign up' : 'Sign in'}</h2>

          <input type="email" placeholder="Your email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {!isRegisterForm ? (
            <button className="btn" onClick={(e) => (e.preventDefault(), signIn())}>
              Sign in
            </button>
          ) : (
            <button className="btn" onClick={(e) => (e.preventDefault(), register())}>
              Sign up
            </button>
          )}

          <button className="btn" onClick={(e) => (e.preventDefault(), signInWithGoogle())}>
            Sign in with Google
          </button>

          <p>
            {!isRegisterForm ? <span>Don't have an account?</span> : <span>Already have an account?</span>}
            <button className="switch" onClick={(e) => (e.preventDefault(), setIsRegisterForm((v) => !v))}>
              {!isRegisterForm ? <span>Sign up</span> : <span>Sign in</span>}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

