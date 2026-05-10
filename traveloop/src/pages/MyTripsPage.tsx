import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

const trips = [
  {
    name: 'Lisbon Loop',
    dates: 'Jun 12 - Jun 18',
    cities: ['Lisbon', 'Sintra', 'Cascais'],
    status: 'Draft',
    tone: 'amber' as const,
    progress: 42,
  },
  {
    name: 'Nordic Studio',
    dates: 'Jul 02 - Jul 11',
    cities: ['Copenhagen', 'Oslo'],
    status: 'Booked',
    tone: 'emerald' as const,
    progress: 88,
  },
  {
    name: 'Desert Weekender',
    dates: 'Aug 23 - Aug 25',
    cities: ['Phoenix', 'Sedona'],
    status: 'Shared',
    tone: 'sky' as const,
    progress: 63,
  },
]

function MyTripsPage() {
  return (
    <PageShell
      title="My Trips"
      subtitle="Manage all trips, edit details, or jump back into planning."
      actions={
        <>
          <Button variant="outline">Filter trips</Button>
          <Button>New trip</Button>
        </>
      }
    >
      <WireCard
        title="Trip library"
        description="Quick resume, status, and planning progress."
      >
        <div className="grid gap-4">
          {trips.map((trip) => (
            <div
              key={trip.name}
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {trip.name}
                    </h3>
                    <Badge tone={trip.tone}>{trip.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">{trip.dates}</p>
                </div>
                <Button variant="ghost">Open</Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                {trip.cities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1"
                  >
                    {city}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <ProgressBar
                  value={trip.progress}
                  label="Planning progress"
                  tone={trip.tone === 'amber' ? 'amber' : 'emerald'}
                />
              </div>
            </div>
          ))}
        </div>
      </WireCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <WireCard
          title="Filters"
          description="Sort by status, timeline, or traveler count."
          variant="soft"
        >
          <div className="flex flex-wrap gap-2">
            {['Upcoming', 'Drafts', 'Shared', 'Archived', 'Group trips'].map(
              (filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {filter}
                </span>
              ),
            )}
          </div>
        </WireCard>
        <WireCard
          title="Quick stats"
          description="A snapshot of your active planning."
          variant="dashed"
        >
          <div className="grid gap-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Active trips</span>
              <span className="font-semibold text-slate-900">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Trips shared</span>
              <span className="font-semibold text-slate-900">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Drafts in progress</span>
              <span className="font-semibold text-slate-900">2</span>
            </div>
          </div>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default MyTripsPage
