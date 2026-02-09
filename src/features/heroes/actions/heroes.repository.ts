import type { Hero } from '../types/hero.types'
import { readStorage, writeStorage } from '../../../shared/lib/storage'
import { initialHeroes } from '../../../shared/lib/msw/seed'

const HEROES_KEY = 'heroes_app.heroes.v1'

const loadHeroes = () => readStorage<Hero[]>(HEROES_KEY, [])

const persistHeroes = (heroes: Hero[]) => {
  writeStorage(HEROES_KEY, heroes)
}

const hasRequiredFields = (hero: Hero) => {
  return (
    hero.id &&
    hero.name &&
    hero.imageUrl &&
    hero.alignment &&
    hero.status &&
    hero.team &&
    Array.isArray(hero.powers) &&
    hero.stats &&
    typeof hero.stats.strength === 'number' &&
    typeof hero.stats.intelligence === 'number' &&
    typeof hero.stats.speed === 'number' &&
    typeof hero.stats.durability === 'number'
  )
}

const ensureSeed = () => {
  const heroes = loadHeroes()
  if (heroes.length === 0 || !heroes.every(hasRequiredFields)) {
    persistHeroes(initialHeroes)
  }
}

export const heroesRepository = {
  getAll: () => {
    ensureSeed()
    return loadHeroes()
  },
  getById: (id: string) => {
    ensureSeed()
    return loadHeroes().find((hero) => hero.id === id) ?? null
  },
  create: (payload: Hero) => {
    ensureSeed()
    const heroes = loadHeroes()
    const next = [payload, ...heroes]
    persistHeroes(next)
    return payload
  },
  update: (id: string, payload: Hero) => {
    ensureSeed()
    const heroes = loadHeroes()
    const next = heroes.map((hero) => (hero.id === id ? payload : hero))
    persistHeroes(next)
    return payload
  },
  remove: (id: string) => {
    ensureSeed()
    const heroes = loadHeroes().filter((hero) => hero.id !== id)
    persistHeroes(heroes)
    return id
  },
}
