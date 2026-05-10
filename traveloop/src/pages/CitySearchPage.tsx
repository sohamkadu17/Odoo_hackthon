import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const cities = [
  {
    name: 'Lisbon',
    region: 'Southern Europe',
    budget: 'Mid-range',
    score: '8.9',
  },
  {
    name: 'Reykjavik',
    region: 'Northern Europe',
    budget: 'Premium',
    score: '8.1',
  },
  {
    name: 'Mexico City',
    region: 'North America',
    budget: 'Value',
    score: '9.1',
  },
]

function CitySearchPage() {
  return (
    <PageShell
      title="City Search"
      subtitle="Discover cities by region, popularity, and cost index."
      actions={
        <>
          <Button variant="outline">Map view</Button>
          <Button>Add to trip</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <WireCard
          title="Filters"
          description="Region, climate, budget score, and popularity."
          variant="dashed"
        >
          <div className="space-y-4 text-sm text-slate-600">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Region
              </p>
              <div className="flex flex-wrap gap-2">
                {['Europe', 'Americas', 'Asia', 'Africa'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Budget
              </p>
              <div className="flex flex-wrap gap-2">
                {['Value', 'Mid-range', 'Premium'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Climate
              </p>
              <div className="flex flex-wrap gap-2">
                {['Mild', 'Warm', 'Cool', 'All seasons'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </WireCard>

        <div className="space-y-6">
          <WireCard title="Search" description="Search by city or region." variant="soft">
            <input
              type="search"
              placeholder="Search cities"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </WireCard>
          <WireCard
            title="Results"
            description="City cards with highlights and quick add actions."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
                >
                  <img
                    src="https://placehold.co/600x400?text=City"
                    alt={`${city.name} skyline placeholder`}
                    className="h-32 w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {city.name}
                      </h3>
                      <Badge tone="emerald">Score {city.score}</Badge>
                    </div>
                    <p className="text-sm text-slate-500">{city.region}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {city.budget}
                      </span>
                      <Button variant="ghost">Add</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default CitySearchPage
