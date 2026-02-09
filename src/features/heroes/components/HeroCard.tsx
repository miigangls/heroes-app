import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Hero } from '../types/hero.types'
import { HeroPowers } from './HeroPowers'
import { HeroStats } from './HeroStats'

type HeroCardProps = {
  hero: Hero
  isFavorite: boolean
  onToggleFavorite: (heroId: string, isFavorite: boolean) => void
}

export const HeroCard = ({
  hero,
  isFavorite,
  onToggleFavorite,
}: HeroCardProps) => {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
      <div className="relative h-44 w-full">
        <img
          src={hero.imageUrl}
          alt={hero.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = '/images/heroes/placeholder.svg'
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-wide text-slate-200">
          {hero.publisher}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-wide text-slate-200">
          {hero.status}
        </span>
        <button
          type="button"
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(hero.id, isFavorite)}
          className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white"
        >
          <Heart
            className={isFavorite ? 'fill-rose-500 text-rose-500' : ''}
            size={18}
          />
        </button>
      </div>
      <div className="grid gap-2 p-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{hero.name}</h3>
          <p className="text-xs text-slate-400">{hero.alterEgo}</p>
          <p className="mt-1 text-xs text-slate-500">{hero.team}</p>
        </div>
        <p className="text-sm text-slate-300">{hero.description}</p>
        <HeroStats stats={hero.stats} />
        <HeroPowers powers={hero.powers} />
        <Link
          to={`/heroes/${hero.id}`}
          className="text-sm font-semibold text-indigo-300 hover:text-indigo-200"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  )
}
