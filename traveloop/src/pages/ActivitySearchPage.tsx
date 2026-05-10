import { motion } from 'framer-motion'
import { Search, Filter, Star, Clock, DollarSign, Plus, Tag } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import { fadeUpVariants } from '../utils/variants'

const categories = [
  { name: 'All', count: 48 },
  { name: 'Food & Dining', count: 12 },
  { name: 'Culture & History', count: 9 },
  { name: 'Adventure', count: 8 },
  { name: 'Wellness', count: 6 },
  { name: 'Nightlife', count: 7 },
  { name: 'Shopping', count: 6 },
]

const activities = [
  {
    name: 'Belém Tower & Jerónimos Monastery', city: 'Lisbon', category: 'Culture & History',
    duration: '3h', price: '$18', rating: 4.9, reviews: 1420, emoji: '🏰', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Azulejo Tile Workshop', city: 'Lisbon', category: 'Culture',
    duration: '3h', price: '$65', rating: 4.8, reviews: 876, emoji: '🎨', image: 'https://images.unsplash.com/photo-1542475017-ebdbbdf0e583?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Food Market Tasting Tour', city: 'Lisbon', category: 'Food & Dining',
    duration: '2.5h', price: '$55', rating: 4.9, reviews: 2103, emoji: '🥟', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Sunset Sail on the Tagus', city: 'Lisbon', category: 'Adventure',
    duration: '2h', price: '$45', rating: 4.7, reviews: 654, emoji: '⛵', image: 'https://images.unsplash.com/photo-1500839216016-01582e3089d3?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Pena Palace Visit', city: 'Sintra', category: 'Culture & History',
    duration: '2.5h', price: '$22', rating: 4.8, reviews: 3421, emoji: '🏯', image: 'https://images.unsplash.com/photo-1544414603-9bb6da0d4b85?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Historic Tram Ride (Line 28)', city: 'Lisbon', category: 'Culture',
    duration: '1h', price: '$15', rating: 4.6, reviews: 892, emoji: '🚃', image: 'https://images.unsplash.com/photo-1516008775432-8dfdf16110f0?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Bica Funicular Ride', city: 'Lisbon', category: 'Culture',
    duration: '30min', price: '$4', rating: 4.5, reviews: 445, emoji: '🚡', image: 'https://images.unsplash.com/photo-1582236522501-c8524317f254?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Portuguese Cooking Class', city: 'Lisbon', category: 'Food & Dining',
    duration: '4h', price: '$95', rating: 4.9, reviews: 312, emoji: '👨‍🍳', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop'
  },
]

const itemVariants = fadeUpVariants

function ActivitySearchPage() {
  return (
    <PageShell
      title="Find Activities"
      eyebrow="Experiences"
      subtitle="Browse curated experiences and add them directly to your itinerary."
    >
      <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
        {/* Sidebar filters */}
        <aside className="space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Categories</h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                      cat.name === 'All'
                        ? 'bg-blue-600 font-semibold text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-xs ${cat.name === 'All' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Price range</h3>
            <div className="space-y-2">
              {[
                { label: 'Free', value: '$0' },
                { label: 'Budget (< $30)', value: '$30' },
                { label: 'Mid-range ($30–$75)', value: '$75' },
                { label: 'Premium (> $75)', value: '$75+' },
              ].map((p) => (
                <label key={p.label} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-blue-600" />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Duration</h3>
            <div className="space-y-2">
              {['< 1 hour', '1–3 hours', '3–6 hours', 'Full day'].map((d) => (
                <label key={d} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-blue-600" />
                  {d}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-5">
          {/* Search bar */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities, experiences…"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <Button onClick={() => toast.success('Added to trip!')} variant="secondary" size="md" icon={<Filter className="h-4 w-4" />}>
              More filters
            </Button>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span><span className="font-semibold text-gray-900">{activities.length}</span> activities found near Lisbon</span>
            <select className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600">
              <option>Sort: Top rated</option>
              <option>Sort: Price ↑</option>
              <option>Sort: Duration</option>
            </select>
          </div>

          {/* Activity cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {activities.map((act, i) => (
              <motion.div
                key={act.name}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={act.image} alt={act.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-gray-900 shadow-sm">
                    {act.emoji} {act.category}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                     <h3 className="text-lg font-bold leading-tight drop-shadow-md">{act.name}</h3>
                     <p className="mt-0.5 text-xs font-medium text-gray-200 drop-shadow-md">{act.city}</p>
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-medium bg-gray-50 px-2 py-1 rounded-md">
                        <Clock className="h-3.5 w-3.5 text-blue-500" />
                        {act.duration}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-gray-900">
                        {act.price}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {act.rating} <span className="text-gray-400">({act.reviews})</span>
                    </span>
                  </div>
                <Button onClick={() => toast.success('Added to trip!')}
                  variant="secondary"
                  size="sm"
                  className="mt-4 w-full"
                  icon={<Plus className="h-3.5 w-3.5" />}
                >
                  Add to itinerary
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default ActivitySearchPage
