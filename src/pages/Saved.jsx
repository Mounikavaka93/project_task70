import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import { getSavedProperties } from '../data/properties'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFavorites } from '../hooks/useFavorites'

export default function Saved() {
  useDocumentTitle('Saved · Kittiwake')
  const { ids } = useFavorites()
  const saved = getSavedProperties(ids)

  return (
    <>
      <PageHeader
        eyebrow="Saved"
        title="Properties you marked."
        text="Saved homes stay in this browser. They are not an account, and they are not sent anywhere."
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-12 lg:px-8">
        {saved.length ? (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="border border-line bg-cream px-6 py-14">
            <h2 className="font-serif text-3xl">Nothing saved yet.</h2>
            <p className="mt-3 max-w-md text-ink-soft">Tap the heart on a listing and it will wait for you here.</p>
            <Link to="/buy" className="btn mt-6">
              Browse properties
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
