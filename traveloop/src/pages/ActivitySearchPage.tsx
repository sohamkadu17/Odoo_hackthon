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
    duration: '3h', price: '$18', rating: 4.9, reviews: 1420, emoji: '🏰',
  },
  {
    name: 'Azulejo Tile Workshop', city: 'Lisbon', category: 'Culture',
    duration: '3h', price: '$65', rating: 4.8, reviews: 876, emoji: '🎨',
  },
  {
    name: 'Food Market Tasting Tour', city: 'Lisbon', category: 'Food & Dining',
    duration: '2.5h', price: '$55', rating: 4.9, reviews: 2103, emoji: '🥟',
  },
  {
    name: 'Sunset Sail on the Tagus', city: 'Lisbon', category: 'Adventure',
    duration: '2h', price: '$45', rating: 4.7, reviews: 654, emoji: '⛵',
  },
  {
    name: 'Pena Palace Visit', city: 'Sintra', category: 'Culture & History',
    duration: '2.5h', price: '$22', rating: 4.8, reviews: 3421, emoji: '🏯',
  },
  {
    name: 'Historic Tram Ride (Line 28)', city: 'Lisbon', category: 'Culture',
    duration: '1h', price: '$15', rating: 4.6, reviews: 892, emoji: '🚃',
  },
  {
    name: 'Bica Funicular Ride', city: 'Lisbon', category: 'Culture',
    duration: '30min', price: '$4', rating: 4.5, reviews: 445, emoji: '🚡',
  },
  {
    name: 'Portuguese Cooking Class', city: 'Lisbon', category: 'Food & Dining',
    duration: '4h', price: '$95', rating: 4.9, reviews: 312, emoji: '👨‍🍳',
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
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-3xl">
                    {act.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">{act.name}</h3>
                    <p className="mt-0.5 text-xs text-gray-500">{act.city}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {act.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {act.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {act.rating} ({act.reviews.toLocaleString()})
                      </span>
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      <Tag className="h-2.5 w-2.5" />
                      {act.category}
                    </span>
                  </div>
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
