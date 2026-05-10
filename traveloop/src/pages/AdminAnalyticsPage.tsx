import Badge from '../components/Badge'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const metrics = [
  { label: 'Active planners', value: '2,340', change: '+8%' },
  { label: 'Trips created', value: '418', change: '+12%' },
  { label: 'Itineraries shared', value: '126', change: '+5%' },
  { label: 'Avg. trip length', value: '6.4 days', change: '+0.8' },
]

const topCities = [
  { name: 'Lisbon', share: '18%', trend: 'Rising' },
  { name: 'Copenhagen', share: '14%', trend: 'Stable' },
  { name: 'Kyoto', share: '11%', trend: 'Rising' },
]

function AdminAnalyticsPage() {
  return (
    <PageShell
      title="Admin Analytics"
      subtitle="Monitor platform usage, engagement, and top travel trends."
    >
      <WireCard
        title="Platform overview"
        description="Weekly activity and engagement pulse."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {metric.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {metric.value}
              </p>
              <p className="mt-1 text-sm text-emerald-600">{metric.change}</p>
            </div>
          ))}
        </div>
      </WireCard>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <WireCard
          title="Usage charts"
          description="Trips created, user engagement, and retention."
          variant="dashed"
        >
          <div className="h-40 rounded-2xl border border-dashed border-slate-300 bg-white/60" />
          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="flex items-center justify-between">
              <span>New signups</span>
              <span className="font-semibold text-slate-900">+14%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Itinerary shares</span>
              <span className="font-semibold text-slate-900">+9%</span>
            </div>
          </div>
        </WireCard>
        <WireCard
          title="Top cities"
          description="Most booked destinations and activity trends."
          variant="soft"
        >
          <div className="space-y-3">
            {topCities.map((city) => (
              <div
                key={city.name}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">{city.name}</p>
                  <p className="text-slate-500">Share of bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">{city.share}</p>
                  <Badge tone="emerald">{city.trend}</Badge>
                </div>
              </div>
            ))}
          </div>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default AdminAnalyticsPage
