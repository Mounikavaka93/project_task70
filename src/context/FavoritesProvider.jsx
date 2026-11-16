import { useCallback, useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './favorites-context'

const STORAGE_KEY = 'kittiwake-saved'

function readSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export default function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(readSaved)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Ignore storage failures in private browsing.
    }
  }, [ids])

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setIds(readSaved())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = useCallback((id) => {
    setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }, [])

  const has = useCallback((id) => ids.includes(id), [ids])

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
