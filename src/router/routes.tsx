import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '../app/layouts/RootLayout'
import { HeroesPage } from '../features/heroes/pages/HeroesPage'
import { HeroDetailPage } from '../features/heroes/pages/HeroDetailPage'
import { SearchPage } from '../features/heroes/pages/SearchPage'
import { NotFoundPage } from '../shared/components/NotFoundPage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/heroes" replace /> },
      { path: 'heroes', element: <HeroesPage /> },
      { path: 'heroes/search', element: <SearchPage /> },
      { path: 'heroes/:heroId', element: <HeroDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
