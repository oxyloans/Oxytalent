import { useCallback, useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import JobsPage from './pages/JobsPage'

type Route = 'home' | 'jobs'

function pathToRoute(pathname: string): Route {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p === '/jobs') return 'jobs'
  return 'home'
}

function routeToPath(route: Route): string {
  return route === 'jobs' ? '/jobs' : '/'
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== 'undefined' ? pathToRoute(window.location.pathname) : 'home'
  )

  useEffect(() => {
    const onPop = () => setRoute(pathToRoute(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: Route) => {
    const path = routeToPath(next)
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }
    setRoute(next)
    window.scrollTo(0, 0)
  }, [])

  if (route === 'jobs') {
    return <JobsPage onNavigateHome={() => navigate('home')} />
  }

  return <LandingPage onNavigateJobs={() => navigate('jobs')} />
}
