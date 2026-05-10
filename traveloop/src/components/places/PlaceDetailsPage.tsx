const amenities = [
  'Guided tours available',
  'Family friendly',
  'Free cancellation within 24 hours',
  'Best time: early morning',
]

const reviews = [
  {
    name: 'Avery Chen',
    rating: 5,
    text: 'Stunning views and a well-paced experience. Loved the sunset stop.',
  },
  {
    name: 'Jordan Rivera',
    rating: 4,
    text: 'Great for photos and a relaxed afternoon. Bring comfortable shoes.',
  },
]

function PlaceDetailsPage() {
  return (
    <div className="pb-28 page-animate">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-200 via-slate-100 to-white" />
      </section>

      <section className="mt-6 space-y-6">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Alfama Riverwalk
            </h1>
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 text-amber-500"
                fill="currentColor"
              >
                <path d="M10 15.3 4.85 18l1-5.8-4.2-4.1 5.8-.8L10 2l2.55 5.3 5.8.8-4.2 4.1 1 5.8L10 15.3Z" />
              </svg>
              4.8 (124)
            </div>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Lisbon, Portugal
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Description</h2>
              <p className="mt-3 text-sm text-slate-600">
                Wander through cobblestone lanes with sweeping river views. This
                scenic loop combines historic architecture, vibrant cafes, and
                quiet lookout points for a relaxed afternoon.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Highlights
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {amenities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>
            <div className="mt-4 space-y-4">
              {reviews.map((review) => (
                <article
                  key={review.name}
                  className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="h-4 w-4 text-amber-500"
                        fill="currentColor"
                      >
                        <path d="M10 15.3 4.85 18l1-5.8-4.2-4.1 5.8-.8L10 2l2.55 5.3 5.8.8-4.2 4.1 1 5.8L10 15.3Z" />
                      </svg>
                      {review.rating}.0
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{review.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-10 px-4">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Estimated price
            </p>
            <p className="text-lg font-semibold text-slate-900">$72 per person</p>
          </div>
          <button
            type="button"
            className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 active:bg-emerald-800"
          >
            Add to Itinerary
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceDetailsPage
