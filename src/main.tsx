import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { enableMocking } from './shared/lib/msw/browser'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
