import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const checklist = [
  { item: 'Passport + ID', category: 'Documents', checked: true },
  { item: 'Travel adapter', category: 'Electronics', checked: false },
  { item: 'Comfortable walking shoes', category: 'Clothing', checked: false },
  { item: 'Refillable water bottle', category: 'Essentials', checked: true },
]

const categories = ['Clothing', 'Documents', 'Electronics', 'Toiletries']

function PackingChecklistPage() {
  return (
    <PageShell
      title="Packing Checklist"
      subtitle="Keep track of essentials with reusable lists."
      actions={
        <>
          <Button variant="outline">Duplicate list</Button>
          <Button>Add item</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <WireCard
          title="Checklist items"
          description="Check off packed items and filter by category."
        >
          <div className="space-y-3">
            {checklist.map((entry) => (
              <label
                key={entry.item}
                className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={entry.checked}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                  />
                  {entry.item}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {entry.category}
                </span>
              </label>
            ))}
          </div>
        </WireCard>
        <WireCard
          title="Categories"
          description="Reusable packing sets by category."
          variant="soft"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-3 py-2 text-sm text-slate-600">
            Add category templates for beach, city, or business trips.
          </div>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default PackingChecklistPage
