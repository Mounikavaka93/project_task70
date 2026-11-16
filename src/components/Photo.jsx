import { useState } from 'react'
import { photo } from '../utils/photo'

export default function Photo({
  id,
  alt,
  className = '',
  width = 1600,
  eager = false,
}) {
  const [failed, setFailed] = useState(false)

  if (!id || failed) {
    return <div className={`bg-sand ${className}`} role="img" aria-label={alt || 'Photo unavailable'} />
  }

  return (
    <img
      src={photo(id, width)}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
