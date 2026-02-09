import { useQuery } from '@tanstack/react-query'
import { searchHeroes } from '../actions/heroes.action'

type UseSearchHeroesParams = {
  name?: string
  strength?: string
}

export const useSearchHeroes = ({ name, strength }: UseSearchHeroesParams) => {
  const enabled = Boolean(name || strength)

  return useQuery({
    queryKey: ['heroes-search', { name, strength }],
    queryFn: () => searchHeroes({ name, strength }),
    enabled,
    placeholderData: [],
  })
}
