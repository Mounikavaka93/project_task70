import { Link } from 'react-router-dom'
import HeroSearch from '../components/HeroSearch'
import Photo from '../components/Photo'
import PropertyCard from '../components/PropertyCard'
import { citySpots, properties } from '../data/properties'
import { methodSteps, quote } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const featuredOrder = ['marlowe-house', 'glassline-villa', 'baylight-penthouse', 'sunset-court', 'ledger-building']

export default function Home() {
  useDocumentTitle('Kittiwake · Homes with a point of view')
  const featured = featuredOrder.map((id) => properties.find((property) => property.id === id)).filter(Boolean)
  const commercial = properties.filter((property) => property.category === 'commercial').slice(0, 2)
  const spots = citySpots()

  return (
    <>
      <section className="bg-paper">
        <div className="relative min-h-[28rem] bg-ink sm:min-h-[32rem] lg:min-h-[36rem]">
          <div className="absolute inset-0 overflow-hidden">
            <Photo
              id="photo-1600596542815-ffad4c1539a9"
              alt="The Marlowe House at dusk, a modern home with warm light in the windows"
              width={2000}
              eager
              className="hero-drift h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          </div>
          <div className="relative mx-auto flex min-h-[28rem] w-full max-w-7xl flex-col justify-end px-5 py-10 sm:min-h-[32rem] lg:min-h-[36rem] lg:px-8 lg:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Kittiwake · Est. 1998</p>
            <h1 className="mt-3 max-w-full font-serif text-4xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
              Homes with a point of view.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-cream/85">
              Residential and commercial properties chosen for light, location, and the way a day actually unfolds inside them.
            </p>
            <Link
              to="/property/marlowe-house"
              className="mt-4 inline-flex w-fit text-sm text-cream underline decoration-gold underline-offset-4 transition hover:text-gold"
            >
              Now showing · The Marlowe House, Pacific Heights
            </Link>
          </div>
        </div>
        <div className="relative z-10 mx-auto -mt-8 w-full max-w-7xl px-5 lg:-mt-12 lg:px-8">
          <HeroSearch />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">Selected</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Featured properties</h2>
          </div>
          <Link to="/buy" className="text-sm font-semibold uppercase tracking-[0.16em] underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="mt-10 grid items-start gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">Cities</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Where we are walking this month</h2>
          </div>
          <div className="mt-8 flex snap-x scroll-smooth gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {spots.map((spot) => (
              <article key={spot.city} className="group min-w-[78%] snap-start sm:min-w-[46%] lg:min-w-0">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Photo
                    id={spot.image}
                    alt=""
                    width={900}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                    <h3 className="font-serif text-3xl">{spot.city}</h3>
                    <div className="mt-3 flex gap-4 text-xs font-semibold uppercase tracking-[0.16em]">
                      {spot.sales > 0 ? (
                        <Link className="underline underline-offset-4 hover:text-gold" to={`/buy?location=${encodeURIComponent(spot.city)}`}>
                          Buy {spot.sales}
                        </Link>
                      ) : null}
                      {spot.rents > 0 ? (
                        <Link className="underline underline-offset-4 hover:text-gold" to={`/rent?location=${encodeURIComponent(spot.city)}`}>
                          Rent {spot.rents}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl items-stretch gap-6 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between bg-forest p-8 text-cream lg:col-span-4 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Commercial</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight">Buildings for work, not just weekends.</h2>
            <p className="mt-4 text-cream/75">
              Offices, shops, and warehouses, priced and walked with the same attention we give a house.
            </p>
          </div>
          <Link to="/buy?category=commercial" className="btn btn-light mt-8 w-fit">
            View commercial
          </Link>
        </div>
        <div className="grid items-start gap-8 sm:grid-cols-2 lg:col-span-8">
          {commercial.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="bg-forest text-cream">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 lg:px-8 lg:py-20">
          {methodSteps.map((step) => (
            <article key={step.n}>
              <p className="font-serif text-4xl text-gold">{step.n}</p>
              <h2 className="mt-3 font-serif text-3xl">{step.title}</h2>
              <p className="mt-3 text-cream/75">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-5 py-16 text-center lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">From the desk</p>
        <blockquote className="mt-6 font-serif text-3xl leading-snug sm:text-4xl">“{quote.text}”</blockquote>
        <p className="mt-6 text-sm uppercase tracking-[0.16em] text-moss">
          {quote.name} · {quote.detail}
        </p>
      </section>

      <section className="px-5 pb-16 lg:px-8 lg:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 border border-line bg-cream px-6 py-10 md:flex-row md:items-center md:px-12">
          <div>
            <h2 className="font-serif text-4xl">Ready to sell, or still looking?</h2>
            <p className="mt-2 max-w-lg text-ink-soft">Talk with an advisor before you list a property or book a tour.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/sell" className="btn">
              Sell with us
            </Link>
            <Link to="/contact" className="btn btn-line">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
