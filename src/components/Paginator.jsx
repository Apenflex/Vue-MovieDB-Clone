import React, { useMemo } from 'react'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export default function Paginator({ page, rows = 20, totalRecords = 0, onPage }) {
  const totalPages = Math.max(1, Math.ceil((totalRecords || 0) / rows))
  const currentPage = clamp(page || 1, 1, totalPages)

  const pageNumbers = useMemo(() => {
    // Simple window around current page.
    const windowSize = 5
    const half = Math.floor(windowSize / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, start + windowSize - 1)
    start = Math.max(1, end - windowSize + 1)
    const nums = []
    for (let i = start; i <= end; i++) nums.push(i)
    return nums
  }, [currentPage, totalPages])

  const goTo = (nextPage) => {
    const p = clamp(nextPage, 1, totalPages)
    onPage?.({ page: p - 1, first: (p - 1) * rows, rows })
  }

  const disabledFirstPrev = currentPage <= 1
  const disabledNextLast = currentPage >= totalPages

  return (
    <div className="p-paginator p-component">
      <button className={`p-paginator-first ${disabledFirstPrev ? 'p-disabled' : ''}`} disabled={disabledFirstPrev} onClick={() => goTo(1)}>
        {'<<'}
      </button>
      <button className={`p-paginator-prev ${disabledFirstPrev ? 'p-disabled' : ''}`} disabled={disabledFirstPrev} onClick={() => goTo(currentPage - 1)}>
        {'<'}
      </button>

      <span className="p-paginator-pages">
        {pageNumbers.map((n) => (
          <button
            key={n}
            className={`p-paginator-page ${n === currentPage ? 'p-highlight' : ''}`}
            onClick={() => goTo(n)}
          >
            {n}
          </button>
        ))}
      </span>

      <button className={`p-paginator-next ${disabledNextLast ? 'p-disabled' : ''}`} disabled={disabledNextLast} onClick={() => goTo(currentPage + 1)}>
        {'>'}
      </button>
      <button className={`p-paginator-last ${disabledNextLast ? 'p-disabled' : ''}`} disabled={disabledNextLast} onClick={() => goTo(totalPages)}>
        {'>>'}
      </button>
    </div>
  )
}

