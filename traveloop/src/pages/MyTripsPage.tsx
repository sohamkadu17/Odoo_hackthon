import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plane, Map, Plus, Search, ArrowRight, Calendar } from 'lucide-react'
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
    image: 'https://picsum.photos/seed/15487/800/600',
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
    image: 'https://picsum.photos/seed/15136/800/600',
  },
  {
    name: 'Desert Weekender',
    dates: 'Aug 23 – Aug 25, 2026',
    status: 'Shared',
    tone: 'cyan' as BadgeTone,
    cities: ['Phoenix', 'Sedona'],
    travelers: 5,
    cover: '🌵',
    budget: '$1,800',
    image: 'https://picsum.photos/seed/14698/800/600',
  },
  {
    name: 'Tokyo Immersion',
    dates: 'Oct 05 – Oct 14, 2026',
    status: 'Planning',
    tone: 'green' as BadgeTone,
    cities: ['Kyoto', 'Osaka', 'Tokyo'],
    travelers: 3,
    cover: '🌸',
    budget: '$6,500',
    image: 'https://picsum.photos/seed/14939/800/600',
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
    image: 'https://picsum.photos/seed/15075/800/600',
  },
  {
    name: 'Montreal Food Week',
    dates: 'Nov 01 – Nov 07, 2026',
    status: 'Planning',
    tone: 'gray' as BadgeTone,
    cities: ['Vancouver', 'Whistler'],
    travelers: 6,
    cover: '🏔️',
    budget: '$2,200',
    image: 'https://picsum.photos/seed/15595/800/600',
  },
]

const itemVariants = fadeUpVariants
const fallbackTripImage = 'https://picsum.photos/seed/traveloop/800/600'

const getSafeImageSrc = (value: string, fallback: string) => {
  if (!value) {
    return fallback
  }

  const baseOrigin = typeof window === 'undefined' ? 'https://example.com' : window.location.origin
  const normalizedValue = value.trim()

  if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(normalizedValue)) {
    return normalizedValue
  }

  try {
    const url = new URL(normalizedValue, baseOrigin)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.href
    }
  } catch {
    return fallback
  }

  return fallback
}

function MyTripsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [allTrips, setAllTrips] = useState(trips)

  useEffect(() => {
    const customTrips = JSON.parse(localStorage.getItem('traveloop_custom_trips') || '[]')
    setAllTrips([...customTrips, ...trips])
    const t = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

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
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${f === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse border border-gray-100" />)}
        </div>
      ) : (
        <>
          {/* Trips grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {allTrips.map((trip, i) => (
              <motion.div
                key={trip.name + i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="group cursor-pointer flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* Card cover */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    loading="lazy"
                    src={getSafeImageSrc(trip.image, fallbackTripImage)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    alt={trip.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="absolute top-4 right-4 text-3xl filter drop-shadow-md">{trip.cover}</div>
                  <Badge tone={trip.tone} className="absolute bottom-4 left-4 shadow-sm backdrop-blur-md bg-opacity-90">
                    {trip.status}
                  </Badge>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{trip.name}</h3>
                  <p className="mt-1.5 flex items-center text-sm font-medium text-gray-500">
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    {trip.dates}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Map className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      {trip.cities.join(' · ')}
                    </div>
                    <div className="flex -space-x-2 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex w-full justify-between items-center">
                        <div className="flex -space-x-2">
                          {[...Array(trip.travelers)].map((_, j) => (
                            <img
                              key={j}
                              src={`https://i.pravatar.cc/150?img=${j + Math.floor(Math.random() * 50)}`}
                              alt="traveler"
                              className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 object-cover shadow-sm"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                          {trip.budget}
                        </span>
                      </div>
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
              custom={allTrips.length}
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
        </>
      )}
    </PageShell>
  )
}

export default MyTripsPage
