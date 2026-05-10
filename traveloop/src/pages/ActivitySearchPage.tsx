import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const activities = [
  {
    name: 'Riverside Food Tour',
    duration: '3 hrs',
    price: '$65',
    rating: '4.9',
    tags: ['Food', 'Evening'],
  },
  {
    name: 'Street Art Walk',
    duration: '2 hrs',
    price: '$28',
    rating: '4.7',
    tags: ['Culture', 'Morning'],
  },
  {
    name: 'Sunset Sail',
    duration: '2.5 hrs',
    price: '$82',
    rating: '4.8',
    tags: ['Outdoor', 'Sunset'],
  },
]

function ActivitySearchPage() {
  return (
    <PageShell
      title="Activity Search"
      subtitle="Browse experiences and add them to each stop."
      actions={
        <>
          <Button variant="outline">Save search</Button>
          <Button>Add activity</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <WireCard
          title="Filters"
          description="Type, price, duration, and time of day."
          variant="dashed"
        >
          <div className="space-y-4 text-sm text-slate-600">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Budget
              </p>
              <div className="flex flex-wrap gap-2">
                {['Under $40', '$40-$80', '$80+'].map((item) => (
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
                Duration
              </p>
              <div className="flex flex-wrap gap-2">
                {['1-2 hrs', '2-4 hrs', 'Half day'].map((item) => (
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
                Time of day
              </p>
              <div className="flex flex-wrap gap-2">
                {['Morning', 'Afternoon', 'Evening'].map((item) => (
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
          <WireCard
            title="Search"
            description="Type an interest, activity, or neighborhood."
            variant="soft"
          >
            <input
              type="search"
              placeholder="Search activities"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </WireCard>

          <WireCard
            title="Results"
            description="Quick previews with price, duration, and reviews."
          >
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.name}
                  className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {activity.name}
                      </h3>
                      <Badge tone="emerald">{activity.rating} stars</Badge>
                    </div>
                    <p className="text-sm text-slate-500">
                      {activity.duration} - {activity.price} per person
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activity.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost">Add</Button>
                </div>
              ))}
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default ActivitySearchPage
