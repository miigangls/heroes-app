import type { Hero } from '../types/hero.types'
import type { Favorite } from '../types/favorite.types'

type HeroesStatsProps = {
  heroes: Hero[]
  favorites: Favorite[]
}

const StatCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
    </div>
  )
}

export const HeroesStats = ({ heroes, favorites }: HeroesStatsProps) => {
  const total = heroes.length
  const heroesCount = heroes.filter((hero) => hero.alignment === 'hero').length
  const villainsCount = total - heroesCount
  const favoritesCount = favorites.length

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard label="Total" value={`${total}`} />
      <StatCard label="Favoritos" value={`${favoritesCount}`} />
      <StatCard label="Heroes" value={`${heroesCount}`} />
      <StatCard label="Villanos" value={`${villainsCount}`} />
    </div>
  )
}
