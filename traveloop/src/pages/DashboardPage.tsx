import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Map,
  Calendar,
  TrendingUp,
  Sun,
  Users,
  Plus,
  CheckCircle2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import TiltCard from '../components/TiltCard'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

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
    image: 'https://images.unsplash.com/photo-1548765278-6515cb539ddc?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Nordic Studio',
    dates: 'Jul 02 – Jul 11',
    status: 'Booked',
    tone: 'blue' as BadgeTone,
    cities: 'Copenhagen, Oslo',
    travelers: '2',
    daysLeft: 53,
    image: 'https://images.unsplash.com/photo-1513622470522-26cb3cd41d3b?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Desert Weekender',
    dates: 'Aug 23 – Aug 25',
    status: 'Shared',
    tone: 'cyan' as BadgeTone,
    cities: 'Phoenix, Sedona',
    travelers: '5',
    daysLeft: 105,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
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

function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <PageShell
      title="Dashboard"
      eyebrow="Traveloop"
      subtitle="Your home base for upcoming trips, shared itineraries, and planning focus areas."
      actions={
        <>
          <Button variant="secondary" size="md" icon={<Calendar className="h-4 w-4" />} onClick={() => toast.success('Calendar synced successfully!')}>
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
      {isLoading ? (
        <div className="space-y-6 animate-pulse mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-200 rounded-2xl" />)}
          </div>
          <div className="grid gap-6 md:grid-cols-[1.5fr,1fr]">
            <div className="h-[400px] bg-gray-200 rounded-3xl" />
            <div className="h-[400px] bg-gray-200 rounded-3xl" />
          </div>
        </div>
      ) : (
        <>
          {/* Dashboard Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative mb-8 h-64 w-full overflow-hidden rounded-3xl shadow-md"
          >
             <img 
               src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000&auto=format&fit=crop" 
               className="absolute inset-0 h-full w-full object-cover transition-transform duration-[4s] group-hover:scale-105" 
               alt="Tropical beach scene"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent" />
             <div className="absolute bottom-6 left-8 flex w-full max-w-2xl flex-col items-start gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">
                   Welcome back, Explorer.
                </h1>
                <p className="text-stone-300 text-lg font-medium">
                   You have 3 upcoming adventures. The world is waiting.
                </p>
             </div>
          </motion.div>

          {/* Stats row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <TiltCard key={stat.label}>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
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
              </div>
            </TiltCard>
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
          <div className="space-y-4">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.name}
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-5 pb-5 pt-20 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 sm:h-[180px] sm:pt-0"
              >
                <img 
                  src={trip.image} 
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[3s] group-hover:opacity-90 group-hover:scale-110" 
                  alt={trip.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                
                <div className="relative z-10 w-full">
                  <div className="flex w-full items-end justify-between">
                    <div>
                      <Badge tone={trip.tone} className="mb-2 border-none bg-white/20 text-white backdrop-blur-md">
                        {trip.status}
                      </Badge>
                      <h3 className="text-xl font-bold tracking-tight text-white mb-0.5">{trip.name}</h3>
                      <p className="text-sm font-medium text-stone-300">
                        {trip.dates} · {trip.cities}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3 text-right">
                      <span className="rounded-full bg-blue-600/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                        {trip.daysLeft}d away
                      </span>
                      <div className="flex -space-x-2">
                        {[...Array(Number(trip.travelers))].map((_, idx) => (
                          <img key={idx} src={`https://i.pravatar.cc/150?img=${idx + Math.floor(Math.random() * 40)}`} alt="Traveler avatar" loading="lazy" className="h-8 w-8 rounded-full border-2 border-stone-800 bg-stone-300 shadow-sm object-cover" />
                        ))}
                      </div>
                    </div>
                  </div>
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
        </>
      )}
    </PageShell>
  )
}

export default DashboardPage
