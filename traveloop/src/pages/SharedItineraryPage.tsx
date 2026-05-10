import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const highlights = [
  '3 cities, 6 nights',
  '8 activities scheduled',
  'Budget estimate $1,480 per traveler',
]

function SharedItineraryPage() {
  return (
    <PageShell
      title="Shared Itinerary"
      subtitle="Public view for sharing or copying a trip."
      actions={
        <>
          <Button variant="ghost">Copy trip</Button>
          <Button>Request access</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <WireCard
          title="Read-only plan"
          description="Timeline, highlights, and activity lineup."
        >
          <div className="space-y-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </WireCard>
        <div className="space-y-6">
          <WireCard
            title="Share tools"
            description="Public URL and social media options."
            variant="soft"
          >
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Share link
              <input
                type="text"
                value="https://traveloop.app/share/4821"
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600"
              />
            </label>
            <Button variant="outline" className="w-full">
              Copy link
            </Button>
          </WireCard>
          <WireCard
            title="Collaborators"
            description="People who can view this itinerary."
            variant="dashed"
          >
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Avery Chen</span>
                <span className="font-semibold text-slate-900">Owner</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Jamie Park</span>
                <span className="font-semibold text-slate-900">Viewer</span>
              </div>
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default SharedItineraryPage
