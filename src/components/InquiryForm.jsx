import { useState } from 'react'
import { brand } from '../data/site'
import { telHref } from '../utils/format'
import { hasErrors, validateContact } from '../utils/validate'
import Field from './Field'

const empty = { name: '', email: '', phone: '', message: '', interest: '' }

export default function InquiryForm({
  idPrefix = 'contact',
  submitLabel = 'Send message',
  defaultMessage = '',
  phone = brand.phone,
  subject = '',
  showInterest = false,
}) {
  const [values, setValues] = useState({ ...empty, message: defaultMessage })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (!hasErrors(nextErrors)) setSent(true)
  }

  if (sent) {
    const firstName = values.name.trim().split(' ')[0]
    return (
      <div className="border border-line bg-blush p-6" role="status">
        <h3 className="font-serif text-3xl">Thank you, {firstName}.</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {subject ? `Your note about ${subject} stays in this browser. ` : 'Your note stays in this browser. '}
          This demonstration does not send the form to a server. Call{' '}
          <a className="underline underline-offset-4" href={telHref(phone)}>
            {phone}
          </a>{' '}
          and the desk will pick it up from there.
        </p>
        <button
          type="button"
          className="btn mt-6"
          onClick={() => {
            setSent(false)
            setValues({ ...empty, message: defaultMessage })
          }}
        >
          Write another note
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field id={`${idPrefix}-name`} label="Name" error={errors.name}>
        <input className="control" name="name" autoComplete="name" value={values.name} onChange={update} required />
      </Field>
      <Field id={`${idPrefix}-email`} label="Email" error={errors.email}>
        <input
          className="control"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update}
          required
        />
      </Field>
      <Field id={`${idPrefix}-phone`} label="Phone number" error={errors.phone}>
        <input
          className="control"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={update}
          required
        />
      </Field>
      {showInterest ? (
        <Field id={`${idPrefix}-interest`} label="Interest, optional">
          <select className="control" name="interest" value={values.interest} onChange={update}>
            <option value="">Select one</option>
            <option>Buying</option>
            <option>Renting</option>
            <option>Selling</option>
            <option>Commercial</option>
            <option>Something else</option>
          </select>
        </Field>
      ) : null}
      <Field id={`${idPrefix}-message`} label="Message" error={errors.message}>
        <textarea className="control" name="message" value={values.message} onChange={update} required />
      </Field>
      <button type="submit" className="btn w-full sm:w-auto">
        {submitLabel}
      </button>
    </form>
  )
}
