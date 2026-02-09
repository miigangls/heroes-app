import { http, HttpResponse } from 'msw'
import { heroesRepository } from '../../../features/heroes/actions/heroes.repository'
import { favoritesRepository } from '../../../features/heroes/actions/favorites.repository'

export const handlers = [
  http.get('/api/heroes', () => {
    return HttpResponse.json(heroesRepository.getAll())
  }),
  http.get('/api/heroes/:heroId', ({ params }) => {
    const heroId = String(params.heroId)
    const hero = heroesRepository.getById(heroId)
    if (!hero) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(hero)
  }),
  http.get('/api/favorites', () => {
    return HttpResponse.json(favoritesRepository.getAll())
  }),
  http.post('/api/favorites', async ({ request }) => {
    const body = (await request.json()) as { heroId?: string }
    if (!body.heroId) {
      return new HttpResponse(null, { status: 400 })
    }
    return HttpResponse.json(favoritesRepository.add(body.heroId))
  }),
  http.delete('/api/favorites/:heroId', ({ params }) => {
    const heroId = String(params.heroId)
    return HttpResponse.json(favoritesRepository.removeByHeroId(heroId))
  }),
]
