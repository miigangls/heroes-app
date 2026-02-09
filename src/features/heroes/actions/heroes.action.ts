import type { Hero } from '../types/hero.types'

const API_BASE = 'https://heroes-app-backend.onrender.com/api/heroes'
const IMAGE_BASE = 'https://heroes-app-backend.onrender.com/images'

type HeroesApiResponse = {
  total: number
  pages: number
  heroes: HeroesApiItem[]
}

type HeroesApiItem = {
  id: string
  name: string
  slug: string
  alias: string
  powers: string[]
  description: string
  strength: number
  intelligence: number
  speed: number
  durability: number
  team: string
  image: string
  firstAppearance: string
  status: string
  category: string
  universe: string
}

type FetchHeroesParams = {
  limit: number
  offset: number
  category: 'all' | 'hero' | 'villain'
}

type SearchHeroesParams = {
  name?: string
  strength?: string
}

const mapHero = (hero: HeroesApiItem): Hero => {
  const alignment = hero.category.toLowerCase() === 'villain' ? 'villain' : 'hero'
  const status = hero.status.toLowerCase() === 'active' ? 'active' : 'retired'
  return {
    id: hero.id,
    name: hero.alias,
    slug: hero.slug,
    alterEgo: hero.name,
    publisher: hero.universe === 'DC' ? 'DC' : hero.universe === 'Marvel' ? 'Marvel' : 'Other',
    alignment,
    status,
    firstAppearance: hero.firstAppearance,
    team: hero.team,
    characters: hero.name,
    description: hero.description,
    powers: hero.powers ?? [],
    stats: {
      strength: hero.strength * 10,
      intelligence: hero.intelligence * 10,
      speed: hero.speed * 10,
      durability: hero.durability * 10,
    },
    imageUrl: `${IMAGE_BASE}/${hero.image}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const fetchHeroes = async (params: FetchHeroesParams) => {
  const search = new URLSearchParams({
    limit: String(params.limit),
    offset: String(params.offset),
    category: params.category,
  })

  const response = await fetch(`${API_BASE}/?${search.toString()}`)
  if (!response.ok) {
    throw new Error('No se pudo cargar la lista de heroes.')
  }
  const payload = (await response.json()) as HeroesApiResponse
  return {
    total: payload.total,
    pages: payload.pages,
    heroes: payload.heroes.map(mapHero),
  }
}

export const fetchHeroById = async (id: string): Promise<Hero> => {
  const response = await fetch(`${API_BASE}/${id}`)
  if (!response.ok) {
    throw new Error('No se pudo cargar el heroe solicitado.')
  }
  const payload = (await response.json()) as HeroesApiItem
  return mapHero(payload)
}

export const searchHeroes = async ({
  name,
  strength,
}: SearchHeroesParams): Promise<Hero[]> => {
  if (!name && !strength) {
    return []
  }

  const search = new URLSearchParams()
  if (name) {
    search.set('name', name)
  }
  if (strength) {
    search.set('strength', strength)
  }

  const response = await fetch(`${API_BASE}/search?${search.toString()}`)
  if (!response.ok) {
    throw new Error('No se pudo buscar heroes.')
  }
  const payload = (await response.json()) as HeroesApiItem[]
  return payload.map(mapHero)
}
