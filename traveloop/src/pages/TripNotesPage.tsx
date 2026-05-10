import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const notes = [
  {
    title: 'Confirm airport pickup',
    date: 'May 10',
    tag: 'Logistics',
  },
  {
    title: 'Dinner reservation in Alfama',
    date: 'May 08',
    tag: 'Dining',
  },
  {
    title: 'Pack rain layers for Sintra',
    date: 'May 06',
    tag: 'Packing',
  },
]

function TripNotesPage() {
  return (
    <PageShell
      title="Trip Notes"
      subtitle="Capture reminders tied to trips or specific stops."
      actions={
        <>
          <Button variant="outline">Filter</Button>
          <Button>New note</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <WireCard
          title="Notes list"
          description="Chronological notes with tags and timestamps."
        >
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.title}
                className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {note.title}
                  </p>
                  <p className="text-xs text-slate-500">{note.date}</p>
                </div>
                <Badge tone="sky">{note.tag}</Badge>
              </div>
            ))}
          </div>
        </WireCard>
        <WireCard
          title="Quick add"
          description="Draft new reminders without leaving the trip."
          variant="soft"
        >
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            Note
            <textarea
              rows={5}
              placeholder="Add a reminder or idea."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <Button className="w-full">Save note</Button>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default TripNotesPage
