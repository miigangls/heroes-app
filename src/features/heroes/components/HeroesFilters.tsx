import { cn } from '../../../shared/lib/cn'
import type { HeroesFilter } from '../types/filters.types'

const filters: { key: HeroesFilter; label: string }[] = [
  { key: 'all', label: 'All Characters' },
  { key: 'favorites', label: 'Favorites' },
  { key: 'heroes', label: 'Heroes' },
  { key: 'villains', label: 'Villains' },
]

type HeroesFiltersProps = {
  active: HeroesFilter
  onChange: (value: HeroesFilter) => void
}

export const HeroesFilters = ({ active, onChange }: HeroesFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={() => onChange(filter.key)}
          className={cn(
            'rounded-full px-4 py-2 text-xs font-semibold transition',
            active === filter.key
              ? 'bg-slate-800 text-white'
              : 'bg-slate-900/40 text-slate-300 hover:text-white',
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
