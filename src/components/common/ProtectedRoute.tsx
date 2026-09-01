import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * Wrap any route element that should only be reachable while logged in:
 *   <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
 * Unauthenticated visitors are bounced to /login and sent back afterwards
 * via location state (read it in LoginPage if you want a "return to" redirect).
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth()
  const location = useLocation()

  if (isInitializing) return null // avoid a login flash while session check runs
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />

  return <>{children}</>
}
