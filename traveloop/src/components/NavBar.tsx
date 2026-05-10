import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
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
} from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Trips', to: '/trips', icon: Map },
  { label: 'Itinerary', to: '/itinerary/view', icon: Route },
  { label: 'Budget', to: '/budget', icon: Wallet },
  { label: 'Packing', to: '/packing', icon: Backpack },
  { label: 'Admin', to: '/admin', icon: BarChart3 },
]

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-200">
            <Plane className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold tracking-tight text-gray-900">
            Traveloop
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm transition-transform hover:scale-105"
            aria-label="Profile"
          >
            <User className="h-4 w-4" strokeWidth={2} />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 lg:hidden">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}

export default NavBar
