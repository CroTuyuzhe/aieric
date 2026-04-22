import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navLinks = [
  { label: '作品', href: '/#works' },
  { label: '关于', href: '/#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchorClick = (e, href) => {
    if (isHome && href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    } else {
      setMobileOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-2xl border-b border-white/[0.08]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-[15px] font-semibold tracking-tight text-text-primary">
          AI Eric
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            博客
          </Link>
          <a
            href="https://github.com/CroTuyuzhe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            GitHub
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="切换菜单"
        >
          <span className={`w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/80 backdrop-blur-2xl border-b border-white/[0.08]"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-[15px] text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] text-text-secondary hover:text-text-primary transition-colors"
            >
              博客
            </Link>
            <a
              href="https://github.com/CroTuyuzhe"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] text-text-secondary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
