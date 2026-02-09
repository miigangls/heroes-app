import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)

export const enableMocking = async () => {
  if (!import.meta.env.DEV) return
  if (import.meta.env.VITE_USE_MSW !== 'true') return
  await worker.start({ onUnhandledRequest: 'warn' })
}
