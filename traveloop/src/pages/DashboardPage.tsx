import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

const upcomingTrips = [
  {
    name: 'Lisbon Loop',
    dates: 'Jun 12 - Jun 18',
    status: 'Draft',
    tone: 'amber' as const,
    cities: 'Lisbon, Sintra',
    travelers: '4 travelers',
  },
  {
    name: 'Nordic Studio',
    dates: 'Jul 02 - Jul 11',
    status: 'Booked',
    tone: 'emerald' as const,
    cities: 'Copenhagen, Oslo',
    travelers: '2 travelers',
  },
  {
    name: 'Desert Weekender',
    dates: 'Aug 23 - Aug 25',
    status: 'Shared',
    tone: 'sky' as const,
    cities: 'Phoenix, Sedona',
    travelers: '5 travelers',
  },
]

const focusTasks = [
  'Confirm boutique stay in Alfama',
  'Add river tour to day 2',
  'Lock airport transfer for group',
]

const budgetTargets = [
  { label: 'Lodging', value: 72, tone: 'emerald' as const },
  { label: 'Dining', value: 48, tone: 'sky' as const },
  { label: 'Experiences', value: 61, tone: 'amber' as const },
]

function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      subtitle="Your home base for upcoming trips, shared itineraries, and planning focus areas."
      actions={
        <>
          <Button variant="outline">Sync calendar</Button>
          <Button>Plan new trip</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <WireCard
          title="Upcoming trips"
          description="Trip status, cities, and who is traveling."
        >
          <div className="space-y-3">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.name}
                className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-semibold text-slate-900">
                      {trip.name}
                    </p>
                    <Badge tone={trip.tone}>{trip.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {trip.dates} - {trip.cities}
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-600">
                  {trip.travelers}
                </div>
              </div>
            ))}
          </div>
        </WireCard>
        <WireCard
          title="Today focus"
          description="Top actions to keep the next trip on track."
          variant="soft"
        >
          <ul className="space-y-2 text-sm text-slate-600">
            {focusTasks.map((task) => (
              <li
                key={task}
                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
          <Button variant="ghost">Open itinerary builder</Button>
        </WireCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <WireCard
          title="Budget snapshot"
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
        <WireCard
          title="Weather watch"
          description="Forecast highlights for upcoming stops."
          variant="dashed"
        >
          <div className="grid gap-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Lisbon</span>
              <span className="font-semibold text-slate-900">72F / Clear</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sintra</span>
              <span className="font-semibold text-slate-900">68F / Windy</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cascais</span>
              <span className="font-semibold text-slate-900">70F / Cloudy</span>
            </div>
          </div>
        </WireCard>
        <WireCard
          title="Crew pulse"
          description="Check-ins from your travelers."
          variant="soft"
        >
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
              3 travelers confirmed their dining preferences.
            </div>
            <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
              1 traveler requested accessible transit options.
            </div>
          </div>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default DashboardPage
