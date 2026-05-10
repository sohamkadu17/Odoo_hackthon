import { useState } from 'react'
import { motion } from 'framer-motion'

const summaryCards = [
  { label: 'Total Users', value: '24,580', trend: '+12%', icon: '👥' },
  { label: 'Active Trips', value: '1,482', trend: '+5%', icon: '✈️' },
  { label: 'Revenue', value: '$128k', trend: '+9%', icon: '💰' },
  { label: 'New Bookings', value: '342', trend: '+3%', icon: '📅' },
]

const pieData = [
  { label: 'Active Trips', value: 45, color: '#06b6d4', percentage: '45%' },
  { label: 'Completed', value: 35, color: '#0ea5e9', percentage: '35%' },
  { label: 'Planned', value: 20, color: '#10b981', percentage: '20%' },
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

// Interactive Pie Chart with animations
const PieChart = ({ onSegmentClick }: { onSegmentClick: (data: any) => void }) => {
  const segments = [
    { startAngle: 0, endAngle: 162, color: '#06b6d4', label: 'Active Trips', value: 45 },
    { startAngle: 162, endAngle: 288, color: '#0ea5e9', label: 'Completed', value: 35 },
    { startAngle: 288, endAngle: 360, color: '#10b981', label: 'Planned', value: 20 },
  ]

  const createPath = (startAngle: number, endAngle: number) => {
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180
    const x1 = 50 + 40 * Math.cos(startAngleRad)
    const y1 = 50 + 40 * Math.sin(startAngleRad)
    const x2 = 50 + 40 * Math.cos(endAngleRad)
    const y2 = 50 + 40 * Math.sin(endAngleRad)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  return (
    <svg viewBox="0 0 100 100" className="h-40 w-40 cursor-pointer">
      {segments.map((segment) => (
        <motion.path
          key={segment.label}
          d={createPath(segment.startAngle, segment.endAngle)}
          fill={segment.color}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSegmentClick(segment)}
          style={{ originX: 0.5, originY: 0.5 }}
          className="transition-all duration-200"
        />
      ))}
    </svg>
  )
}

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

const BarChart = ({ onBarClick }: { onBarClick: (data: any) => void }) => {
  const barData = [
    { x: 20, y: 60, width: 20, height: 30, value: '$2,400', label: 'Lisbon', color: '#f97316' },
    { x: 50, y: 40, width: 20, height: 50, value: '$4,800', label: 'Paris', color: '#fb923c' },
    { x: 80, y: 30, width: 20, height: 60, value: '$6,200', label: 'Kyoto', color: '#fbbf24' },
    { x: 110, y: 45, width: 20, height: 45, value: '$3,900', label: 'Tokyo', color: '#fcd34d' },
    { x: 140, y: 50, width: 20, height: 40, value: '$3,200', label: 'Barcelona', color: '#fde047' },
  ]
  
  const maxValue = Math.max(...barData.map(bar => bar.height))
  const highestBar = barData.find(bar => bar.height === maxValue)
  
  return (
    <svg viewBox="0 0 200 100" className="h-40 w-full">
      {barData.map((bar, index) => (
        <motion.g key={bar.label}>
          <motion.rect
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            fill={bar.color}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ originY: 'bottom' }}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onBarClick(bar)}
            stroke={bar === highestBar ? '#dc2626' : 'none'}
            strokeWidth={bar === highestBar ? 2 : 0}
          />
          {bar === highestBar && (
            <motion.text
              x={bar.x + bar.width / 2}
              y={bar.y - 5}
              textAnchor="middle"
              className="text-xs font-bold fill-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              TOP
            </motion.text>
          )}
        </motion.g>
      ))}
    </svg>
  )
}

