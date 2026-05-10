import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

const categories = [
  { label: 'Flights', value: 32, tone: 'sky' as const },
  { label: 'Stay', value: 55, tone: 'emerald' as const },
  { label: 'Food', value: 41, tone: 'amber' as const },
  { label: 'Experiences', value: 63, tone: 'emerald' as const },
]

function TripBudgetPage() {
  return (
    <PageShell
      title="Trip Budget Breakdown"
      subtitle="Track total costs and category splits across the trip."
      actions={
        <>
          <Button variant="outline">Export</Button>
          <Button>Update budget</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <WireCard
          title="Cost breakdown"
          description="Transport, stay, meals, and activities by day."
        >
          <div className="space-y-4">
            {categories.map((category) => (
              <ProgressBar
                key={category.label}
                label={category.label}
                value={category.value}
                tone={category.tone}
              />
            ))}
          </div>
        </WireCard>
        <WireCard
          title="Total estimate"
          description="Projected spend per traveler."
          variant="soft"
        >
          <div className="space-y-3">
            <p className="text-3xl font-semibold text-slate-900">$1,480</p>
            <p className="text-sm text-slate-600">Includes buffer for upgrades.</p>
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              Daily target: $210 per traveler
            </div>
          </div>
        </WireCard>
      </div>
      <WireCard
        title="Spending trend"
        description="Visualize spending trends and average cost per day."
        variant="dashed"
      >
        <div className="h-48 rounded-2xl border border-dashed border-slate-300 bg-white/70" />
      </WireCard>
    </PageShell>
  )
}

export default TripBudgetPage
