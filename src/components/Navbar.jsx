import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { brand, navLinks } from '../data/site'
import { useFavorites } from '../hooks/useFavorites'
import { cx } from '../utils/cx'
import { HeartIcon } from './Icons'

export default function Navbar() {
  const { ids } = useFavorites()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)

  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cx(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled || open ? 'border-line bg-cream/95 backdrop-blur-md' : 'border-transparent bg-paper',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${brand.name} home`}>
          <span className="grid h-9 w-9 place-items-center border border-ink font-serif text-lg">{brand.name.slice(0, 1)}</span>
          <span className="font-serif text-xl tracking-wide whitespace-nowrap">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cx(
                  'relative text-sm tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-clay after:transition-all after:duration-300',
                  isActive ? 'text-clay after:w-full' : 'text-ink after:w-0 hover:after:w-full',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/saved"
            className="relative grid h-11 w-11 place-items-center border border-line bg-cream transition hover:border-ink"
            aria-label={`Saved homes, ${ids.length} saved`}
          >
            <HeartIcon filled={ids.length > 0} />
            {ids.length > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center bg-clay px-1 text-[10px] font-semibold text-cream">
                {ids.length}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="relative h-11 w-11 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={cx('absolute left-3 right-3 h-px bg-ink transition', open ? 'top-1/2 rotate-45' : 'top-4')} />
            <span className={cx('absolute left-3 right-3 h-px bg-ink transition', open ? 'top-1/2 -rotate-45' : 'top-7')} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cx('grid transition-[grid-template-rows] duration-300 lg:hidden', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
      >
        <div className="overflow-hidden">
          <nav className="border-t border-line bg-cream px-5 py-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cx('block border-b border-line py-3 text-lg', isActive ? 'text-clay' : 'text-ink')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/saved" className="block py-3 text-lg">
              Saved ({ids.length})
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
