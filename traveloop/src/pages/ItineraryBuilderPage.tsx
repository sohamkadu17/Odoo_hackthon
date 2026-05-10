import { motion } from 'framer-motion'
import {
  GripVertical,
  Plus,
  Sparkles,
  Clock,
  DollarSign,
  Plane,
  ChevronRight,
  Lightbulb,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'
import { fadeLeftVariants } from '../utils/variants'

type BadgeTone = 'green' | 'amber'

const initialStops = [
  {
    city: 'Lisbon',
    dates: 'Jun 12 – Jun 15',
    nights: '3 nights',
    status: 'Locked',
    tone: 'green' as BadgeTone,
    activities: ['Belém Tower', 'LX Factory market', 'Alfama evening walk'],
    budget: '$640',
  },
  {
    city: 'Sintra',
    dates: 'Jun 15 – Jun 17',
    nights: '2 nights',
    status: 'Draft',
    tone: 'amber' as BadgeTone,
    activities: ['Pena Palace', 'Quinta da Regaleira'],
    budget: '$380',
  },
  {
    city: 'Cascais',
    dates: 'Jun 17 – Jun 18',
    nights: '1 night',
    status: 'Draft',
    tone: 'amber' as BadgeTone,
    activities: ['Boca do Inferno', 'Seafood lunch'],
    budget: '$210',
  },
]

const initialActivityPool = [
  { name: 'Sunset sail on the Tagus', duration: '2h', price: '$45' },
  { name: 'Azulejo tile workshop', duration: '3h', price: '$65' },
  { name: 'Historic tram ride (Line 28)', duration: '1h', price: '$15' },
  { name: 'Mercado da Ribeira food tour', duration: '2.5h', price: '$55' },
]

const itemVariants = fadeLeftVariants

const initialSuggestions = [
  'Add a half-day food tour in Lisbon on day 2.',
  'Book a sunset sail on the final evening.',
  'Visit Jerónimos Monastery in the morning (less crowded).',
]

function ItineraryBuilderPage() {
  const [stops, setStops] = useState(initialStops)
  const [activityPool, setActivityPool] = useState(initialActivityPool)
  const [suggestions, setSuggestions] = useState(initialSuggestions)

  const handleAddStop = () => {
    const newCity = prompt('Enter city name:')
    if (!newCity) return
    setStops([...stops, {
      city: newCity,
      dates: 'TBD',
      nights: '1 night',
      status: 'Draft',
      tone: 'amber',
      activities: [],
      budget: '$0'
    }])
    toast.success('Stop added!')
  }

  const handleAddActivity = () => {
    const name = prompt('Enter activity name:')
    if (!name) return
    setActivityPool([...activityPool, { name, duration: '2h', price: '$0' }])
    toast.success('Activity added!')
  }

  const handleAddSuggestion = (s: string, index: number) => {
    setActivityPool([...activityPool, { name: s, duration: 'TBD', price: 'TBD' }])
    setSuggestions(suggestions.filter((_, i) => i !== index))
    toast.success('Suggestion added to Activity Pool!')
  }

  return (
    <PageShell
      title="Itinerary Builder"
      subtitle="Add cities, dates, and activities to assemble the full trip."
      actions={
        <>
          <Button variant="secondary" icon={<Sparkles className="h-4 w-4" />} onClick={() => toast.success('Auto-planned successfully!')}>
            Auto-plan day
          </Button>
          <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={handleAddStop}>
            Add stop
          </Button>
        </>
      }
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Stops timeline</h3>
          <p>Drag to reorder cities and adjust travel dates.</p>
        </div>
        <div className="mt-3 h-2 rounded-full bg-gray-100">
          <div className="h-2 w-[38%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Stops timeline */}
        <WireCard
          title="Stops Timeline"
          description="Drag to reorder cities and adjust travel dates."
          actions={
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700" onClick={() => toast.success('Route optimized via AI!')}>
              Optimize route
            </button>
          }
        >
          <div className="space-y-4">
            {stops.map((stop, i) => (
              <motion.div
                key={stop.city}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Connector */}
                {i > 0 && (
                  <div className="ml-6 h-4 w-px bg-gradient-to-b from-blue-300 to-transparent" />
                )}
                <div className="flex gap-3">
                  {/* Drag handle */}
                  <div className="mt-3 flex cursor-grab items-center text-gray-300">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white">
                            {i + 1}
                          </div>
                          <h3 className="text-base font-semibold text-gray-900">{stop.city}</h3>
                          <Badge tone={stop.tone}>{stop.status}</Badge>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {stop.dates}
                          </span>
                          <span>·</span>
                          <span>{stop.nights}</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {stop.budget}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toast(`Editing stop: ${stop.city}`)}>
                        Edit
                      </Button>
                    </div>
                    {stop.activities.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {stop.activities.map((act) => (
                          <span
                            key={act}
                            className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                          >
                            {act}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add stop */}
            <button 
              className="flex w-full items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-500 transition-all hover:border-blue-300 hover:text-blue-600"
              onClick={handleAddStop}
            >
              <Plus className="mx-auto h-4 w-4" />
              <span>Add another stop</span>
            </button>
          </div>
        </WireCard>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Activity Pool */}
          <WireCard
            title="Activity Pool"
            description="Assign experiences to each stop."
            variant="soft"
            actions={
              <Button variant="ghost" size="sm" icon={<Plus className="h-3.5 w-3.5" />} onClick={handleAddActivity}>
                Add
              </Button>
            }
          >
            <div className="space-y-2">
              {activityPool.map((act, i) => (
                <motion.div
                  key={act.name}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">{act.name}</p>
                    <p className="text-xs text-gray-500">{act.duration} · {act.price}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toast(`Assigning ${act.name} to a stop (coming soon!)`)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </WireCard>

          {/* AI Suggestions */}
          <WireCard
            title="Smart Suggestions"
            description="Auto-generated based on your preferences."
            variant="dashed"
          >
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleAddSuggestion(s, i)}
                  className="flex items-start justify-between gap-2.5 rounded-xl bg-white border border-gray-100 px-3.5 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 hover:border-blue-200 transition-all group"
                >
                  <div className="flex items-start gap-2.5">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {s}
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default ItineraryBuilderPage
