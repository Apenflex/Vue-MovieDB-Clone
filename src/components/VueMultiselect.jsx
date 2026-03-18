import React, { useEffect, useMemo, useRef, useState } from 'react'

// Minimal single-select clone styled by existing `multiselect.scss`.
export default function VueMultiselect({ value, options = [], label = 'label', trackBy = 'value', onSelect }) {
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)

  const selected = value

  const selectedLabel = useMemo(() => {
    if (!selected) return ''
    return selected[label] ?? ''
  }, [label, selected])

  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const handlePick = (opt) => {
    onSelect?.(opt)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`multiselect ${open ? 'multiselect--active' : ''}`}>
      <div className="multiselect__tags" onClick={() => setOpen((v) => !v)}>
        <span className="multiselect__single">{selectedLabel}</span>
      </div>
      <div className="multiselect__select" onClick={() => setOpen((v) => !v)} />

      {open ? (
        <div className="multiselect__content-wrapper">
          <ul className="multiselect__content">
            {options.map((opt) => {
              const key = opt[trackBy] ?? opt[label]
              const isSelected = selected && (selected[trackBy] ?? selected[label]) === (opt[trackBy] ?? opt[label])
              return (
                <li key={key} className="multiselect__element">
                  <span
                    className={`multiselect__option ${isSelected ? 'multiselect__option--selected' : ''}`}
                    onClick={() => handlePick(opt)}
                  >
                    {opt[label]}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

