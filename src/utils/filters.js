function numberOrNull(value) {
  if (value === '' || value == null) return null
  const number = Number(value)
  if (!Number.isFinite(number) || number < 0) return null
  return number
}

export function filterProperties(list, criteria) {
  const location = (criteria.location || '').trim().toLowerCase()
  const type = criteria.type || ''
  const category = criteria.category || ''
  let minPrice = numberOrNull(criteria.minPrice)
  let maxPrice = numberOrNull(criteria.maxPrice)
  const beds = numberOrNull(criteria.beds)

  if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
    ;[minPrice, maxPrice] = [maxPrice, minPrice]
  }

  return list.filter((property) => {
    if (criteria.listing && property.listing !== criteria.listing) return false
    if (category && property.category !== category) return false
    if (type && property.type !== type) return false
    if (location) {
      const haystack = `${property.city} ${property.location} ${property.address} ${property.title}`.toLowerCase()
      if (!haystack.includes(location)) return false
    }
    if (minPrice != null && property.price < minPrice) return false
    if (maxPrice != null && maxPrice > 0 && property.price > maxPrice) return false
    if (beds != null && beds > 0 && property.beds < beds) return false
    return true
  })
}

export function sortProperties(list, sort) {
  const copy = [...list]
  if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price)
  else if (sort === 'sqft') copy.sort((a, b) => b.sqft - a.sqft)
  else copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
  return copy
}

export function activeFilterCount(filters) {
  return [filters.location, filters.type, filters.category, filters.minPrice, filters.maxPrice, filters.beds].filter(
    Boolean,
  ).length
}
