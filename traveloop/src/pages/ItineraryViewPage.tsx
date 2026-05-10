import { motion } from 'framer-motion'
import { TracingBeam } from '../components/TracingBeam'
import {
  Plane,
  Share2,
  Download,
  Clock,
  DollarSign,
  MapPin,
  ChevronRight,
  Users,
  Calendar,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

type BadgeTone = 'green' | 'blue' | 'cyan'

const timeline = [
  {
    day: 'Day 1 — Jun 12',
    city: 'Lisbon',
    events: [
      { time: '09:00', title: 'Arrive at Lisbon Airport', type: 'Transport', cost: '$0' },
      { time: '11:30', title: 'Check-in: Solar do Castelo Boutique', type: 'Lodging', cost: '$180', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=250&auto=format&fit=crop' },
      { time: '14:00', title: 'Alfama neighborhood walk', type: 'Activity', cost: '$0', image: 'https://images.unsplash.com/photo-1582236522501-c8524317f254?q=80&w=250&auto=format&fit=crop' },
      { time: '19:00', title: 'Dinner at Zé da Mouraria', type: 'Dining', cost: '$45', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=250&auto=format&fit=crop' },
    ],
  },
  {
    day: 'Day 2 — Jun 13',
    city: 'Lisbon',
    events: [
      { time: '09:30', title: 'Belém Tower & Jerónimos Monastery', type: 'Activity', cost: '$18', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=250&auto=format&fit=crop' },
      { time: '13:00', title: 'LX Factory market lunch', type: 'Dining', cost: '$30', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=250&auto=format&fit=crop' },
      { time: '16:00', title: 'Azulejo tile workshop', type: 'Activity', cost: '$65', image: 'https://images.unsplash.com/photo-1542475017-ebdbbdf0e583?q=80&w=250&auto=format&fit=crop' },
      { time: '20:00', title: 'Sunset sail on the Tagus', type: 'Activity', cost: '$45', image: 'https://images.unsplash.com/photo-1500839216016-01582e3089d3?q=80&w=250&auto=format&fit=crop' },
    ],
  },
  {
    day: 'Day 3 — Jun 15',
    city: 'Sintra',
    events: [
      { time: '08:00', title: 'Train to Sintra (CP Rail)', type: 'Transport', cost: '$8' },
      { time: '10:00', title: 'Pena Palace visit', type: 'Activity', cost: '$22', image: 'https://images.unsplash.com/photo-1544414603-9bb6da0d4b85?q=80&w=250&auto=format&fit=crop' },
      { time: '14:30', title: 'Quinta da Regaleira gardens', type: 'Activity', cost: '$18', image: 'https://images.unsplash.com/photo-1565620731358-e8c038392eb1?q=80&w=250&auto=format&fit=crop' },
      { time: '19:00', title: 'Dinner at Tascantiga', type: 'Dining', cost: '$55', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=250&auto=format&fit=crop' },
    ],
  },
]

const expenses = [
  { category: 'Lodging', amount: '$640', percent: 52, color: 'bg-blue-500' },
  { category: 'Activities', amount: '$285', percent: 23, color: 'bg-cyan-500' },
  { category: 'Dining', amount: '$230', percent: 19, color: 'bg-indigo-500' },
  { category: 'Transport', amount: '$75', percent: 6, color: 'bg-teal-500' },
]

const eventTypeColors: Record<string, string> = {
  Transport: 'bg-gray-100 text-gray-600',
  Lodging: 'bg-blue-100 text-blue-700',
  Activity: 'bg-indigo-100 text-indigo-700',
  Dining: 'bg-amber-100 text-amber-700',
}

const cityBadges: Record<string, BadgeTone> = {
  Lisbon: 'blue',
  Sintra: 'cyan',
  Cascais: 'green',
}

function ItineraryViewPage() {
  const totalExpenses = '$1,230'

  return (
    <PageShell
      title="Lisbon Loop"
      eyebrow="Itinerary View"
      subtitle="Jun 12 – 18, 2026 · Lisbon, Sintra, Cascais · 4 travelers"
      actions={
        <>
          <Button variant="secondary" icon={<Share2 className="h-4 w-4" />} onClick={() => toast.success('Share link copied to clipboard!')}>
            Share
          </Button>
          <Button variant="secondary" icon={<Download className="h-4 w-4" />} onClick={() => toast.success('Downloading Itinerary...')}>
            Export PDF
          </Button>
          <Button variant="primary" icon={<Plane className="h-4 w-4" />} onClick={() => toast.success('Booking flights...')}>
            Edit in Builder
          </Button>
        </>
      }
    >
      {/* Meta strip */}
      <div className="flex flex-wrap gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span>Jun 12 – Jun 18, 2026</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4 text-indigo-500" />
          <span>6 days</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-4 w-4 text-cyan-500" />
          <span>4 travelers</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="h-4 w-4 text-teal-500" />
          <span>Budget: $3,200 · Spent: {totalExpenses}</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {['Lisbon', 'Sintra', 'Cascais'].map((city) => (
            <Badge key={city} tone={cityBadges[city] || 'blue'}>
              <MapPin className="mr-0.5 inline h-2.5 w-2.5" />
              {city}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
        {/* Timeline */}
        <div className="relative">
          <TracingBeam className="px-2 md:px-6">
            <div className="space-y-6">
              {timeline.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1, duration: 0.4 }}
            >
              {/* Day header */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shrink-0">
                  {dayIndex + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{day.day}</p>
                  <p className="text-xs text-gray-500">{day.city}</p>
                </div>
              </div>

              {/* Events */}
              <div className="ml-10 space-y-2">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition-all hover:shadow-md"
                  >
                    {/* Time */}
                    <div className="w-12 shrink-0 text-xs font-semibold text-gray-400">
                      {event.time}
                    </div>
                    {/* Connector dot */}
                    <div className="relative shrink-0">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      {eventIndex < day.events.length - 1 && (
                        <div className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-200 to-transparent" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 items-center justify-between gap-4 min-w-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {event.image && (
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg shadow-sm border border-gray-100 hidden sm:block">
                            <img src={event.image} alt={event.title} loading="lazy" className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                          <span className={`inline-block mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium ${eventTypeColors[event.type] || 'bg-gray-100 text-gray-600'}`}>
                            {event.type}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <span className="text-sm font-semibold text-gray-700">{event.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          </div>
        </TracingBeam>
      </div>

        {/* Expense Sidebar */}
        <div className="space-y-5">
          <WireCard title="Expense Breakdown" eyebrow="Budget">
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <p className="text-xs text-gray-500">Total spent</p>
                <p className="text-2xl font-bold text-gray-900">{totalExpenses}</p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 flex">
                {expenses.map((e) => (
                  <div
                    key={e.category}
                    className={`h-full ${e.color} transition-all`}
                    style={{ width: `${e.percent}%` }}
                  />
                ))}
              </div>
              <div className="space-y-2 pt-1">
                {expenses.map((e) => (
                  <div key={e.category} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${e.color}`} />
                      <span className="text-gray-600">{e.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{e.amount}</span>
                      <span className="text-xs text-gray-400">{e.percent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WireCard>

          {/* Quick actions */}
          <WireCard title="Quick Actions" variant="soft">
            <div className="space-y-2">
              {[
                { label: 'Download PDF', icon: Download },
                { label: 'Share with crew', icon: Share2 },
                { label: 'Switch to builder', icon: Plane },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    onClick={() => toast.success(action.label + ' triggered!')}
                    className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-blue-500" />
                      {action.label}
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                )
              })}
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default ItineraryViewPage
