import { motion } from 'framer-motion'
import { Plane, Share2, Download, MapPin, Clock, Users, Calendar, Lock } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const sharedItinerary = {
  name: 'Lisbon Loop',
  owner: 'Alex Jordan',
  sharedWith: ['Sarah M.', 'Mike T.', 'Dana K.'],
  dates: 'Jun 12 – Jun 18, 2026',
  cities: ['Lisbon', 'Sintra', 'Cascais'],
  travelers: 4,
  totalDays: 6,
}

const days = [
  {
    label: 'Day 1 — Jun 12', city: 'Lisbon',
    highlights: ['Check-in: Solar do Castelo', 'Alfama evening walk', 'Dinner at Zé da Mouraria'],
  },
  {
    label: 'Day 2 — Jun 13', city: 'Lisbon',
    highlights: ['Belém Tower & Jerónimos Monastery', 'LX Factory market', 'Azulejo tile workshop', 'Sunset sail'],
  },
  {
    label: 'Day 3 — Jun 15', city: 'Sintra',
    highlights: ['Train to Sintra', 'Pena Palace', 'Quinta da Regaleira'],
  },
]

function SharedItineraryPage() {
  return (
    <PageShell
      title={sharedItinerary.name}
      eyebrow="Shared Itinerary"
      subtitle={`Shared by ${sharedItinerary.owner} · ${sharedItinerary.dates}`}
      actions={
        <>
          <Button variant="secondary" icon={<Download className="h-4 w-4" />}>
            Save PDF
          </Button>
          <Button variant="primary" icon={<Share2 className="h-4 w-4" />}>
            Copy link
          </Button>
        </>
      }
    >
      {/* Read-only banner */}
      <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3.5">
        <Lock className="h-4 w-4 shrink-0 text-blue-600" />
        <div>
          <p className="text-sm font-semibold text-blue-900">Shared read-only view</p>
          <p className="text-xs text-blue-700">You can view but not edit this itinerary. Ask {sharedItinerary.owner} for edit access.</p>
        </div>
      </div>

      {/* Trip overview */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Cities', value: sharedItinerary.cities.join(' · '), icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Duration', value: `${sharedItinerary.totalDays} days`, icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Dates', value: sharedItinerary.dates, icon: Calendar, color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: 'Travelers', value: `${sharedItinerary.travelers} people`, icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} shrink-0`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-900 leading-snug">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
        {/* Timeline */}
        <WireCard title="Day-by-Day Plan">
          <div className="space-y-5">
            {days.map((day, i) => (
              <motion.div
                key={day.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shrink-0">
                    {i + 1}
                  </div>
                  {i < days.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-blue-300 to-transparent mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{day.label}</p>
                    <Badge tone="blue">{day.city}</Badge>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {day.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </WireCard>

        {/* Crew info */}
        <div className="space-y-5">
          <WireCard title="Travel Crew" variant="soft">
            <div className="space-y-2.5">
              {[sharedItinerary.owner, ...sharedItinerary.sharedWith].map((name, i) => (
                <div key={name} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3.5 py-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shrink-0">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{i === 0 ? 'Trip organizer' : 'Traveler'}</p>
                  </div>
                  {i === 0 && <Plane className="ml-auto h-4 w-4 text-blue-500" />}
                </div>
              ))}
            </div>
          </WireCard>

          <WireCard title="Actions" variant="dashed">
            <div className="space-y-2">
              <Button variant="secondary" className="w-full" icon={<Download className="h-4 w-4" />}>
                Download PDF
              </Button>
              <Button variant="secondary" className="w-full" icon={<Share2 className="h-4 w-4" />}>
                Copy shareable link
              </Button>
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default SharedItineraryPage
