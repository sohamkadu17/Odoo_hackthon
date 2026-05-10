const categories = [
  { label: 'Flights' },
  { label: 'Hotels' },
  { label: 'Cars' },
  { label: 'Activities' },
  { label: 'Cruises' },
]

const destinations = [
  {
    name: 'Lisbon',
    subtitle: 'Sunny coast and tile-lined streets',
  },
  {
    name: 'Kyoto',
    subtitle: 'Temples, gardens, and timeless markets',
  },
  {
    name: 'Copenhagen',
    subtitle: 'Design-forward waterfront escapes',
  },
  {
    name: 'Mexico City',
    subtitle: 'Culture-rich, food-forward capital',
  },
  {
    name: 'Cape Town',
    subtitle: 'Mountain views and coastal drives',
  },
  {
    name: 'Reykjavik',
    subtitle: 'Nordic light and geothermal soaks',
  },
]

function HomePage() {
  return (
    <div className="space-y-10 pb-16 page-animate">
      <div className="h-12" aria-hidden="true" />

      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-200 via-slate-100 to-white" />
        <div className="absolute inset-0 flex items-end p-4 sm:p-6">
          <div className="w-full rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                placeholder="Search destinations"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:bg-emerald-800"
                aria-label="Search"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 1 1 1.414-1.414l3.387 3.386a1 1 0 0 1-1.414 1.415l-3.387-3.387ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Scroll
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex min-w-[120px] flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {category.label.slice(0, 2)}
              </div>
              <p className="text-sm font-semibold text-slate-700">{category.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Popular destinations</h2>
          <button
            type="button"
            className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View all
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="h-36 rounded-t-2xl bg-slate-100">
                <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Image
                </div>
              </div>
              <div className="space-y-1 p-4">
                <h3 className="text-base font-semibold text-slate-900">
                  {destination.name}
                </h3>
                <p className="text-sm text-slate-600">{destination.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-16" aria-hidden="true" />
    </div>
  )
}

export default HomePage
