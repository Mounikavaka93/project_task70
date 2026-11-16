import { useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/Field'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import { properties, propertyTypes } from '../data/properties'
import { brand, sellSteps } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { telHref } from '../utils/format'
import { hasErrors, validateContact } from '../utils/validate'

const initial = {
  name: '',
  email: '',
  phone: '',
  address: '',
  type: '',
  timeline: '',
  message: '',
}

export default function Sell() {
  useDocumentTitle('Sell · Kittiwake')
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const onMarket = properties.filter((property) => property.listing === 'sale').slice(0, 3)

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const next = {
      ...validateContact(values),
    }
    if (!values.address.trim()) next.address = 'Enter the property address.'
    if (!values.type) next.type = 'Choose a property type.'
    if (!values.timeline) next.timeline = 'Choose a timeline.'
    setErrors(next)
    if (!hasErrors(next)) setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Sell"
        title="A sale run with patience and a sharp price."
        text="We walk the property before we talk numbers, then stay through the closing. Fees are discussed before anything is signed."
      />

      <section className="mx-auto grid w-full max-w-7xl items-start gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
        <div>
          <ol className="space-y-8">
            {sellSteps.map((step) => (
              <li key={step.n} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-serif text-3xl text-clay">{step.n}</span>
                <div>
                  <h2 className="font-serif text-2xl">{step.title}</h2>
                  <p className="mt-2 text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-moss">
            Prefer to talk first? Call{' '}
            <a className="text-ink underline underline-offset-4" href={telHref(brand.phone)}>
              {brand.phone}
            </a>
            .
          </p>
        </div>

        <div className="border border-line bg-cream p-5 sm:p-6">
          <h2 className="font-serif text-3xl">Ask for a pricing visit</h2>
          {sent ? (
            <div className="mt-5 border border-line bg-blush p-5" role="status">
              <h3 className="font-serif text-2xl">Thank you, {values.name.trim().split(' ')[0]}.</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                This demonstration keeps your request in the browser and does not send it to a server. Call the desk
                when you want the conversation to start for real.
              </p>
              <button
                type="button"
                className="btn mt-5"
                onClick={() => {
                  setSent(false)
                  setValues(initial)
                }}
              >
                Start over
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
              <Field id="sell-name" label="Name" error={errors.name}>
                <input className="control" name="name" autoComplete="name" value={values.name} onChange={update} required />
              </Field>
              <Field id="sell-email" label="Email" error={errors.email}>
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
              <Field id="sell-phone" label="Phone number" error={errors.phone}>
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
              <Field id="sell-address" label="Property address" error={errors.address}>
                <input className="control" name="address" value={values.address} onChange={update} required />
              </Field>
              <Field id="sell-type" label="Property type" error={errors.type}>
                <select className="control" name="type" value={values.type} onChange={update} required>
                  <option value="">Select a type</option>
                  {propertyTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="sell-timeline" label="Timeline" error={errors.timeline}>
                <select className="control" name="timeline" value={values.timeline} onChange={update} required>
                  <option value="">When are you thinking?</option>
                  <option>Ready now</option>
                  <option>One to three months</option>
                  <option>Later this year</option>
                  <option>Just researching</option>
                </select>
              </Field>
              <Field id="sell-message" label="Message" error={errors.message}>
                <textarea
                  className="control"
                  name="message"
                  value={values.message}
                  onChange={update}
                  placeholder="What should we know before we visit?"
                  required
                />
              </Field>
              <button type="submit" className="btn w-full">
                Request a visit
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-4xl">On the market now</h2>
            <Link to="/buy" className="text-sm font-semibold uppercase tracking-[0.16em] underline underline-offset-4">
              All for sale
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {onMarket.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
