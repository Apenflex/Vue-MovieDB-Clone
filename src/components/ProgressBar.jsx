import React from 'react'

import { useMoviesStore } from '../stores/useMoviesStore.js'

export default function ProgressBar() {
  const progress = useMoviesStore((s) => s.progress)

  const visible = progress.active || progress.value > 0
  const width = `${Math.min(100, Math.max(0, progress.value))}%`

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div
        style={{
          width,
          height: '100%',
          backgroundColor: '#00c58e',
          transition: 'width 0.2s linear',
        }}
      />
    </div>
  )
}

