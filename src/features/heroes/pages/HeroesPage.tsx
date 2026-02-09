import { useMemo, useState } from 'react'
import { EmptyState } from '../../../shared/components/EmptyState'
import { ErrorState } from '../../../shared/components/ErrorState'
import { LoadingState } from '../../../shared/components/LoadingState'
import { Pagination } from '../../../shared/components/Pagination'
import { HeroGrid } from '../components/HeroGrid'
import { HeroesFilters } from '../components/HeroesFilters'
import { HeroesStats } from '../components/HeroesStats'
import { useFavorites } from '../hooks/useFavorites'
import { useHeroes } from '../hooks/useHeroes'
import { useToggleFavorite } from '../hooks/useToggleFavorite'
import type { HeroesFilter } from '../types/filters.types'

export const HeroesPage = () => {
  const [filter, setFilter] = useState<HeroesFilter>('all')
  const [page, setPage] = useState(1)
  const limit = 6
  const offset = (page - 1) * limit
  const category =
    filter === 'heroes' ? 'hero' : filter === 'villains' ? 'villain' : 'all'

  const { data, isLoading, isError, error } = useHeroes({
    limit,
    offset,
    category,
  })
  const favoritesQuery = useFavorites()
  const toggleFavorite = useToggleFavorite()

  const heroes = data?.heroes ?? []
  const favorites = favoritesQuery.data ?? []
  const favoritesSet = new Set(favorites.map((fav) => fav.heroId))
  const totalPages = data?.pages ?? 1

  const filteredHeroes = useMemo(() => {
    if (filter === 'favorites') {
      return heroes.filter((hero) => favoritesSet.has(hero.id))
    }
    if (filter === 'heroes') {
      return heroes.filter((hero) => hero.alignment === 'hero')
    }
    if (filter === 'villains') {
      return heroes.filter((hero) => hero.alignment === 'villain')
    }
    return heroes
  }, [heroes, favoritesSet, filter])

  if (isLoading || favoritesQuery.isLoading) {
    return <LoadingState title="Cargando heroes" />
  }

  if (isError || favoritesQuery.isError) {
    const message =
      (error instanceof Error && error.message) ||
      (favoritesQuery.error instanceof Error && favoritesQuery.error.message) ||
      'Error desconocido.'
    return <ErrorState description={message} />
  }

  if (heroes.length === 0) {
    return <EmptyState />
  }

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Universo de Heroes
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Explora y administra heroes desde el panel principal.
        </p>
      </div>
      <HeroesStats heroes={heroes} favorites={favorites} />
      <HeroesFilters
        active={filter}
        onChange={(value) => {
          setFilter(value)
          setPage(1)
        }}
      />
      {filteredHeroes.length === 0 ? (
        <EmptyState />
      ) : (
        <HeroGrid
          heroes={filteredHeroes}
          favorites={favorites}
          onToggleFavorite={(heroId, isFavorite) =>
            toggleFavorite.mutate({ heroId, isFavorite })
          }
        />
      )}
      {filter !== 'favorites' ? (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      ) : null}
    </section>
  )
}
