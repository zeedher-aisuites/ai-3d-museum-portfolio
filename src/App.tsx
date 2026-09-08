import { lazy, Suspense, useEffect, useState } from 'react'
import { RecruiterEntry } from './recruiter/RecruiterEntry'

const MuseumApp = lazy(() => import('./MuseumApp').then((module) => ({ default: module.MuseumApp })))

const isAtelierHash = (hash: string) => /^#\/atelier\/?$/.test(hash)

function AtelierLoading() {
  return <main className="atelier-loading" aria-live="polite"><p>Loading ATELIER…</p></main>
}

function App() {
  const [atelierMode, setAtelierMode] = useState(() => isAtelierHash(window.location.hash))

  useEffect(() => {
    const syncHash = () => setAtelierMode(isAtelierHash(window.location.hash))
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  useEffect(() => {
    document.title = atelierMode ? 'ATELIER / AI-First Creative Studio' : 'José Eduardo Hernández — Gen AI Creative Technologist'
  }, [atelierMode])

  if (!atelierMode) return <RecruiterEntry />

  return (
    <>
      <Suspense fallback={<AtelierLoading />}><MuseumApp /></Suspense>
      <a className="atelier-return" href="#/">Back to José's Portfolio</a>
    </>
  )
}

export default App
