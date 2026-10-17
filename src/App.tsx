import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Labo = lazy(() => import('./pages/Labo'))
const Jeux = lazy(() => import('./pages/Jeux'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="py-24 font-mono text-sm text-muted">Chargement…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/labo" element={<Labo />} />
          <Route path="/jeux" element={<Jeux />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
