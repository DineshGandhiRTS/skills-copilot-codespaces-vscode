import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Encoder = lazy(() => import('./pages/Encoder'))
const Decoder = lazy(() => import('./pages/Decoder'))
const HashCracker = lazy(() => import('./pages/HashCracker'))
const NetworkTools = lazy(() => import('./pages/NetworkTools'))
const WebTools = lazy(() => import('./pages/WebTools'))
const CTFTools = lazy(() => import('./pages/CTFTools'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/encoder" element={<Encoder />} />
          <Route path="/decoder" element={<Decoder />} />
          <Route path="/hash-cracker" element={<HashCracker />} />
          <Route path="/network-tools" element={<NetworkTools />} />
          <Route path="/web-tools" element={<WebTools />} />
          <Route path="/ctf-tools" element={<CTFTools />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App