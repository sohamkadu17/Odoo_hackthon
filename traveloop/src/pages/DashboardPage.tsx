import { motion } from 'framer-motion'
import {
  Plane,
  Map,
  Calendar,
  TrendingUp,
  Sun,
  Users,
  ArrowRight,
  Plus,
  CheckCircle2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'
import { fadeUpVariants } from '../utils/variants'

const statCards = [
  { label: 'Active Trips', value: '3', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+1 this month' },
  { label: 'Days Planned', value: '24', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: 'Across 3 trips' },
  { label: 'Budget Used', value: '68%', icon: TrendingUp, color: 'text-cyan-600', bg: 'bg-cyan-50', trend: '$2,400 of $3,500' },
  { label: 'Crew Members', value: '11', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50', trend: 'Across all trips' },
]

type BadgeTone = 'amber' | 'blue' | 'cyan' | 'green'

const upcomingTrips = [
  {
    name: 'Lisbon Loop',
    dates: 'Jun 12 – Jun 18',
    status: 'Draft',
    tone: 'amber' as BadgeTone,
    cities: 'Lisbon, Sintra, Cascais',
    travelers: '4',
    daysLeft: 33,
  },
  {
    name: 'Nordic Studio',
    dates: 'Jul 02 – Jul 11',
    status: 'Booked',
    tone: 'blue' as BadgeTone,
    cities: 'Copenhagen, Oslo',
    travelers: '2',
    daysLeft: 53,
  },
  {
    name: 'Desert Weekender',
    dates: 'Aug 23 – Aug 25',
    status: 'Shared',
    tone: 'cyan' as BadgeTone,
    cities: 'Phoenix, Sedona',
    travelers: '5',
    daysLeft: 105,
  },
]

const focusTasks = [
  { text: 'Confirm boutique stay in Alfama', done: false },
  { text: 'Add river tour to day 2', done: false },
  { text: 'Lock airport transfer for group', done: false },
  { text: 'Book travel insurance', done: true },
]

const budgetTargets = [
  { label: 'Lodging', value: 72, tone: 'blue' as const },
  { label: 'Dining', value: 48, tone: 'cyan' as const },
  { label: 'Experiences', value: 61, tone: 'indigo' as const },
  { label: 'Transport', value: 35, tone: 'green' as const },
]

const weather = [
  { city: 'Lisbon', temp: '72°F', condition: 'Clear ☀️' },
  { city: 'Sintra', temp: '68°F', condition: 'Windy 🌬️' },
  { city: 'Cascais', temp: '70°F', condition: 'Cloudy ⛅' },
]

const itemVariants = fadeUpVariants

function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      eyebrow="Traveloop"
      subtitle="Your home base for upcoming trips, shared itineraries, and planning focus areas."
      actions={
        <>
          <Button variant="secondary" size="md" icon={<Calendar className="h-4 w-4" />}>
            Sync calendar
          </Button>
          <Link to="/trips/new">
            <Button variant="primary" size="md" icon={<Plus className="h-4 w-4" />}>
              Plan new trip
            </Button>
          </Link>
        </>
      }
    >
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{stat.trend}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Upcoming Trips */}
        <WireCard
          title="Upcoming Trips"
          description="Trip status, cities, and who is traveling."
          actions={
            <Link to="/trips">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          }
        >
          <div className="space-y-3">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.name}
                className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 transition-colors hover:bg-gray-100 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shrink-0">
                    <Plane className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{trip.name}</p>
                      <Badge tone={trip.tone}>{trip.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {trip.dates} · {trip.cities}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="h-3.5 w-3.5" />
                    {trip.travelers}
                  </div>
                  <span className="text-xs font-medium text-blue-600">{trip.daysLeft}d away</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </WireCard>

        {/* Today's Focus */}
        <WireCard
          title="Today's Focus"
          description="Top actions to keep the next trip on track."
          variant="soft"
          actions={
            <Link to="/itinerary/builder">
              <Button variant="ghost" size="sm">
                Open builder
              </Button>
            </Link>
          }
        >
          <ul className="space-y-2">
            {focusTasks.map((task) => (
              <li
                key={task.text}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3.5 py-2.5 text-sm"
              >
                <CheckCircle2
                  className={`h-4 w-4 shrink-0 ${task.done ? 'text-green-500' : 'text-gray-300'}`}
                  strokeWidth={2.5}
                />
                <span className={task.done ? 'line-through text-gray-400' : 'text-gray-700'}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </WireCard>
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Budget */}
        <WireCard
          title="Budget Snapshot"
          description="Spend pacing across the active trip budget."
        >
          <div className="space-y-4">
            {budgetTargets.map((budget) => (
              <ProgressBar
                key={budget.label}
                label={budget.label}
                value={budget.value}
                tone={budget.tone}
              />
            ))}
          </div>
        </WireCard>

        {/* Weather */}
        <WireCard
          title="Weather Watch"
          description="Forecast for upcoming stops."
          variant="dashed"
          actions={
            <Sun className="h-4 w-4 text-amber-500" />
          }
        >
          <div className="space-y-2.5">
            {weather.map((w) => (
              <div
                key={w.city}
                className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-sm border border-gray-100"
              >
                <span className="font-medium text-gray-700">{w.city}</span>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{w.temp}</span>
                  <span className="ml-2 text-gray-500">{w.condition}</span>
                </div>
              </div>
            ))}
          </div>
        </WireCard>

        {/* Crew Pulse */}
        <WireCard
          title="Crew Pulse"
          description="Latest check-ins from your travelers."
          variant="soft"
          actions={
            <Users className="h-4 w-4 text-blue-500" />
          }
        >
          <div className="space-y-2.5">
            {[
              { msg: '3 travelers confirmed dining preferences.', time: '2h ago' },
              { msg: '1 traveler requested accessible transit.', time: '5h ago' },
              { msg: 'Alex shared a hotel suggestion.', time: '1d ago' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-white px-3.5 py-2.5 text-sm"
              >
                <p className="text-gray-700">{item.msg}</p>
                <p className="mt-0.5 text-xs text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default DashboardPage
