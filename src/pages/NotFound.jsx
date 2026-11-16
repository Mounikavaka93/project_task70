import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found · Kittiwake')

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-24">
      <p className="font-serif text-7xl text-clay">404</p>
      <h1 className="mt-4 font-serif text-5xl">That page is not on the board.</h1>
      <p className="mt-4 text-ink-soft">The address may have changed. The listings are still here.</p>
      <Link to="/" className="btn mt-8">
        Back home
      </Link>
    </div>
  )
}
