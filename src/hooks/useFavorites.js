import { useContext } from 'react'
import { FavoritesContext } from '../context/favorites-context'

export function useFavorites() {
  const value = useContext(FavoritesContext)
  if (!value) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return value
}
