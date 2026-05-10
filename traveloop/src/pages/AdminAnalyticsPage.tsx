import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  BarChart3,
  TrendingUp,
  Users,
  Map,
  Share2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

const tabs = ['Overview', 'Users', 'Trips', 'Geography']

const metrics = [
  { label: 'Active Planners', value: '2,340', change: '+8%', up: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Trips Created', value: '418', change: '+12%', up: true, icon: Map, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Itineraries Shared', value: '126', change: '+5%', up: true, icon: Share2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Avg. Trip Length', value: '6.4d', change: '+0.8', up: true, icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50' },
]

const topCities = [
  { name: 'Lisbon', country: 'Portugal', share: '18%', trend: 'Rising', trips: 412, progress: 82 },
  { name: 'Copenhagen', country: 'Denmark', share: '14%', trend: 'Stable', trips: 320, progress: 64 },
  { name: 'Kyoto', country: 'Japan', share: '11%', trend: 'Rising', trips: 252, progress: 50 },
  { name: 'Santorini', country: 'Greece', share: '9%', trend: 'Stable', trips: 206, progress: 41 },
  { name: 'Montreal', country: 'Canada', share: '7%', trend: 'Declining', trips: 160, progress: 32 },
]

const recentActivity = [
  { action: 'New trip created', user: 'alex@email.com', detail: 'Nordic Studio · Jul 2026', time: '2 min ago', type: 'create' },
  { action: 'Itinerary shared', user: 'sarah@email.com', detail: 'Lisbon Loop shared with 4', time: '18 min ago', type: 'share' },
  { action: 'New user signup', user: 'mike@email.com', detail: 'via Google OAuth', time: '45 min ago', type: 'user' },
  { action: 'Budget exceeded', user: 'dana@email.com', detail: 'Desert Weekender · +$120', time: '1h ago', type: 'alert' },
  { action: 'Packing list completed', user: 'chris@email.com', detail: 'Tokyo Immersion · 100%', time: '2h ago', type: 'complete' },
]

const activityColors: Record<string, string> = {
  create: 'bg-blue-100 text-blue-700',
  share: 'bg-cyan-100 text-cyan-700',
  user: 'bg-indigo-100 text-indigo-700',
  alert: 'bg-red-100 text-red-700',
  complete: 'bg-green-100 text-green-700',
}

function AdminAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <PageShell
      title="Admin Analytics"
      eyebrow="Platform"
      subtitle="Monitor usage, engagement trends, and top destinations across the platform."
      actions={
        <>
          <Button variant="secondary" size="md" icon={<BarChart3 className="h-4 w-4" />} onClick={() => toast.success('Exporting report...')}>
            Export report
          </Button>
          <Button variant="primary" size="md" onClick={() => toast.success('Settings opened!')}>
            Live dashboard
          </Button>
        </>
      }
    >
      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">{metric.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-xs font-semibold">
                    {metric.up ? (
                      <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span className={metric.up ? 'text-green-600' : 'text-red-600'}>
                      {metric.change}
                    </span>
                    <span className="font-normal text-gray-400">vs last week</span>
                  </div>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${metric.bg}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Chart area */}
        <WireCard title="Usage Over Time" description="Trips created and user engagement (last 30 days)">
          {/* Placeholder chart */}
          <div className="h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 chart-placeholder relative">
            {/* Simulated bar chart */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 px-4 pb-4">
              {[65, 80, 45, 90, 75, 88, 95, 72, 60, 85, 70, 92, 55, 78, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg bg-blue-400/60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-500">New signups</p>
              <p className="text-xl font-bold text-gray-900">+14%</p>
              <p className="text-xs text-gray-400">vs prev. month</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-500">Itinerary shares</p>
              <p className="text-xl font-bold text-gray-900">+9%</p>
              <p className="text-xs text-gray-400">vs prev. month</p>
            </div>
          </div>
        </WireCard>

        {/* Top cities */}
        <WireCard title="Top Destinations" description="Most planned cities this month." variant="soft">
          <div className="space-y-4">
            {topCities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{city.name}</p>
                      <p className="text-xs text-gray-400">{city.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      tone={city.trend === 'Rising' ? 'green' : city.trend === 'Stable' ? 'blue' : 'red'}
                    >
                      {city.trend}
                    </Badge>
                    <span className="text-sm font-bold text-gray-900">{city.share}</span>
                  </div>
                </div>
                <ProgressBar value={city.progress} tone="blue" showValue={false} />
              </motion.div>
            ))}
          </div>
        </WireCard>
      </div>

      {/* Recent activity */}
      <WireCard
        title="Recent Activity"
        description="Latest events across the platform."
        actions={
          <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
            <Activity className="h-3.5 w-3.5" />
            Live
          </div>
        }
      >
        <div className="space-y-2">
          {recentActivity.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm"
            >
              <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${activityColors[item.type]}`}>
                {item.action}
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-gray-800">{item.user}</p>
                <p className="truncate text-xs text-gray-500">{item.detail}</p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </WireCard>
    </PageShell>
  )
}

export default AdminAnalyticsPage
