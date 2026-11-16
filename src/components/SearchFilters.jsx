import { useState } from 'react'
import { locationSuggestions, propertyTypes } from '../data/properties'
import { activeFilterCount } from '../utils/filters'
import { cx } from '../utils/cx'

const bedOptions = ['1', '2', '3', '4', '5']

const salePresets = [
  { label: 'Under $1.5M', min: '', max: '1500000' },
  { label: '$1.5–3.5M', min: '1500000', max: '3500000' },
  { label: '$3.5M+', min: '3500000', max: '' },
]

const rentPresets = [
  { label: 'Under $3.5k', min: '', max: '3500' },
  { label: '$3.5–6k', min: '3500', max: '6000' },
  { label: '$6k+', min: '6000', max: '' },
]

export default function SearchFilters({ mode, filters, resultCount, onChange, onClear }) {
  const [open, setOpen] = useState(false)
  const presets = mode === 'rent' ? rentPresets : salePresets
  const count = activeFilterCount(filters)
  const types = propertyTypes.filter((item) => !filters.category || item.group.toLowerCase() === filters.category)
  const priceNote =
    filters.minPrice && filters.maxPrice && Number(filters.minPrice) > Number(filters.maxPrice)
      ? 'The lower amount is used as the minimum.'
      : ''

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <button
        type="button"
        className="btn btn-line mb-4 w-full lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Hide filters' : `Filters${count ? ` (${count})` : ''}`}
      </button>

      <div className={cx('border border-line bg-cream p-5', open ? 'block' : 'hidden', 'lg:block')}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-serif text-2xl">Refine</h2>
          {count ? (
            <button type="button" onClick={onClear} className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
              Clear
            </button>
          ) : null}
        </div>

        <div className="mt-5 space-y-5">
          <label className="field">
            Location
            <input
              className="control"
              list="filter-locations"
              value={filters.location}
              onChange={(event) => onChange({ location: event.target.value })}
              placeholder="City or neighborhood"
            />
            <datalist id="filter-locations">
              {locationSuggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
          </label>

          <div>
            <p className="field">Category</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                ['', 'All'],
                ['residential', 'Residential'],
                ['commercial', 'Commercial'],
              ].map(([value, label]) => (
                <button
                  key={label}
                  type="button"
                  className="chip"
                  aria-pressed={(filters.category || '') === value}
                  onClick={() => onChange({ category: value })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            Property type
            <select className="control" value={filters.type} onChange={(event) => onChange({ type: event.target.value })}>
              <option value="">All types</option>
              {types.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </label>

          <div>
            <p className="field">Price range {mode === 'rent' ? '(per month)' : ''}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="field">
                <span className="sr-only">Minimum price</span>
                <input
                  className="control"
                  inputMode="numeric"
                  min="0"
                  type="number"
                  value={filters.minPrice}
                  placeholder="Min"
                  onChange={(event) => onChange({ minPrice: event.target.value })}
                />
              </label>
              <label className="field">
                <span className="sr-only">Maximum price</span>
                <input
                  className="control"
                  inputMode="numeric"
                  min="0"
                  type="number"
                  value={filters.maxPrice}
                  placeholder="Max"
                  onChange={(event) => onChange({ maxPrice: event.target.value })}
                />
              </label>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {presets.map((preset) => {
                const selected = filters.minPrice === preset.min && filters.maxPrice === preset.max
                return (
                  <button
                    key={preset.label}
                    type="button"
                    className="chip"
                    aria-pressed={selected}
                    onClick={() => onChange(selected ? { minPrice: '', maxPrice: '' } : { minPrice: preset.min, maxPrice: preset.max })}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
            {priceNote ? <p className="mt-2 text-sm normal-case tracking-normal text-ink-soft">{priceNote}</p> : null}
          </div>

          <div>
            <p className="field">Bedrooms</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="chip"
                aria-pressed={!filters.beds}
                onClick={() => onChange({ beds: '' })}
              >
                Any
              </button>
              {bedOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="chip"
                  aria-pressed={filters.beds === value}
                  onClick={() => onChange({ beds: filters.beds === value ? '' : value })}
                >
                  {value}+
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm normal-case tracking-normal text-moss">
              Commercial spaces appear when bedrooms is set to Any.
            </p>
          </div>
        </div>

        <button type="button" className="btn mt-6 w-full lg:hidden" onClick={() => setOpen(false)}>
          Show {resultCount} {resultCount === 1 ? 'property' : 'properties'}
        </button>
      </div>
    </aside>
  )
}
