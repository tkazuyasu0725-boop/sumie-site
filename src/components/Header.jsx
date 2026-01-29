import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <motion.header 
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">A</div>
          <div>
            <div className="logo-text">AD BUZZ</div>
            <div className="logo-sub">MARKETING COMPANY</div>
          </div>
        </Link>

        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          <div className="nav-links">
            <Link to="/about" className="nav-link">
              COMPANY
              <span className="nav-link-sub">会社概要</span>
            </Link>
            <Link to="/services" className="nav-link">
              SERVICE
              <span className="nav-link-sub">サービス</span>
            </Link>
            <Link to="/works" className="nav-link">
              WORKS
              <span className="nav-link-sub">実績</span>
            </Link>
            <Link to="/voice" className="nav-link">
              VOICE
              <span className="nav-link-sub">お客様の声</span>
            </Link>
            <Link to="/blog" className="nav-link">
              BLOG
              <span className="nav-link-sub">ブログ</span>
            </Link>
          </div>
          <Link to="/contact" className="nav-contact">CONTACT お問い合わせ</Link>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
