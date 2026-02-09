import type { Favorite } from '../types/favorite.types'
import { readStorage, writeStorage } from '../../../shared/lib/storage'
import { initialFavorites } from '../../../shared/lib/msw/seed'
import { createId } from '../../../shared/lib/id'

const FAVORITES_KEY = 'heroes_app.favorites.v1'

const loadFavorites = () => readStorage<Favorite[]>(FAVORITES_KEY, [])

const persistFavorites = (favorites: Favorite[]) => {
  writeStorage(FAVORITES_KEY, favorites)
}

const ensureSeed = () => {
  const favorites = loadFavorites()
  if (favorites.length === 0) {
    persistFavorites(initialFavorites)
  }
}

export const favoritesRepository = {
  getAll: () => {
    ensureSeed()
    return loadFavorites()
  },
  add: (heroId: string) => {
    ensureSeed()
    const favorites = loadFavorites()
    if (favorites.some((favorite) => favorite.heroId === heroId)) {
      return favorites
    }
    const next: Favorite = {
      id: createId(),
      heroId,
      createdAt: new Date().toISOString(),
    }
    const updated = [next, ...favorites]
    persistFavorites(updated)
    return updated
  },
  removeByHeroId: (heroId: string) => {
    ensureSeed()
    const favorites = loadFavorites()
    const updated = favorites.filter((favorite) => favorite.heroId !== heroId)
    persistFavorites(updated)
    return updated
  },
}
