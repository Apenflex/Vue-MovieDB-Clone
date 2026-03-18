import React from 'react'

export default function PrimeSkeleton({ width = '100%', height = '1rem', shape }) {
  const style = {
    width,
    height,
  }

  if (shape === 'circle') {
    style.borderRadius = '50%'
  }

  return <div className="p-skeleton p-component" style={style} />
}

