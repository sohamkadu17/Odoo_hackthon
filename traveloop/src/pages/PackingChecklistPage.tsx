import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Copy,
  Package,
  FileText,
  Smartphone,
  Shirt,
  HeartPulse,
} from 'lucide-react'
import Button from '../components/Button'
import PageShell from '../components/PageShell'
import ProgressBar from '../components/ProgressBar'
import WireCard from '../components/WireCard'

type ChecklistCategory = {
  name: string
  icon: typeof Package
  color: string
  bg: string
  items: { text: string; checked: boolean }[]
}

const initialCategories: ChecklistCategory[] = [
  {
    name: 'Documents',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    items: [
      { text: 'Passport + ID', checked: true },
      { text: 'Travel insurance documents', checked: false },
      { text: 'Hotel booking confirmations', checked: true },
      { text: 'Flight tickets (digital or printed)', checked: true },
    ],
  },
  {
    name: 'Electronics',
    icon: Smartphone,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    items: [
      { text: 'Universal power adapter', checked: false },
      { text: 'Phone charger cable', checked: true },
      { text: 'Portable battery bank', checked: false },
      { text: 'Noise-cancelling headphones', checked: false },
    ],
  },
  {
    name: 'Clothing',
    icon: Shirt,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    items: [
      { text: 'Comfortable walking shoes', checked: false },
      { text: 'Light jacket / layer', checked: false },
      { text: 'Swimwear (if applicable)', checked: false },
    ],
  },
  {
    name: 'Health & Safety',
    icon: HeartPulse,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    items: [
      { text: 'Prescription medications', checked: false },
      { text: 'First-aid kit basics', checked: true },
      { text: 'Refillable water bottle', checked: true },
    ],
  },
]

function PackingChecklistPage() {
  const [categories, setCategories] = useState(initialCategories)

  const allItems = categories.flatMap((c) => c.items)
  const checkedCount = allItems.filter((i) => i.checked).length
  const totalCount = allItems.length
  const progress = Math.round((checkedCount / totalCount) * 100)

  function toggleItem(catIdx: number, itemIdx: number) {
    setCategories((cats) =>
      cats.map((cat, ci) =>
        ci !== catIdx
          ? cat
          : {
              ...cat,
              items: cat.items.map((item, ii) =>
                ii !== itemIdx ? item : { ...item, checked: !item.checked }
              ),
            }
      )
    )
  }

  return (
    <PageShell
      title="Packing Checklist"
      eyebrow="Lisbon Loop"
      subtitle="Keep track of essentials with reusable, categorized packing lists."
      actions={
        <>
          <Button variant="secondary" icon={<Copy className="h-4 w-4" />}>
            Duplicate list
          </Button>
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            Add item
          </Button>
        </>
      }
    >
      {/* Progress overview */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {checkedCount} of {totalCount} items packed
            </p>
            <p className="text-sm text-gray-500">
              {totalCount - checkedCount} items remaining
            </p>
          </div>
          <div className="text-3xl font-black text-blue-600">{progress}%</div>
        </div>
        <ProgressBar value={progress} tone="blue" showValue={false} />
        {progress === 100 && (
          <div className="mt-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-semibold">All packed! You're ready to go. ✈️</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Checklist by category */}
        <div className="space-y-5">
          {categories.map((cat, catIdx) => {
            const Icon = cat.icon
            const catChecked = cat.items.filter((i) => i.checked).length
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.07, duration: 0.35 }}
              >
                <WireCard
                  title={cat.name}
                  actions={
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{catChecked}/{cat.items.length}</span>
                      <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${cat.bg}`}>
                        <Icon className={`h-3.5 w-3.5 ${cat.color}`} strokeWidth={2} />
                      </div>
                    </div>
                  }
                >
                  <ul className="space-y-2">
                    {cat.items.map((item, itemIdx) => (
                      <li
                        key={item.text}
                        className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition-all hover:bg-gray-100"
                      >
                        <label className="flex cursor-pointer items-center gap-3 flex-1">
                          <button
                            onClick={() => toggleItem(catIdx, itemIdx)}
                            className="shrink-0 text-gray-300 hover:text-blue-500 transition-colors"
                          >
                            {item.checked ? (
                              <CheckCircle2 className="h-5 w-5 text-blue-500" strokeWidth={2.5} />
                            ) : (
                              <Circle className="h-5 w-5" strokeWidth={2} />
                            )}
                          </button>
                          <span className={`text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                            {item.text}
                          </span>
                        </label>
                        <button className="ml-2 text-gray-300 hover:text-red-400 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                    <Plus className="h-4 w-4" />
                    Add {cat.name.toLowerCase()} item
                  </button>
                </WireCard>
              </motion.div>
            )
          })}
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* Category overview */}
          <WireCard title="Category Progress" variant="soft">
            <div className="space-y-3">
              {categories.map((cat) => {
                const catChecked = cat.items.filter((i) => i.checked).length
                const catProgress = Math.round((catChecked / cat.items.length) * 100)
                const Icon = cat.icon
                return (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cat.bg}`}>
                      <Icon className={`h-4 w-4 ${cat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{cat.name}</span>
                        <span className="text-gray-500">{catChecked}/{cat.items.length}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100">
                        <div
                          className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${catProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </WireCard>

          {/* Quick add templates */}
          <WireCard title="Quick Templates" variant="dashed">
            <p className="text-sm text-gray-500">Add a pre-built list for your trip type.</p>
            <div className="grid gap-2">
              {[
                { label: '🏖️ Beach Trip', desc: 'Swimwear, sunscreen, flip-flops...' },
                { label: '🏙️ City Break', desc: 'Comfortable shoes, metro card...' },
                { label: '💼 Business Trip', desc: 'Laptop, formal wear, chargers...' },
                { label: '🏕️ Camping', desc: 'Tent, sleeping bag, headlamp...' },
              ].map((tpl) => (
                <button
                  key={tpl.label}
                  className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-white p-3 text-left transition-all hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{tpl.label}</p>
                    <p className="text-xs text-gray-500 truncate">{tpl.desc}</p>
                  </div>
                  <Plus className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                </button>
              ))}
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default PackingChecklistPage
