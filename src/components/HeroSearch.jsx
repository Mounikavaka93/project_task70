import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { locationSuggestions, propertyTypes } from '../data/properties'

const bedOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
]

export default function HeroSearch() {
  const navigate = useNavigate()
  const [intent, setIntent] = useState('sale')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [beds, setBeds] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    let min = minPrice
    let max = maxPrice
    if (min && max && Number(min) > Number(max)) {
      ;[min, max] = [max, min]
    }
    const params = new URLSearchParams()
    if (location.trim()) params.set('location', location.trim())
    if (type) params.set('type', type)
    if (beds) params.set('beds', beds)
    if (min) params.set('min', min)
    if (max) params.set('max', max)
    const query = params.toString()
    navigate(`/${intent === 'rent' ? 'rent' : 'buy'}${query ? `?${query}` : ''}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full min-w-0 max-w-full bg-cream p-4 text-ink shadow-[0_24px_60px_-36px_rgba(0,0,0,0.85)] sm:p-5"
    >
      <div className="mb-4 flex w-full bg-sand p-1 sm:w-fit" role="group" aria-label="Buy or rent">
        {[
          ['sale', 'Buy'],
          ['rent', 'Rent'],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={intent === value}
            onClick={() => setIntent(value)}
            className={`min-h-11 flex-1 px-6 text-xs font-semibold uppercase tracking-[0.16em] transition sm:flex-none ${
              intent === value ? 'bg-ink text-cream' : 'text-ink hover:bg-cream'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-end gap-3 min-[420px]:grid-cols-2 lg:grid-cols-5">
        <label className="field min-[420px]:col-span-2 lg:col-span-1">
          Location
          <input
            className="control"
            list="location-suggestions"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="City or neighborhood"
          />
          <datalist id="location-suggestions">
            {locationSuggestions.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
        </label>

        <label className="field">
          Property type
          <select className="control" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="">All types</option>
            <optgroup label="Residential">
              {propertyTypes
                .filter((item) => item.group === 'Residential')
                .map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.value}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Commercial">
              {propertyTypes
                .filter((item) => item.group === 'Commercial')
                .map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.value}
                  </option>
                ))}
            </optgroup>
          </select>
        </label>

        <label className="field">
          Bedrooms
          <select className="control" value={beds} onChange={(event) => setBeds(event.target.value)}>
            {bedOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          Min price
          <input
            className="control"
            inputMode="numeric"
            min="0"
            type="number"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder={intent === 'rent' ? 'No min / mo' : 'No min'}
          />
        </label>

        <label className="field">
          Max price
          <input
            className="control"
            inputMode="numeric"
            min="0"
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder={intent === 'rent' ? 'No max / mo' : 'No max'}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm normal-case tracking-normal text-ink-soft">
          Search houses, apartments, and commercial spaces.
        </p>
        <button type="submit" className="btn w-full sm:w-auto">
          Search properties
        </button>
      </div>
    </form>
  )
}
