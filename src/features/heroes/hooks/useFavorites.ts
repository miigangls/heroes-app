import { useQuery } from '@tanstack/react-query'
import { fetchFavorites } from '../actions/favorites.action'

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  })
}
