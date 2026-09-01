import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import JobsPage from './pages/JobsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import { AuthProvider } from './features/auth/context/AuthContext'

function LandingRoute() {
  const navigate = useNavigate()
  return <LandingPage onNavigateJobs={() => navigate('/jobs')} />
}

function JobsRoute() {
  const navigate = useNavigate()
  return <JobsPage onNavigateHome={() => navigate('/')} />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingRoute />} />
          <Route path="/jobs" element={<JobsRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
