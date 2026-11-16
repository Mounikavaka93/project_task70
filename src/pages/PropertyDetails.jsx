import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Gallery from '../components/Gallery'
import { HeartIcon, MailIcon, PhoneIcon } from '../components/Icons'
import InquiryForm from '../components/InquiryForm'
import Photo from '../components/Photo'
import PropertyCard from '../components/PropertyCard'
import { getAgent, getProperty, relatedProperties } from '../data/properties'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFavorites } from '../hooks/useFavorites'
import { formatMoney, formatPrice, telHref } from '../utils/format'

export default function PropertyDetails() {
  const { id } = useParams()
  const property = getProperty(id)
  useDocumentTitle(property ? `${property.title} · Kittiwake` : 'Listing unavailable · Kittiwake')

  if (!property) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">Listings</p>
        <h1 className="mt-3 font-serif text-5xl">This listing is no longer on the board.</h1>
        <Link to="/buy" className="btn mt-8">
          Browse properties
        </Link>
      </div>
    )
  }

  return <PropertyView property={property} />
}

function PropertyView({ property }) {
  const agent = getAgent(property.agent)
  const related = relatedProperties(property)
  const { has, toggle } = useFavorites()
  const saved = has(property.id)
  const [pulse, setPulse] = useState(false)
  const listingPath = property.listing === 'sale' ? '/buy' : '/rent'
  const listingLabel = property.listing === 'sale' ? 'For sale' : 'For rent'
  const perFoot = formatMoney(Math.round(property.price / property.sqft))

  const stats = [
    property.beds ? ['Bedrooms', String(property.beds)] : null,
    property.baths ? ['Bathrooms', String(property.baths)] : null,
    ['Interior', `${property.sqft.toLocaleString('en-US')} sq ft`],
    ['Price / sq ft', property.listing === 'rent' ? `${perFoot}/mo` : perFoot],
  ].filter(Boolean)

  return (
    <article className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      <nav className="text-sm text-moss" aria-label="Breadcrumb">
        <Link to={listingPath} className="underline underline-offset-4 hover:text-ink">
          {property.listing === 'sale' ? 'Buy' : 'Rent'}
        </Link>
        <span aria-hidden="true"> / </span>
        <Link to={`${listingPath}?location=${encodeURIComponent(property.city)}`} className="underline underline-offset-4 hover:text-ink">
          {property.city}
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{property.title}</span>
      </nav>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            {property.type} · {property.category}
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{property.title}</h1>
          <p className="mt-2 text-ink-soft">
            {property.address}, {property.location}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="font-serif text-4xl tabular-nums">{formatPrice(property)}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-moss">{listingLabel}</p>
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => {
              toggle(property.id)
              setPulse(true)
            }}
            className="mt-3 inline-flex items-center gap-2 text-sm"
          >
            <HeartIcon filled={saved} pulse={pulse} onDone={() => setPulse(false)} />
            {saved ? 'Saved' : 'Save this property'}
          </button>
        </div>
      </div>

      <Gallery key={property.id} images={property.images} title={property.title} />

      <dl className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="bg-cream px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">{label}</dt>
            <dd className="mt-1 font-serif text-2xl">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <h2 className="font-serif text-3xl">The property</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">{property.description}</p>

          <h2 className="mt-12 font-serif text-3xl">Amenities</h2>
          <ul className="mt-4 grid gap-0 sm:grid-cols-2">
            {property.amenities.map((item) => (
              <li key={item} className="flex gap-3 border-t border-line py-3 text-sm">
                <span className="mt-1.5 h-2 w-2 shrink-0 bg-clay" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-serif text-3xl">Details</h2>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {property.facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[12rem_1fr]">
                <dt className="text-moss">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="border border-line bg-cream p-5 lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">Your advisor</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden bg-sand">
              <Photo id={agent.image} alt={agent.name} width={240} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-2xl">{agent.name}</h2>
              <p className="text-sm text-moss">{agent.role}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{agent.bio}</p>
          <div className="mt-4 space-y-2 text-sm">
            <a className="flex items-center gap-2 hover:text-clay" href={telHref(agent.phone)}>
              <PhoneIcon /> {agent.phone}
            </a>
            <a className="flex items-center gap-2 hover:text-clay" href={`mailto:${agent.email}`}>
              <MailIcon /> {agent.email}
            </a>
          </div>
          <div className="mt-6 border-t border-line pt-6">
            <h3 className="font-serif text-2xl">Request a visit</h3>
            <div className="mt-4">
              <InquiryForm
                key={property.id}
                idPrefix={`visit-${property.id}`}
                submitLabel="Request a visit"
                phone={agent.phone}
                subject={property.title}
                defaultMessage={`I'm interested in ${property.title} and would like to arrange a visit.`}
              />
            </div>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-serif text-4xl">You may also want to see</h2>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
