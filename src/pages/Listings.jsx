import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import SearchFilters from '../components/SearchFilters'
import { properties, propertyTypes } from '../data/properties'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatMoney } from '../utils/format'
import { filterProperties, sortProperties } from '../utils/filters'

function cleanNumber(value) {
  if (!value) return ''
  const number = Number(value)
  return Number.isFinite(number) && number >= 0 ? String(number) : ''
}

function readFilters(params) {
  const category = ['residential', 'commercial'].includes(params.get('category')) ? params.get('category') : ''
  let type = propertyTypes.some((item) => item.value === params.get('type')) ? params.get('type') : ''
  if (category && type) {
    const match = propertyTypes.find((item) => item.value === type)
    if (!match || match.group.toLowerCase() !== category) type = ''
  }
  const sort = params.get('sort')
  return {
    location: params.get('location') || '',
    type,
    category,
    minPrice: cleanNumber(params.get('min')),
    maxPrice: cleanNumber(params.get('max')),
    beds: ['1', '2', '3', '4', '5'].includes(params.get('beds')) ? params.get('beds') : '',
    sort: ['price-asc', 'price-desc', 'sqft'].includes(sort) ? sort : 'featured',
  }
}

export default function Listings({ mode }) {
  const sale = mode === 'sale'
  useDocumentTitle(sale ? 'Buy · Kittiwake' : 'Rent · Kittiwake')
  const [params, setParams] = useSearchParams()
  const filters = readFilters(params)

  function write(next) {
    const query = new URLSearchParams()
    const entries = {
      location: next.location,
      type: next.type,
      category: next.category,
      min: next.minPrice,
      max: next.maxPrice,
      beds: next.beds,
      sort: next.sort !== 'featured' ? next.sort : '',
    }
    Object.entries(entries).forEach(([key, value]) => {
      if (value) query.set(key, value)
    })
    setParams(query, { replace: true })
  }

  function update(partial) {
    const next = { ...filters, ...partial }
    if (Object.prototype.hasOwnProperty.call(partial, 'category')) {
      const match = propertyTypes.find((item) => item.value === next.type)
      if (match && next.category && match.group.toLowerCase() !== next.category) next.type = ''
    }
    write(next)
  }

  const results = sortProperties(
    filterProperties(properties, {
      listing: mode,
      location: filters.location,
      type: filters.type,
      category: filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      beds: filters.beds,
    }),
    filters.sort,
  )

  const chips = [
    filters.location.trim() ? { key: 'location', label: filters.location.trim() } : null,
    filters.category
      ? { key: 'category', label: filters.category === 'residential' ? 'Residential' : 'Commercial' }
      : null,
    filters.type ? { key: 'type', label: filters.type } : null,
    filters.beds ? { key: 'beds', label: `${filters.beds}+ bedrooms` } : null,
    filters.minPrice ? { key: 'minPrice', label: `Min ${formatMoney(Number(filters.minPrice))}` } : null,
    filters.maxPrice ? { key: 'maxPrice', label: `Max ${formatMoney(Number(filters.maxPrice))}` } : null,
  ].filter(Boolean)

  return (
    <>
      <PageHeader
        eyebrow={sale ? 'Buy' : 'Rent'}
        title={sale ? 'Places for sale' : 'Places for rent'}
        text="Residential and commercial listings. Filter by location, price, property type, and bedrooms."
      />
      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-5 py-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:px-8 lg:py-14">
        <SearchFilters
          key={mode}
          mode={mode}
          filters={filters}
          resultCount={results.length}
          onChange={update}
          onClear={() => write({ ...filters, location: '', type: '', category: '', minPrice: '', maxPrice: '', beds: '' })}
        />

        <div>
          <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="text-sm text-ink-soft">
              {results.length} {results.length === 1 ? 'property' : 'properties'}
            </p>
            <label className="field sm:w-56">
              Sort
              <select
                className="control control-sm"
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value })}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
                <option value="sqft">Largest</option>
              </select>
            </label>
          </div>

          {chips.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  className="chip"
                  onClick={() => update({ [chip.key]: '' })}
                >
                  {chip.label} <span aria-hidden="true">×</span>
                  <span className="sr-only">Remove {chip.label}</span>
                </button>
              ))}
            </div>
          ) : null}

          {results.length ? (
            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-line bg-cream px-6 py-12">
              <h2 className="font-serif text-3xl">Nothing matches these filters.</h2>
              <p className="mt-3 max-w-md text-ink-soft">
                Widen the price, clear the bedroom count, or look at {sale ? 'rentals' : 'homes for sale'}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn"
                  onClick={() => write({ ...filters, location: '', type: '', category: '', minPrice: '', maxPrice: '', beds: '' })}
                >
                  Clear filters
                </button>
                <Link to={sale ? '/rent' : '/buy'} className="btn btn-line">
                  {sale ? 'Browse rentals' : 'Browse for sale'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
