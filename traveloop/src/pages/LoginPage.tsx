import Button from '../components/Button'

const highlights = [
  {
    title: 'Trips in sync',
    description: 'Keep stops, costs, and activities aligned across the crew.',
  },
  {
    title: 'Budget clarity',
    description: 'Auto-calculated totals with alerts when you go over plan.',
  },
  {
    title: 'Share instantly',
    description: 'Send read-only itineraries to friends in one tap.',
  },
]

function LoginPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
          Welcome back
        </p>
        <div className="mt-4 space-y-4">
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Plan your next journey in minutes.
          </h1>
          <p className="max-w-xl text-base text-slate-600">
            Sign in to organize multi-city itineraries, budget smarter, and share
            travel plans with your crew.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
          <p className="text-sm text-slate-600">
            Use your email to access saved itineraries.
          </p>
        </header>
        <form className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-slate-300 text-emerald-600"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Forgot password?
            </button>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span>New to Traveloop?</span>
          <button
            type="button"
            className="font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Create an account
          </button>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
