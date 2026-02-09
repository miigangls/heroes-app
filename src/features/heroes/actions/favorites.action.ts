import type { Favorite } from '../types/favorite.types'
import { favoritesRepository } from './favorites.repository'

export const fetchFavorites = async (): Promise<Favorite[]> => {
  return favoritesRepository.getAll()
}

export const addFavorite = async (heroId: string): Promise<Favorite[]> => {
  return favoritesRepository.add(heroId)
}

export const removeFavorite = async (heroId: string): Promise<Favorite[]> => {
  return favoritesRepository.removeByHeroId(heroId)
}
