import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

function CreateTripPage() {
  return (
    <PageShell
      title="Create Trip"
      subtitle="Start a new itinerary with dates, a name, and optional cover photo."
      actions={<Button>Save trip</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <WireCard
          title="Trip details"
          description="Trip name, description, and cover photo."
        >
          <form className="space-y-4">
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Trip name
              <input
                type="text"
                placeholder="Summer in Lisbon"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Description
              <textarea
                rows={4}
                placeholder="Add a short summary for the crew."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Cover photo
              <input
                type="file"
                className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500"
              />
            </label>
          </form>
        </WireCard>

        <WireCard
          title="Dates and pace"
          description="Pick a date range and travel rhythm."
          variant="soft"
        >
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 text-sm font-semibold text-slate-700">
                Start date
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
              <label className="block space-y-2 text-sm font-semibold text-slate-700">
                End date
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
            </div>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Travel pace
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                <option>Balanced</option>
                <option>Fast-paced</option>
                <option>Relaxed</option>
              </select>
            </label>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              Suggested: 2-3 nights per city for a balanced pace.
            </div>
          </div>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default CreateTripPage
