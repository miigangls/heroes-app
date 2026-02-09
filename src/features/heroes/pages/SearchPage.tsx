import { useSearchParams } from 'react-router-dom'
import { EmptyState } from '../../../shared/components/EmptyState'
import { ErrorState } from '../../../shared/components/ErrorState'
import { LoadingState } from '../../../shared/components/LoadingState'
import { PagePlaceholder } from '../../../shared/components/PagePlaceholder'
import { HeroGrid } from '../components/HeroGrid'
import { HeroesStats } from '../components/HeroesStats'
import { SearchControls } from '../components/SearchControls'
import { useFavorites } from '../hooks/useFavorites'
import { useSearchHeroes } from '../hooks/useSearchHeroes'
import { useToggleFavorite } from '../hooks/useToggleFavorite'

export const SearchPage = () => {
  const [searchParams] = useSearchParams()

  const name = searchParams.get('name') ?? undefined
  const strength = searchParams.get('strength') ?? undefined
  const hasQuery = Boolean(name || strength)

  const { data: heroes = [], isLoading, isError, error } = useSearchHeroes({
    name,
    strength,
  })
  const favoritesQuery = useFavorites()
  const toggleFavorite = useToggleFavorite()
  const favorites = favoritesQuery.data ?? []

  if (isLoading || favoritesQuery.isLoading) {
    return (
      <LoadingState
        title="Buscando heroes"
        description="Aplicando filtros de busqueda."
      />
    )
  }

  if (isError || favoritesQuery.isError) {
    const message =
      (error instanceof Error && error.message) ||
      (favoritesQuery.error instanceof Error && favoritesQuery.error.message) ||
      'Error desconocido.'
    return <ErrorState description={message} />
  }

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Buscar heroes</h1>
        <p className="mt-2 text-sm text-slate-400">
          Encuentra heroes y villanos por nombre o nivel de fuerza.
        </p>
      </div>

      <SearchControls />

      {hasQuery && heroes.length > 0 ? (
        <HeroesStats heroes={heroes} favorites={favorites} />
      ) : null}

      {!hasQuery ? (
        <PagePlaceholder
          title="Escribe un nombre o ajusta la fuerza"
          description="Usa los filtros para iniciar la busqueda de personajes."
        />
      ) : heroes.length === 0 ? (
        <EmptyState
          title="Sin resultados"
          description="No hay heroes con los filtros seleccionados."
        />
      ) : (
        <HeroGrid
          heroes={heroes}
          favorites={favorites}
          onToggleFavorite={(heroId, isFavorite) =>
            toggleFavorite.mutate({ heroId, isFavorite })
          }
        />
      )}
    </section>
  )
}
