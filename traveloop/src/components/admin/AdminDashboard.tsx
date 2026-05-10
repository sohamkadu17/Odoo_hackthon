const summaryCards = [
  { label: 'Total Users', value: '24,580', trend: '+12%' },
  { label: 'Active Trips', value: '1,482', trend: '+5%' },
  { label: 'Revenue', value: '$128k', trend: '+9%' },
  { label: 'New Bookings', value: '342', trend: '+3%' },
]

const tableRows = [
  {
    id: 'TR-1209',
    user: 'Avery Chen',
    destination: 'Lisbon',
    status: 'Active',
    date: 'May 08, 2026',
  },
  {
    id: 'TR-1208',
    user: 'Jordan Rivera',
    destination: 'Paris',
    status: 'Completed',
    date: 'May 05, 2026',
  },
  {
    id: 'TR-1207',
    user: 'Morgan Lee',
    destination: 'Kyoto',
    status: 'Active',
    date: 'May 01, 2026',
  },
  {
    id: 'TR-1206',
    user: 'Priya Shah',
    destination: 'Reykjavik',
    status: 'Pending',
    date: 'Apr 28, 2026',
  },
  {
    id: 'TR-1205',
    user: 'Diego Ramos',
    destination: 'Cape Town',
    status: 'Completed',
    date: 'Apr 24, 2026',
  },
]

// Simple chart components
const PieChart = () => (
  <svg viewBox="0 0 100 100" className="h-40 w-40">
    <circle cx="50" cy="50" r="40" fill="#06b6d4" />
    <path d="M 50 50 L 90 50 A 40 40 0 0 0 30 30 Z" fill="#0ea5e9" />
    <path d="M 50 50 L 30 30 A 40 40 0 0 0 50 10 Z" fill="#10b981" />
  </svg>
)

const LineChart = () => (
  <svg viewBox="0 0 200 100" className="h-40 w-full">
    <polyline
      points="10,80 40,60 70,40 100,50 130,30 160,45 190,20"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2"
    />
    <circle cx="10" cy="80" r="2" fill="#ef4444" />
    <circle cx="40" cy="60" r="2" fill="#ef4444" />
    <circle cx="70" cy="40" r="2" fill="#ef4444" />
    <circle cx="100" cy="50" r="2" fill="#ef4444" />
    <circle cx="130" cy="30" r="2" fill="#ef4444" />
    <circle cx="160" cy="45" r="2" fill="#ef4444" />
    <circle cx="190" cy="20" r="2" fill="#ef4444" />
  </svg>
)

const BarChart = () => (
  <svg viewBox="0 0 200 100" className="h-40 w-full">
    <rect x="20" y="60" width="20" height="30" fill="#f97316" />
    <rect x="50" y="40" width="20" height="50" fill="#fb923c" />
    <rect x="80" y="30" width="20" height="60" fill="#fbbf24" />
    <rect x="110" y="45" width="20" height="45" fill="#fcd34d" />
    <rect x="140" y="50" width="20" height="40" fill="#fde047" />
  </svg>
)

function AdminDashboard() {
  return (
    <div className="space-y-8 page-animate">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {card.label}
            </p>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-2xl font-semibold text-slate-900">
                  {card.value}
                </p>
                <p className="text-sm font-semibold text-emerald-600">
                  {card.trend}
                </p>
              </div>
              <div className="h-10 w-20 rounded-lg border border-dashed border-slate-300 bg-slate-50" />
            </div>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Pie Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Trip Distribution</h3>
          <div className="flex justify-center">
            <PieChart />
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-cyan-400" />
                Active Trips
              </span>
              <span className="font-semibold text-slate-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-400" />
                Completed
              </span>
              <span className="font-semibold text-slate-900">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                Planned
              </span>
              <span className="font-semibold text-slate-900">20%</span>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend</h3>
          <LineChart />
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">Last 7 days</p>
            <p className="text-lg font-semibold text-slate-900">$2,450.80</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Destinations</h3>
          <BarChart />
          <div className="mt-4 space-y-1 text-xs text-slate-600">
            <p>Lisbon • Paris • Kyoto • Tokyo • Barcelona</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Trips
            </h2>
            <p className="text-sm text-slate-600">
              Review the latest trip activity and status updates.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="search"
              placeholder="Search by user or destination"
              className="min-w-[220px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Filters
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="border-b border-slate-200 pb-3 pr-4">ID</th>
                <th className="border-b border-slate-200 pb-3 pr-4">User</th>
                <th className="border-b border-slate-200 pb-3 pr-4">
                  Trip Destination
                </th>
                <th className="border-b border-slate-200 pb-3 pr-4">Status</th>
                <th className="border-b border-slate-200 pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {tableRows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="py-4 pr-4 font-semibold text-slate-900">
                    {row.id}
                  </td>
                  <td className="py-4 pr-4">{row.user}</td>
                  <td className="py-4 pr-4">{row.destination}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <span>Showing 1-5 of 48</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-full border border-emerald-500 bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700"
            >
              1
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              2
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
