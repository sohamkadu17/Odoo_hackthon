import { motion } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Plus,
  ChevronRight,
  Plane,
  Lightbulb,
  Search,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const destinations = [
  { name: 'Lisbon', country: 'Portugal', emoji: '🏰', popular: true },
  { name: 'Copenhagen', country: 'Denmark', emoji: '🧜', popular: true },
  { name: 'Kyoto', country: 'Japan', emoji: '⛩️', popular: false },
  { name: 'Santorini', country: 'Greece', emoji: '🌊', popular: true },
  { name: 'Montreal', country: 'Canada', emoji: '🍁', popular: false },
  { name: 'Cape Town', country: 'South Africa', emoji: '🦁', popular: false },
]

const suggestions = [
  { text: 'Paris + Amsterdam + Brussels — Classic European circuit (10 days)', budget: '$4,200', emoji: '🗼' },
  { text: 'Tokyo + Osaka + Kyoto — Golden route (12 days)', budget: '$5,800', emoji: '⛩️' },
  { text: 'Lisbon + Porto + Sintra — Compact Portugal (6 days)', budget: '$2,400', emoji: '🦁' },
]

function CreateTripPage() {
  return (
    <PageShell
      title="Plan a New Trip"
      eyebrow="Traveloop"
      subtitle="Choose your destination, set dates, and let's build your perfect journey."
    >
      {/* Step 1: Basic info */}
      <WireCard title="Trip Details" eyebrow="Step 1">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Trip name</label>
            <input
              type="text"
              placeholder="e.g. Nordic Summer 2026"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Number of travelers</label>
            <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>1 traveler</option>
              <option>2 travelers</option>
              <option>3–5 travelers</option>
              <option>6+ travelers</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Start date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-9 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">End date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-9 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Budget (optional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </WireCard>

      {/* Step 2: Destination selection */}
      <WireCard title="Choose Destinations" eyebrow="Step 2" description="Select one or more cities for your trip.">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations…"
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Destination grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <motion.label
              key={dest.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:bg-blue-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <input type="checkbox" className="sr-only" />
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 text-xl shrink-0">
                {dest.emoji}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{dest.name}</p>
                  {dest.popular && (
                    <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-700">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{dest.country}</p>
              </div>
              <div className="ml-auto">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 transition-all group-has-[:checked]:border-blue-500 group-has-[:checked]:bg-blue-500">
                  <MapPin className="h-2.5 w-2.5 text-transparent transition-colors group-has-[:checked]:text-white" />
                </div>
              </div>
            </motion.label>
          ))}
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
          <Plus className="h-4 w-4" />
          Add custom destination
        </button>
      </WireCard>

      {/* Step 3: Suggested itineraries */}
      <WireCard
        title="Suggested Itineraries"
        eyebrow="Step 3"
        description="Auto-generated routes based on popular travel patterns."
        variant="dashed"
      >
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-xl">
                {s.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-snug">{s.text}</p>
                <p className="mt-0.5 text-xs font-semibold text-blue-600">{s.budget}</p>
              </div>
              <Button variant="secondary" size="sm" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
                Use
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <p className="text-xs text-blue-700">
            Suggestions are personalized based on popular travel patterns and your previous trips.
          </p>
        </div>
      </WireCard>

      {/* CTA */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary">Save as draft</Button>
        <Link to="/itinerary/builder">
          <Button variant="primary" icon={<Plane className="h-4 w-4" />}>
            Start building itinerary
          </Button>
        </Link>
      </div>
    </PageShell>
  )
}

export default CreateTripPage
