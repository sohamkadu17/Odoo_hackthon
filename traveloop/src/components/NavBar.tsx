import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  LayoutDashboard,
  Map,
  Route,
  Backpack,
  Wallet,
  User,
  Menu,
  X,
  Home,
  BarChart3,
  Bell,
  Search,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Trips', to: '/trips', icon: Map },
  { label: 'Itinerary', to: '/itinerary/view', icon: Route },
  { label: 'Budget', to: '/budget', icon: Wallet },
  { label: 'Packing', to: '/packing', icon: Backpack },
  { label: 'Analysis', to: '/analysis', icon: BarChart3 },
]

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  const storedUser = (() => {
    try {
      const raw = localStorage.getItem('traveloop_user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })()

  const userName = storedUser
    ? `${storedUser.firstName || ''} ${storedUser.lastName || ''}`.trim() || 'User'
    : 'User'
  const userEmail = storedUser?.email || ''
  const userInitial = (storedUser?.firstName?.[0] || storedUser?.email?.[0] || 'T').toUpperCase()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (!profileOpen) return
    const close = () => setProfileOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [profileOpen])

  const handleLogout = () => {
    localStorage.removeItem('traveloop_token')
    localStorage.removeItem('traveloop_user')
    navigate('/login')
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] border-b border-gray-200/50'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/40">
            <Plane className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 blur-md transition-opacity group-hover:opacity-40" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-gray-900 leading-tight">
              Traveloop
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-gray-400 leading-none">
              Travel Planner
            </span>
          </div>
        </Link>

        {/* Desktop Nav – pill-style active indicator */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-2xl bg-gray-50/80 p-1 border border-gray-100">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-blue-700 shadow-sm shadow-gray-200/50'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`h-3.5 w-3.5 transition-colors ${isActive ? 'text-blue-600' : ''}`} strokeWidth={2} />
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="nav-active-dot"
                            className="absolute -bottom-0.5 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <Link
            to="/search/cities"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
            aria-label="Search"
          >
            <Search className="h-4 w-4" strokeWidth={2} />
          </Link>

          {/* Notifications */}
          <button
            className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
            aria-label="Notifications"
            onClick={() => { /* Future notifications panel */ }}
          >
            <Bell className="h-4 w-4" strokeWidth={2} />
            {/* Notification dot */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Separator */}
          <div className="hidden sm:block h-6 w-px bg-gray-200 mx-1" />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setProfileOpen(!profileOpen) }}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all hover:bg-gray-100 group"
              aria-label="User menu"
            >
              {storedUser?.profilePhoto ? (
                <img
                  src={storedUser.profilePhoto}
                  alt={userName}
                  className="h-8 w-8 rounded-lg object-cover ring-2 ring-gray-100 transition-all group-hover:ring-blue-200"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white ring-2 ring-gray-100 transition-all group-hover:ring-blue-200 shadow-sm">
                  {userInitial}
                </div>
              )}
              <div className="hidden md:flex flex-col items-start">
                <span className="text-[13px] font-semibold text-gray-800 leading-tight">{userName}</span>
                <span className="text-[11px] text-gray-400 leading-tight">Explorer</span>
              </div>
              <ChevronDown className={`hidden md:block h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-xl p-2 shadow-xl shadow-gray-200/40"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* User info header */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50/80 mb-1">
                    {storedUser?.profilePhoto ? (
                      <img src={storedUser.profilePhoto} alt={userName} className="h-10 w-10 rounded-xl object-cover" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-base font-bold text-white">
                        {userInitial}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                      <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-700"
                    >
                      <User className="h-4 w-4" strokeWidth={1.8} />
                      My Profile
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Settings className="h-4 w-4" strokeWidth={1.8} />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.8} />
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl px-4 lg:hidden"
          >
            <ul className="space-y-0.5 py-3">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100`}>
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      {item.label}
                    </NavLink>
                  </motion.li>
                )
              })}
            </ul>

            {/* Mobile user section */}
            <div className="border-t border-gray-100 py-3 space-y-1">
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                  {userInitial}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{userName}</div>
                  <div className="text-xs text-gray-400">View profile</div>
                </div>
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileOpen(false) }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                  <LogOut className="h-4 w-4 text-red-500" strokeWidth={2} />
                </div>
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default NavBar
