import type { Hero } from '../types/hero.types'
import type { Favorite } from '../types/favorite.types'
import { HeroCard } from './HeroCard'

type HeroGridProps = {
  heroes: Hero[]
  favorites: Favorite[]
  onToggleFavorite: (heroId: string, isFavorite: boolean) => void
}

export const HeroGrid = ({
  heroes,
  favorites,
  onToggleFavorite,
}: HeroGridProps) => {
  const favoriteSet = new Set(favorites.map((fav) => fav.heroId))

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          isFavorite={favoriteSet.has(hero.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