function AnalysisDashboard() {
  const [selectedSegment, setSelectedSegment] = useState<any>(null)
  const [animatedValue, setAnimatedValue] = useState(0)
  const [selectedBar, setSelectedBar] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Filter table rows based on search and status
  const filteredRows = tableRows.filter(row => {
    const matchesSearch = searchTerm === '' || 
      row.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || row.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  const handleBarClick = (bar: any) => {
    setSelectedBar(bar)
  }

  const handleSegmentClick = (segment: any) => {
    setSelectedSegment(segment)
    // Animate value counting up
    setAnimatedValue(0)
    const duration = 1000
    const steps = 30
    const increment = segment.value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= segment.value) {
        current = segment.value
        clearInterval(timer)
      }
      setAnimatedValue(Math.round(current))
    }, duration / steps)
  }

  return (
    <div className="space-y-8 page-animate">
      {/* Semantic Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold text-slate-900">Travel Analytics Dashboard</h1>
        <p className="text-slate-600">Gain insights into your travel patterns and optimize your journey planning</p>
      </motion.header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm hover:shadow-lg hover:border-blue-300 hover:bg-white/90 transition-all duration-300 cursor-pointer"
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
              <div className="text-3xl">{card.icon}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-blue-300 hover:bg-white/90 transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Trip Distribution</h3>
          <div className="flex justify-center">
            <PieChart onSegmentClick={handleSegmentClick} />
          </div>
          
          {/* Animated Value Display */}
          {selectedSegment && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-slate-50 rounded-lg text-center"
            >
              <p className="text-sm font-semibold text-slate-700">
                {selectedSegment.label}: <span className="text-lg" style={{ color: selectedSegment.color }}>{animatedValue}%</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {selectedSegment.value === 45 && 'Active trips currently in progress'}
                {selectedSegment.value === 35 && 'Successfully completed journeys'}
                {selectedSegment.value === 20 && 'Upcoming planned adventures'}
              </p>
            </motion.div>
          )}
          
          <div className="mt-4 space-y-2 text-sm">
            {pieData.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
                <span className="font-semibold text-slate-900">{item.percentage}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-blue-300 hover:bg-white/90 transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend</h3>
          <LineChart />
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">Last 7 days performance</p>
            <p className="text-lg font-semibold text-slate-900">$2,450.80</p>
            <p className="text-xs text-emerald-600">+12% from last week</p>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-blue-300 hover:bg-white/90 transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Destinations</h3>
          <BarChart onBarClick={handleBarClick} />
          <div className="mt-4 space-y-1 text-xs text-slate-600">
            <p>Most popular travel spots this month</p>
            <p className="font-semibold text-slate-900">Lisbon • Paris • Kyoto • Tokyo • Barcelona</p>
            {selectedBar && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-2 bg-slate-50 rounded-lg text-center"
              >
                <p className="font-semibold text-slate-700">{selectedBar.label}</p>
                <p className="text-lg font-bold" style={{ color: selectedBar.color }}>{selectedBar.value}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-blue-300 hover:bg-white/90 transition-all duration-300"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Travel Activity
            </h2>
            <p className="text-sm text-slate-600">
              Track your journey progress and travel companions' adventures
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="search"
              placeholder="Search by user or destination"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="min-w-[220px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
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
                <th className="border-b border-slate-200 pb-3 pr-4">Traveler</th>
                <th className="border-b border-slate-200 pb-3 pr-4">
                  Destination
                </th>
                <th className="border-b border-slate-200 pb-3 pr-4">Status</th>
                <th className="border-b border-slate-200 pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {filteredRows.map((row, index) => (
                <motion.tr 
                  key={row.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 pr-4 font-semibold text-slate-900">
                    {row.id}
                  </td>
                  <td className="py-4 pr-4">{row.user}</td>
                  <td className="py-4 pr-4">{row.destination}</td>
                  <td className="py-4 pr-4">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      row.status === 'Active' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                      row.status === 'Completed' ? 'border-green-200 bg-green-50 text-green-700' :
                      'border-amber-200 bg-amber-50 text-amber-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500">{row.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <span>Showing {filteredRows.length} of {tableRows.length} trips</span>
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
      </motion.section>
    </div>
  )
}

export default AnalysisDashboard
