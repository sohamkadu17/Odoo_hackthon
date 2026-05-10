const trips = [
  {
    title: 'Paris Getaway',
    dates: 'Jun 12 - Jun 18',
    status: 'Upcoming',
  },
  {
    title: 'Tokyo Weekender',
    dates: 'Apr 04 - Apr 07',
    status: 'Completed',
  },
  {
    title: 'Cape Town Escape',
    dates: 'Aug 22 - Aug 30',
    status: 'Upcoming',
  },
]

function UserProfileDashboard() {
  return (
    <div className="space-y-8 page-animate">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Avatar
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-slate-900">
                Jordan Rivera
              </h1>
              <p className="max-w-xl text-sm text-slate-600">
                Urban explorer and weekend getaway planner. Loves boutique stays
                and slow mornings.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            Edit Profile
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-emerald-500 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
          >
            My Trips
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Saved Trips
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="h-32 bg-slate-100">
                <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Image
                </div>
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {trip.title}
                    </h3>
                    <p className="text-sm text-slate-500">{trip.dates}</p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {trip.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default UserProfileDashboard
