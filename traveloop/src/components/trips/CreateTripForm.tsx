function CreateTripForm() {
  return (
    <div className="space-y-8 pb-24 page-animate">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
          Traveloop
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Plan Your Trip
        </h1>
        <p className="text-sm text-slate-600">
          Set your dates and party size to get a tailored itinerary flow.
        </p>
      </header>

      <form className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block space-y-2 text-sm font-semibold text-slate-700">
          Destination
          <input
            type="text"
            name="destination"
            placeholder="Lisbon, Portugal"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            Start Date
            <input
              type="date"
              name="startDate"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            End Date
            <input
              type="date"
              name="endDate"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>
        </div>
        <label className="block space-y-2 text-sm font-semibold text-slate-700">
          Number of Travelers
          <input
            type="number"
            name="travelers"
            min={1}
            defaultValue={2}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </label>
      </form>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Suggested for your dates
          </h2>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Inspiration
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Coastal escape', 'City highlights', 'Food tour', 'Outdoor day', 'Art walk', 'Sunset cruise'].map(
            (label) => (
              <div
                key={label}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-32 bg-slate-100">
                  <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Image
                  </div>
                </div>
                <div className="p-4 text-sm font-semibold text-slate-700">
                  {label}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-10 px-4">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <button
            type="button"
            className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:bg-emerald-800"
          >
            Start Building Itinerary
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTripForm
