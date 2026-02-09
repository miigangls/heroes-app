export type UserSession = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

export type AuthState = {
  status: AuthStatus
  user: UserSession | null
  lastVisitedPath: string | null
}
