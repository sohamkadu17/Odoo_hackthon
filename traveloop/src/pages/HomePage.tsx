import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Globe, Wallet, Users, Shield, ArrowRight, Star, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { fadeUpVariants } from '../utils/variants'

const features = [
  {
    icon: Globe,
    title: 'Multi-city Planning',
    description: 'Build complete itineraries across multiple cities with smart routing.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Wallet,
    title: 'Budget Clarity',
    description: 'Auto-calculated totals with alerts when you go over plan.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: Users,
    title: 'Group Sync',
    description: 'Keep stops, costs, and activities aligned across your whole crew.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Shield,
    title: 'Share Instantly',
    description: 'Send read-only itineraries to friends with a single tap.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
]

const destinations = [
  { name: 'Lisbon', country: 'Portugal', rating: 4.9, trips: 342, emoji: '🏰' },
  { name: 'Kyoto', country: 'Japan', rating: 4.8, trips: 298, emoji: '⛩️' },
  { name: 'Copenhagen', country: 'Denmark', rating: 4.7, trips: 215, emoji: '🧜' },
  { name: 'Santorini', country: 'Greece', rating: 4.9, trips: 387, emoji: '🌊' },
  { name: 'Montreal', country: 'Canada', rating: 4.6, trips: 178, emoji: '🍁' },
  { name: 'Cape Town', country: 'South Africa', rating: 4.8, trips: 203, emoji: '🦁' },
]

const recentTrips = [
  { name: 'Nordic Studio', dates: 'Jul 2 – 11', cities: 'Copenhagen · Oslo', status: 'Upcoming' },
  { name: 'Lisbon Loop', dates: 'Jun 12 – 18', cities: 'Lisbon · Sintra · Cascais', status: 'Draft' },
  { name: 'Desert Weekender', dates: 'Aug 23 – 25', cities: 'Phoenix · Sedona', status: 'Shared' },
]

const statusColors: Record<string, string> = {
  Upcoming: 'bg-blue-100 text-blue-700',
  Draft: 'bg-amber-100 text-amber-700',
  Shared: 'bg-teal-100 text-teal-700',
}

const itemVariants = fadeUpVariants

function HomePage() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    try {
      setSearching(true)
      const response = await fetch(
        `http://localhost:5000/api/search/cities?q=${encodeURIComponent(searchQuery)}`
      )
      const data = await response.json()
      setSearchResults(data.data || [])
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-14"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-300 blur-3xl" />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <Plane className="h-3.5 w-3.5" />
            Premium Travel Planning
          </div>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Plan your next journey in minutes.
          </h1>
          <p className="mt-4 max-w-xl text-base text-blue-100">
            Organize multi-city itineraries, track budgets, and share travel plans with your crew — all in one elegant platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/trips/new">
              <Button
                variant="secondary"
                size="lg"
                icon={<Plane className="h-4 w-4" />}
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Plan a Trip
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-0 ring-1 ring-white/30">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Search & Filter Bar */}
      <motion.section
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex gap-2">
            <select className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Any duration</option>
              <option>Weekend (2-3d)</option>
              <option>Short (4-7d)</option>
              <option>Long (8d+)</option>
            </select>
            <select className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All budgets</option>
              <option>Budget</option>
              <option>Mid-range</option>
              <option>Luxury</option>
            </select>
            <Button variant="primary" size="md" disabled={searching}>
              {searching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
      </motion.section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-bold text-gray-900">Search Results ({searchResults.length})</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((city: any) => (
              <div key={city.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">📍</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{city.name}</h3>
                    <p className="text-sm text-gray-500">{city.country}</p>
                    <p className="mt-1 text-xs text-gray-400">Cost index: {city.costIndex}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Features */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-gray-900">Why Traveloop</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`mb-3 inline-flex rounded-xl p-2.5 ${feature.bg}`}>
                  <Icon className={`h-5 w-5 ${feature.color}`} strokeWidth={2} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Top Destinations */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Top Destinations</h2>
          <Link to="/search/cities" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl">
                  {dest.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                  <p className="text-sm text-gray-500">{dest.country}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {dest.rating}
                    </span>
                    <span>{dest.trips} trips planned</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Trips */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Your Recent Trips</h2>
          <Link to="/trips" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {recentTrips.map((trip, i) => (
            <motion.div
              key={trip.name}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <Plane className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{trip.name}</p>
                  <p className="text-sm text-gray-500">{trip.cities} · {trip.dates}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[trip.status]}`}>
                  {trip.status}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating CTA */}
      <motion.section
        className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center shadow-xl shadow-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Plane className="mx-auto h-10 w-10 text-white/80" />
        <h2 className="mt-3 text-2xl font-bold text-white">Ready for your next adventure?</h2>
        <p className="mt-2 text-blue-100">Create a new trip and start planning in minutes.</p>
        <Link to="/trips/new" className="mt-6 inline-block">
          <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-0 shadow-md font-bold">
            Plan a Trip
          </Button>
        </Link>
      </motion.section>
    </div>
  )
}

export default HomePage
