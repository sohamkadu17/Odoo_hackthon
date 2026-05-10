import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

const schedule = [
  {
    day: 'Day 1 - Lisbon',
    items: ['Arrival + hotel check-in', 'Alfama walk', 'Dinner by the river'],
  },
  {
    day: 'Day 2 - Lisbon',
    items: ['Food market tasting', 'Tram ride', 'Sunset viewpoint'],
  },
  {
    day: 'Day 3 - Sintra',
    items: ['Palace tour', 'Garden break', 'Evening train back'],
  },
]

function ItineraryViewPage() {
  return (
    <PageShell
      title="Itinerary View"
      subtitle="Review the trip in timeline or calendar mode."
      actions={
        <>
          <Button variant="ghost">Toggle view</Button>
          <Button>Share itinerary</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <WireCard
          title="Day-by-day layout"
          description="City headers, activity blocks, and time slots."
        >
          <div className="space-y-4">
            {schedule.map((block) => (
              <div
                key={block.day}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {block.day}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </WireCard>
        <div className="space-y-6">
          <WireCard
            title="Cost summary"
            description="Daily totals with highlights for high-spend days."
            variant="soft"
          >
            <div className="space-y-4">
              <ProgressBar label="Day 1" value={42} tone="emerald" />
              <ProgressBar label="Day 2" value={62} tone="amber" />
              <ProgressBar label="Day 3" value={35} tone="sky" />
            </div>
          </WireCard>
          <WireCard
            title="Stay overview"
            description="Hotels, check-ins, and transfers."
            variant="dashed"
          >
            <div className="space-y-3 text-sm text-slate-600">
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3 py-2">
                Lisbon Loft - check-in 3:00 PM
              </div>
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3 py-2">
                Sintra Garden Stay - check-in 5:00 PM
              </div>
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default ItineraryViewPage
