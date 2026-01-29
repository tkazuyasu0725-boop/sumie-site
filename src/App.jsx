import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import WorksPage from './pages/WorksPage'
import VoicePage from './pages/VoicePage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Router>
      <ScrollToTop />
      {!isMobile && <Cursor />}
      <ScrollProgress />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/voice" element={<VoicePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
