import React from 'react'

export default function Modal({ movie, onToggleModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h3>{movie?.title}</h3>
          <button className="modal-close" onClick={() => onToggleModal?.()}>
            X
          </button>
        </div>
        <div className="modal__content">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${movie?.path}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={movie?.title || 'Trailer'}
          />
        </div>
      </div>
    </div>
  )
}

