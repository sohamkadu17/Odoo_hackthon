import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const stops = [
  {
    city: 'Lisbon',
    dates: 'Jun 12 - Jun 15',
    nights: '3 nights',
    status: 'Locked',
  },
  {
    city: 'Sintra',
    dates: 'Jun 15 - Jun 17',
    nights: '2 nights',
    status: 'Draft',
  },
  {
    city: 'Cascais',
    dates: 'Jun 17 - Jun 18',
    nights: '1 night',
    status: 'Draft',
  },
]

const activityPool = [
  'Sunset sail',
  'Tile workshop',
  'Historic tram ride',
  'Food market tasting',
]

function ItineraryBuilderPage() {
  return (
    <PageShell
      title="Itinerary Builder"
      subtitle="Add cities, dates, and activities to assemble the full trip."
      actions={
        <>
          <Button variant="outline">Auto-plan day</Button>
          <Button>Add stop</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <WireCard
          title="Stops timeline"
          description="Drag to reorder cities and adjust travel dates."
        >
          <div className="space-y-3">
            {stops.map((stop) => (
              <div
                key={stop.city}
                className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {stop.city}
                    </h3>
                    <Badge tone={stop.status === 'Locked' ? 'emerald' : 'amber'}>
                      {stop.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {stop.dates} - {stop.nights}
                  </p>
                </div>
                <Button variant="ghost">Edit stop</Button>
              </div>
            ))}
          </div>
        </WireCard>

        <div className="space-y-6">
          <WireCard
            title="Activity pool"
            description="Assign experiences to each stop."
            variant="soft"
          >
            <div className="space-y-2">
              {activityPool.map((activity) => (
                <div
                  key={activity}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2 text-sm text-slate-600"
                >
                  <span>{activity}</span>
                  <Button variant="ghost">Add</Button>
                </div>
              ))}
            </div>
          </WireCard>

          <WireCard
            title="Suggestions"
            description="Auto-generated based on your preferences."
            variant="dashed"
          >
            <div className="space-y-3 text-sm text-slate-600">
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3 py-2">
                Add a half-day food tour in Lisbon.
              </div>
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3 py-2">
                Book a sunset sail on the final night.
              </div>
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default ItineraryBuilderPage
