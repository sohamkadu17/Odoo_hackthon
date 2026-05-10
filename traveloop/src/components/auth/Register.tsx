function Register() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 page-animate">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Logo
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
            <p className="text-sm text-slate-600">
              Join Traveloop to start planning your next journey.
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              First Name
              <input
                type="text"
                name="firstName"
                required
                placeholder="Avery"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Last Name
              <input
                type="text"
                name="lastName"
                required
                placeholder="Chen"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
          </div>
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Password
              <input
                type="password"
                name="password"
                required
                minLength={8}
                placeholder="Minimum 8 characters"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={8}
                placeholder="Re-enter password"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:bg-emerald-800"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center text-sm">
          <button
            type="button"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
