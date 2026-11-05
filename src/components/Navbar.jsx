import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Drumstick, Menu as MenuIcon, Search, ShoppingCart, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About Us' },
  { to: '/promotions', label: 'Promotions' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ onCartOpen }) {
  const { count } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    window.location.href = q ? `/menu?q=${encodeURIComponent(q)}` : '/menu'
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'border-charcoal/10 bg-white/95 shadow-md backdrop-blur'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red shadow">
            <Drumstick className="h-6 w-6 text-white" />
          </span>
          <span className="font-display text-2xl leading-none text-charcoal">
            HUSIN<span className="text-brand-red">FRIED</span>
            <span className="block text-[10px] font-body font-bold tracking-[0.3em] text-brand-brown">
              CHICKEN CO.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-yellow text-charcoal'
                    : 'text-charcoal/70 hover:bg-stone-100 hover:text-charcoal'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={submitSearch} className="ml-auto hidden items-center md:flex">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu..."
              aria-label="Search menu"
              className="w-44 rounded-full border border-charcoal/15 bg-stone-50 py-2 pl-9 pr-4 text-sm outline-none transition-all focus:w-60 focus:border-brand-red focus:bg-white"
            />
          </div>
        </form>

        {/* Cart + mobile toggle */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            onClick={onCartOpen}
            aria-label={`Open cart, ${count} items`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-white transition-colors hover:bg-brand-red"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-yellow px-1 text-[11px] font-bold text-charcoal ring-2 ring-white">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-charcoal/10 bg-white px-4 pb-4 pt-2 lg:hidden">
          <form onSubmit={submitSearch} className="mb-3 flex md:hidden">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu..."
                aria-label="Search menu"
                className="w-full rounded-full border border-charcoal/15 bg-stone-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand-red"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? 'bg-brand-yellow text-charcoal' : 'text-charcoal/80 hover:bg-stone-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
