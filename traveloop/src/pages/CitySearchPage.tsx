import { motion } from 'framer-motion'
import { Search, Filter, Star, MapPin, TrendingUp, Globe } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import { fadeUpVariants } from '../utils/variants'

const cities = [
  { name: 'Lisbon', country: 'Portugal', rating: 4.9, trips: 342, tags: ['Culture', 'Food', 'History'], emoji: '🏰', trending: true, image: 'https://images.unsplash.com/photo-1548765278-6515cb539ddc?q=80&w=800&auto=format&fit=crop' },
  { name: 'Kyoto', country: 'Japan', rating: 4.8, trips: 298, tags: ['Temples', 'Culture', 'Food'], emoji: '⛩️', trending: false, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Copenhagen', country: 'Denmark', rating: 4.7, trips: 215, tags: ['Design', 'Food', 'Cycling'], emoji: '🧜', trending: true, image: 'https://images.unsplash.com/photo-1513622470522-26cb3cd41d3b?q=80&w=800&auto=format&fit=crop' },
  { name: 'Santorini', country: 'Greece', rating: 4.9, trips: 387, tags: ['Beaches', 'Romance', 'Views'], emoji: '🌊', trending: false, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Montreal', country: 'Canada', rating: 4.6, trips: 178, tags: ['Food', 'Arts', 'Bilingual'], emoji: '🍁', trending: false, image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Cape Town', country: 'South Africa', rating: 4.8, trips: 203, tags: ['Nature', 'Wine', 'Adventure'], emoji: '🦁', trending: true, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=800&auto=format&fit=crop' },
  { name: 'Seville', country: 'Spain', rating: 4.7, trips: 264, tags: ['Flamenco', 'Architecture', 'Tapas'], emoji: '💃', trending: false, image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Chiang Mai', country: 'Thailand', rating: 4.6, trips: 192, tags: ['Temples', 'Food', 'Nature'], emoji: '🏯', trending: true, image: 'https://images.unsplash.com/photo-1598971868351-40e94bb5a9cb?q=80&w=800&auto=format&fit=crop' },
  { name: 'Buenos Aires', country: 'Argentina', rating: 4.5, trips: 147, tags: ['Tango', 'Steak', 'Culture'], emoji: '🥩', trending: false, image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=800&auto=format&fit=crop' },
]

const itemVariants = fadeUpVariants

function CitySearchPage() {
  return (
    <PageShell
      title="Explore Cities"
      eyebrow="Destinations"
      subtitle="Discover top destinations for your next trip — filter by region, budget, and travel style."
    >
      {/* Search & filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cities, countries, regions…"
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Any region</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>Americas</option>
              <option>Africa</option>
            </select>
            <select className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Sort: Popular</option>
              <option>Sort: Rating</option>
              <option>Sort: A–Z</option>
            </select>
            <Button variant="secondary" size="md" icon={<Filter className="h-4 w-4" />} onClick={() => toast.success('Filters opened!')}>
              Filters
            </Button>
          </div>
        </div>

        {/* Quick filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {['All', 'Trending 🔥', 'Europe', 'Asia', 'Beach', 'Culture', 'Adventure', 'Food & Wine'].map((tag) => (
            <button
              key={tag}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                tag === 'All'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Trending banner */}
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3.5">
        <TrendingUp className="h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <p className="text-sm font-semibold text-amber-900">Trending this season</p>
          <p className="text-xs text-amber-700">Copenhagen, Cape Town, and Chiang Mai are seeing booking surges.</p>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{cities.length}</span> destinations found
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Globe className="h-4 w-4" />
          <span>Worldwide coverage</span>
        </div>
      </div>

      {/* City grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city, i) => (
          <motion.div
            key={city.name}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
          >
            {/* Cover */}
            <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gray-100">
              <img src={city.image} alt={city.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-3xl filter drop-shadow-md">
                 {city.emoji}
              </div>
              {city.trending && (
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-amber-900 shadow-sm">
                  🔥 Trending
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{city.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {city.country}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-gray-900">{city.rating}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {city.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{city.trips} trips planned</span>
                <Button variant="primary" size="sm" onClick={() => toast.success('Added to trip!')}>
                  Add to trip
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  )
}

export default CitySearchPage
