import { cloneElement } from 'react'

export default function Field({ id, label, error, children }) {
  const describedBy = error ? `${id}-error` : undefined
  const control = cloneElement(children, {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  })

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {control}
      {error ? (
        <p id={describedBy} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
