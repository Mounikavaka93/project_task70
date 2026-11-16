import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import { formatPrice } from '../utils/format'
import { HeartIcon } from './Icons'
import Photo from './Photo'

export default function PropertyCard({ property, featured = false }) {
  const { has, toggle } = useFavorites()
  const saved = has(property.id)
  const [pulse, setPulse] = useState(false)
  const specs = []
  if (property.beds) specs.push(`${property.beds} bd`)
  if (property.baths) specs.push(`${property.baths} ba`)
  specs.push(`${property.sqft.toLocaleString('en-US')} sq ft`)

  return (
    <article className="group relative">
      <Link to={`/property/${property.id}`} className="block focus-visible:outline-offset-4">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Photo
            id={property.images[0]}
            alt=""
            width={featured ? 1600 : 1000}
            eager
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span className="bg-cream/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
              {property.listing === 'sale' ? 'For sale' : 'For rent'}
            </span>
            {property.badge ? (
              <span className="bg-clay px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream">
                {property.badge}
              </span>
            ) : null}
          </div>
          <p className="absolute bottom-3 left-3 font-serif text-2xl tabular-nums text-cream drop-shadow-sm">
            {formatPrice(property)}
          </p>
        </div>
        <div className="pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-moss">{property.type}</p>
          <h3 className="mt-1 font-serif text-2xl leading-tight transition-colors duration-200 group-hover:text-clay">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{property.location}</p>
          <p className="mt-3 text-sm text-moss">{specs.join('  ·  ')}</p>
          {featured && property.summary ? <p className="mt-3 max-w-xl text-ink-soft">{property.summary}</p> : null}
        </div>
      </Link>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? `Remove ${property.title} from saved` : `Save ${property.title}`}
        onClick={() => {
          toggle(property.id)
          setPulse(true)
        }}
        className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center bg-cream/95 transition hover:bg-white"
      >
        <HeartIcon filled={saved} pulse={pulse} onDone={() => setPulse(false)} />
      </button>
    </article>
  )
}
