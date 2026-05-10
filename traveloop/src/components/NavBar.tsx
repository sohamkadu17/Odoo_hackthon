import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Trips', to: '/trips' },
  { label: 'Itinerary', to: '/itinerary/view' },
  { label: 'Search', to: '/search/cities' },
  { label: 'Budget', to: '/budget' },
  { label: 'Profile', to: '/profile' },
]

function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.15)]" />
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-800">
            Traveloop
          </span>
        </div>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:shadow-sm'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
