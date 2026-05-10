import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Download,
  FileText,
  Printer,
  DollarSign,
  TrendingDown,
  Users,
  Calendar,
  PieChart,
} from 'lucide-react'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

const invoiceItems = [
  { description: 'Solar do Castelo Boutique — 3 nights', category: 'Lodging', qty: 4, unit: '$180', total: '$720' },
  { description: 'Pena Palace tickets (×4)', category: 'Activities', qty: 4, unit: '$22', total: '$88' },
  { description: 'Sunset sail on the Tagus (×4)', category: 'Activities', qty: 4, unit: '$45', total: '$180' },
  { description: 'Azulejo tile workshop (×4)', category: 'Activities', qty: 4, unit: '$65', total: '$260' },
  { description: 'Mercado da Ribeira food tour (×4)', category: 'Dining', qty: 4, unit: '$55', total: '$220' },
  { description: 'Lisbon Airport transfers (×2)', category: 'Transport', qty: 2, unit: '$35', total: '$70' },
  { description: 'Sintra day trip rail passes (×4)', category: 'Transport', qty: 4, unit: '$8', total: '$32' },
]

const budgetInsights = [
  { label: 'Lodging', value: 58, tone: 'blue' as const, budgeted: '$900', spent: '$720' },
  { label: 'Activities', value: 75, tone: 'indigo' as const, budgeted: '$700', spent: '$528' },
  { label: 'Dining', value: 44, tone: 'cyan' as const, budgeted: '$500', spent: '$220' },
  { label: 'Transport', value: 34, tone: 'teal' as const, budgeted: '$300', spent: '$102' },
]

const subtotal = '$1,570'
const tax = '$94.20'
const total = '$1,664.20'

function TripBudgetPage() {
  return (
    <PageShell
      title="Trip Budget & Invoice"
      eyebrow="Lisbon Loop · Jun 2026"
      subtitle="Expense breakdown, invoice, and budget insights for your trip."
      actions={
        <>
          <Button variant="secondary" size="md" icon={<Printer className="h-4 w-4" />} onClick={() => toast.success('Printing invoice...')}>
            Print
          </Button>
          <Button variant="secondary" size="md" icon={<FileText className="h-4 w-4" />} onClick={() => toast.success('Exporting PDF...')}>
            Export CSV
          </Button>
          <Button variant="primary" size="md" icon={<Download className="h-4 w-4" />} onClick={() => toast.success('Downloading data...')}>
            Download PDF
          </Button>
        </>
      }
    >
      {/* Trip metadata */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Budget', value: '$3,200', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Spent', value: total, icon: TrendingDown, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Remaining', value: '$1,535.80', icon: PieChart, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Travelers', value: '4 people', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-50' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        {/* Invoice table */}
        <WireCard title="Invoice" eyebrow="Lisbon Loop — 4 Travelers">
          {/* Traveler & trip info */}
          <div className="grid gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-xs text-gray-500">Billed to</p>
              <p className="font-semibold text-gray-900">Alex Jordan</p>
              <p className="text-gray-600">alex@email.com</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Trip dates</p>
              <p className="font-semibold text-gray-900">Jun 12 – Jun 18, 2026</p>
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="h-3.5 w-3.5" />
                <span>6 days · Lisbon, Sintra, Cascais</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
                  <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
                  <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Qty</th>
                  <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Unit</th>
                  <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoiceItems.map((item) => (
                  <tr key={item.description} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 font-medium text-gray-800">{item.description}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-600">{item.qty}</td>
                    <td className="py-3 text-right text-gray-600">{item.unit}</td>
                    <td className="py-3 text-right font-semibold text-gray-900">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (6%)</span>
              <span className="font-semibold">{tax}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between text-sm text-blue-600 font-medium">
              <span>Per person</span>
              <span>$416.05</span>
            </div>
          </div>
        </WireCard>

        {/* Budget insights */}
        <WireCard title="Budget Insights" eyebrow="Spending">
          <div className="space-y-4">
            {budgetInsights.map((b) => (
              <div key={b.label}>
                <ProgressBar label={b.label} value={b.value} tone={b.tone} />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Spent: <span className="font-semibold text-gray-700">{b.spent}</span></span>
                  <span>Budget: <span className="font-semibold text-gray-700">{b.budgeted}</span></span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-green-50 border border-green-200 p-3.5">
            <p className="text-sm font-semibold text-green-800">💚 Under budget!</p>
            <p className="mt-0.5 text-xs text-green-700">You're $1,535.80 under your total budget. Consider adding more experiences!</p>
          </div>
        </WireCard>
      </div>
    </PageShell>
  )
}

export default TripBudgetPage
