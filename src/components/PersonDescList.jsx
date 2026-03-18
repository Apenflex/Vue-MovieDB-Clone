import React from 'react'
import { Link } from 'react-router-dom'

import { applyLocale } from '../lib/locale.js'

function getYear(dateString) {
  if (!dateString) return '...'
  return dateString.slice(0, 4)
}

export default function PersonDescList({ getPersonData = [], title = '' }) {
  if (!getPersonData.length) return null

  return (
    <div>
      <h3>{title}</h3>
      <div className="list">
        {getPersonData.map((movie) => (
          <div key={movie.credit_id}>
            <span className="year">{getYear(movie.release_date || movie.first_air_date)}</span>
            <span className="separator">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
              </svg>
            </span>
            <div>
              <Link to={applyLocale(`/${movie.episode_count ? 'tv' : 'movie'}/${movie.id}`)}>
                {movie.original_title || movie.original_name}
              </Link>
              <span> ... {movie.job || movie.character} </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

