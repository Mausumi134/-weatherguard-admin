import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { MyAlertsPage } from './pages/MyAlertsPage'
import { RequestInvitePage } from './pages/RequestInvitePage'
import { useAuth } from './providers/AuthProvider'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth()

  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/request-invite" replace />} />
      <Route path="/request-invite" element={<RequestInvitePage />} />
      <Route path="/my-alerts" element={<MyAlertsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/request-invite" replace />} />
    </Routes>
  )
}

export default App
