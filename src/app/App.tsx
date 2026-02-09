import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'
import { appRouter } from '../router/routes'

const App = () => {
  return (
    <QueryProvider>
      <RouterProvider router={appRouter} />
    </QueryProvider>
  )
}

export default App
