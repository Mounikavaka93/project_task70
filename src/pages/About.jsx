import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import PageHeader from '../components/PageHeader'
import { agents } from '../data/properties'
import { services } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const team = Object.values(agents)

const figures = [
  ['1998', 'The year the desk opened on Montgomery Street'],
  ['4', 'Advisors, each with a city they actually walk'],
  ['2', 'Sides of the practice: homes and commercial'],
  ['By appointment', 'Tours are private unless an open house truly helps'],
]

export default function About() {
  useDocumentTitle('About Us · Kittiwake')

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A small desk with a long memory for rooms."
        text="Kittiwake advises people buying, renting, selling, and leasing. The list is short on purpose."
      />

      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="overflow-hidden bg-sand">
          <Photo
            id="photo-1497366811353-6870744d04b2"
            alt="A quiet office interior with a long table and daylight"
            width={1400}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">The practice</p>
          <h2 className="mt-3 font-serif text-4xl">Opened above a print shop. Still small on purpose.</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              Kittiwake opened in 1998 on Montgomery Street in San Francisco. The work is still the same shape: residential
              sales, leases, and a commercial desk that shares the office rather than living in another building.
            </p>
            <p>
              Four advisors cover the cities on this site. We do not publish a property until someone here has walked it.
              That keeps the board shorter than a portal, and it keeps the advice specific.
            </p>
            <p>
              If you are buying, we edit. If you are selling, we price from the rooms outward. If you need an office or a
              shop, the same people pick up the phone.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-forest text-cream">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {figures.map(([value, label]) => (
            <div key={label}>
              <p className="font-serif text-4xl text-gold">{value}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">Services</p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">What the desk actually does</h2>
        </div>
        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="bg-paper p-6 transition duration-300 hover:bg-cream">
              <h3 className="font-serif text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
          <h2 className="font-serif text-4xl sm:text-5xl">The advisors</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <article key={person.id} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-sand">
                  <Photo
                    id={person.image}
                    alt={person.name}
                    width={700}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-serif text-2xl">{person.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">{person.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{person.bio}</p>
              </article>
            ))}
          </div>
          <Link to="/contact" className="btn mt-12">
            Contact the desk
          </Link>
        </div>
      </section>
    </>
  )
}
