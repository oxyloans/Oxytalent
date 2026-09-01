import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '../services/authService'
import type { AuthSession, UserProfile } from '../types/auth.types'

interface AuthContextValue {
  user: UserProfile | null
  isAuthenticated: boolean
  /** False only while we're checking for an existing session on first load. */
  isInitializing: boolean
  setSession: (session: AuthSession) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const existing = authService.getStoredSession()
    setUser(existing?.user ?? null)
    setIsInitializing(false)
  }, [])

  const setSession = useCallback((session: AuthSession) => {
    setUser(session.user)
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, isInitializing, setSession, logout }),
    [user, isInitializing, setSession, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
