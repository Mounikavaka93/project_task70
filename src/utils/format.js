export function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPrice(property) {
  const money = formatMoney(property.price)
  return property.listing === 'rent' ? `${money}/mo` : money
}

export function telHref(phone) {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits}`
}
