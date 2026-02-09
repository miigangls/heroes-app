import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFavorite, removeFavorite } from '../actions/favorites.action'
import type { Favorite } from '../types/favorite.types'

type ToggleFavoriteArgs = {
  heroId: string
  isFavorite: boolean
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ heroId, isFavorite }: ToggleFavoriteArgs) => {
      return isFavorite ? removeFavorite(heroId) : addFavorite(heroId)
    },
    onMutate: async ({ heroId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous = queryClient.getQueryData<Favorite[]>(['favorites']) ?? []
      const next = isFavorite
        ? previous.filter((fav) => fav.heroId !== heroId)
        : [
            { id: `fav-${heroId}`, heroId, createdAt: new Date().toISOString() },
            ...previous,
          ]
      queryClient.setQueryData(['favorites'], next)
      return { previous }
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['favorites'], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}
