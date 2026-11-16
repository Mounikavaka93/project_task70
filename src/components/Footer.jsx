import { Link } from 'react-router-dom'
import { brand, navLinks, offices } from '../data/site'
import { telHref } from '../utils/format'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-serif text-3xl">{brand.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/75">
            Residential and commercial property, chosen with care and walked before it is recommended.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Visit</p>
          <ul className="mt-4 space-y-4 text-sm text-cream/80">
            {offices.map((office) => (
              <li key={office.city}>
                <p className="text-cream">{office.city}</p>
                {office.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Desk</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="transition hover:text-gold" href={telHref(brand.phone)}>
                {brand.phone}
              </a>
            </li>
            <li>
              <a className="transition hover:text-gold" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </li>
            {brand.hours.map((line) => (
              <li key={line} className="text-cream/75">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-5 text-xs leading-relaxed text-cream/60 sm:flex-row sm:justify-between lg:px-8">
          <p>© {year} {brand.name}</p>
          <p className="max-w-xl">
            {brand.name} is a fictional studio for this demonstration. People, listings, and addresses are not real.
            Forms stay in your browser.
          </p>
        </div>
      </div>
    </footer>
  )
}
