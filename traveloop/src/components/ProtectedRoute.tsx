import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireUser?: boolean
}

export default function ProtectedRoute({ children, requireUser = false }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireUser && user.role !== 'user') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
