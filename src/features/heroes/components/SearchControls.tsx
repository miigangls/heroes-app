import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, Search, X } from 'lucide-react'
import { Button } from '../../../shared/components/Button'
import { Input } from '../../../shared/components/Input'
import { cn } from '../../../shared/lib/cn'

const FILTERS_KEY = 'active-accordion'
const FILTERS_VALUE = 'advance-filters'

export const SearchControls = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const nameParam = searchParams.get('name') ?? ''
  const strengthParam = Number(searchParams.get('strength') ?? '0')
  const activeAccordion = searchParams.get(FILTERS_KEY) ?? ''

  const [nameInput, setNameInput] = useState(nameParam)

  useEffect(() => {
    setNameInput(nameParam)
  }, [nameParam])

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          next.delete(key)
          return
        }
        next.set(key, value)
      })
      return next
    })
  }

  const handleSearch = () => {
    const value = nameInput.trim()
    updateParams({ name: value || null })
  }

  const handleClear = () => {
    setSearchParams(new URLSearchParams())
  }

  const isFiltersOpen = activeAccordion === FILTERS_VALUE

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar heroes, villanos, poderes..."
            className="h-11 pl-11"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch()
              }
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={handleSearch} className="h-11">
            Buscar
          </Button>
          <Button
            type="button"
            onClick={() =>
              updateParams({
                [FILTERS_KEY]: isFiltersOpen ? null : FILTERS_VALUE,
              })
            }
            className={cn(
              'h-11 bg-slate-900/60 text-slate-200 hover:bg-slate-800',
              isFiltersOpen && 'bg-slate-800 text-white',
            )}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button
            type="button"
            onClick={handleClear}
            className="h-11 bg-slate-900/60 text-slate-200 hover:bg-slate-800"
          >
            <X className="mr-2 h-4 w-4" />
            Limpiar
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 transition-all',
          isFiltersOpen ? 'max-h-65 p-6' : 'max-h-0 p-0',
        )}
        data-testid="accordion"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Filtros avanzados
          </h3>
          <span className="text-xs text-slate-500">Minimo de fuerza</span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">
              Fuerza: {strengthParam}/10
            </label>
            <span className="text-xs text-slate-500">0 - 10</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={strengthParam}
            onChange={(event) => {
              const value = event.target.value
              updateParams({ strength: value === '0' ? null : value })
            }}
            className="mt-3 w-full accent-indigo-400"
          />
        </div>
      </div>
    </div>
  )
}
