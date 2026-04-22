import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import DarkVeilBackground from './components/DarkVeilBackground'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [heroMode, setHeroMode] = useState('idle')
  const onActivate = useCallback(() => setHeroMode('animating'), [])
  const onComplete = useCallback(() => setHeroMode('idle'), [])

  return (
    <>
      <DarkVeilBackground heroMode={heroMode} onComplete={onComplete} />
      <div className="relative z-10">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home heroMode={heroMode} onActivate={onActivate} />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </>
  )
}
