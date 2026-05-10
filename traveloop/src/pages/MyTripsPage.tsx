import { motion } from 'framer-motion'
import { Plane, Map, Plus, Search, ArrowRight, Calendar, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import { fadeUpVariants } from '../utils/variants'

type BadgeTone = 'amber' | 'blue' | 'cyan' | 'green' | 'gray'

const trips = [
  {
    name: 'Lisbon Loop',
    dates: 'Jun 12 – Jun 18, 2026',
    status: 'Draft',
    tone: 'amber' as BadgeTone,
    cities: ['Lisbon', 'Sintra', 'Cascais'],
    travelers: 4,
    cover: '🏰',
    budget: '$3,200',
  },
  {
    name: 'Nordic Studio',
    dates: 'Jul 02 – Jul 11, 2026',
    status: 'Booked',
    tone: 'blue' as BadgeTone,
    cities: ['Copenhagen', 'Oslo'],
    travelers: 2,
    cover: '🧜',
    budget: '$4,800',
  },
  {
    name: 'Desert Weekender',
    dates: 'Aug 23 – Aug 25, 2026',
    status: 'Shared',
    tone: 'cyan' as BadgeTone,
    cities: ['Phoenix', 'Sedona'],
    travelers: 5,
    cover: '🌵',
    budget: '$1,500',
  },
  {
    name: 'Tokyo Immersion',
    dates: 'Oct 05 – Oct 14, 2026',
    status: 'Planning',
    tone: 'gray' as BadgeTone,
    cities: ['Tokyo', 'Kyoto', 'Osaka'],
    travelers: 2,
    cover: '⛩️',
    budget: '$6,200',
  },
  {
    name: 'Amalfi Coast Drive',
    dates: 'Sep 10 – Sep 17, 2026',
    status: 'Draft',
    tone: 'amber' as BadgeTone,
    cities: ['Naples', 'Positano', 'Ravello'],
    travelers: 3,
    cover: '🌊',
    budget: '$4,100',
  },
  {
    name: 'Montreal Food Week',
    dates: 'Nov 01 – Nov 07, 2026',
    status: 'Planning',
    tone: 'gray' as BadgeTone,
    cities: ['Montreal'],
    travelers: 2,
    cover: '🍁',
    budget: '$2,200',
  },
]

const itemVariants = fadeUpVariants

function MyTripsPage() {
  return (
    <PageShell
      title="My Trips"
      eyebrow="Traveloop"
      subtitle="All your planned, booked, and drafted trips in one place."
      actions={
        <Link to="/trips/new">
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            New Trip
          </Button>
        </Link>
      }
    >
      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips…"
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Booked', 'Draft', 'Shared', 'Planning'].map((f) => (
            <button
              key={f}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                f === 'All'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Trips grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip, i) => (
          <motion.div
            key={trip.name}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
          >
            {/* Card cover */}
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-5xl">
              {trip.cover}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900">{trip.name}</h3>
                <Badge tone={trip.tone}>{trip.status}</Badge>
              </div>

              <div className="mt-3 space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  {trip.dates}
                </div>
                <div className="flex items-center gap-2">
                  <Map className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  {trip.cities.join(' · ')}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    {trip.travelers} travelers
                  </div>
                  <span className="font-semibold text-blue-600">{trip.budget}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link to="/itinerary/view" className="flex-1">
                  <button className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100">
                    View itinerary
                  </button>
                </Link>
                <Link to="/itinerary/builder">
                  <button className="flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                    Edit
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty state / New trip card */}
        <motion.div
          custom={trips.length}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center transition-all hover:border-blue-300 hover:bg-blue-50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
            <Plane className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-gray-900">Plan a new trip</h3>
          <p className="mt-1 text-xs text-gray-500">Start building your next adventure</p>
          <Link to="/trips/new" className="mt-4">
            <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />}>
              Create trip
            </Button>
          </Link>
        </motion.div>
      </div>
    </PageShell>
  )
}

export default MyTripsPage
