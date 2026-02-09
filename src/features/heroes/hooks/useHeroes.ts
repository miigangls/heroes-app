import { useQuery } from '@tanstack/react-query'
import { fetchHeroes } from '../actions/heroes.action'

type UseHeroesParams = {
  limit: number
  offset: number
  category: 'all' | 'hero' | 'villain'
}

export const useHeroes = (params: UseHeroesParams) => {
  return useQuery({
    queryKey: ['heroes', params],
    queryFn: () => fetchHeroes(params),
    placeholderData: (prev) => prev,
  })
}
