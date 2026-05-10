import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Plus, Search, FileText, Tag, Trash2, Edit3, Pin } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import PageShell from '../components/PageShell'

type NoteTone = 'blue' | 'amber' | 'cyan' | 'indigo' | 'teal'

type Note = {
  id: number
  title: string
  content: string
  category: string
  tone: NoteTone
  pinned: boolean
  date: string
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: 'Alfama restaurant tips',
    content: 'Zé da Mouraria for traditional fado. Book at least 2 weeks ahead. Try the bacalhau bras. Best time 8–10pm.',
    category: 'Food & Dining',
    tone: 'amber',
    pinned: true,
    date: 'May 8',
  },
  {
    id: 2,
    title: 'Accommodation research',
    content: 'Solar do Castelo looks amazing — boutique, inside the castle walls. Also check Bairro Alto Hotel. Price range $140–$220/night.',
    category: 'Lodging',
    tone: 'blue',
    pinned: false,
    date: 'May 6',
  },
  {
    id: 3,
    title: 'Day 2 activity ideas',
    content: 'Morning: LX Factory. Afternoon: tile workshop or Museu do Azulejo. Evening: sunset at Castelo de São Jorge. Maybe a fado show?',
    category: 'Activities',
    tone: 'indigo',
    pinned: false,
    date: 'May 5',
  },
  {
    id: 4,
    title: 'Train tips: Lisbon to Sintra',
    content: 'CP Rail from Rossio Station. 40 min ride, about €4.30 return. Trains run every 20 min. Get there early on weekends — super busy.',
    category: 'Transport',
    tone: 'teal',
    pinned: true,
    date: 'May 3',
  },
  {
    id: 5,
    title: 'Budget notes',
    content: 'Per person estimates: Accommodation $840, Activities $200, Food $280, Transport $80. Total ≈ $1,400 pp. Buffer $300 pp.',
    category: 'Budget',
    tone: 'cyan',
    pinned: false,
    date: 'May 1',
  },
]

const categories = ['All', 'Food & Dining', 'Lodging', 'Activities', 'Transport', 'Budget']

function TripNotesPage() {
  const [notes] = useState<Note[]>(initialNotes)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = notes.filter((n) => {
    const matchCat = activeCategory === 'All' || n.category === activeCategory
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        n.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const pinned = filtered.filter((n) => n.pinned)
  const unpinned = filtered.filter((n) => !n.pinned)

  return (
    <PageShell
      title="Trip Notes"
      eyebrow="Lisbon Loop"
      subtitle="Capture ideas, research, and reminders for your trip — all in one place."
      actions={
        <Button variant="primary" icon={<Plus className="h-4 w-4" />} onClick={() => toast.success('Note editor opened!')}>
          New note
        </Button>
      }
    >
      {/* Search & filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-blue-500" />
          <span><span className="font-semibold text-gray-900">{filtered.length}</span> notes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Pin className="h-4 w-4 text-amber-500" />
          <span><span className="font-semibold text-gray-900">{pinned.length}</span> pinned</span>
        </div>
      </div>

      {/* Pinned notes */}
      {pinned.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-500">
            <Pin className="h-4 w-4 text-amber-500" />
            Pinned
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map((note, i) => (
              <NoteCard key={note.id} note={note} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Other notes */}
      {unpinned.length > 0 && (
        <section>
          {pinned.length > 0 && (
            <div className="mb-3 text-sm font-semibold text-gray-500">Other notes</div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unpinned.map((note, i) => (
              <NoteCard key={note.id} note={note} index={i} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center">
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 relative"
          >
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <svg width="140" height="140" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
              <circle cx="100" cy="100" r="80" fill="#f1f5f9" />
              <path d="M60 140C60 100 80 70 100 70C120 70 140 100 140 140V145C140 150.523 135.523 155 130 155H70C64.4772 155 60 150.523 60 145V140Z" fill="white" />
              <path d="M140 140C140 145.523 135.523 150 130 150H70C64.4772 150 60 145.523 60 140V120C60 120 73.3333 130 100 130C126.667 130 140 120 140 120V140Z" fill="#e2e8f0" />
              <circle cx="85" cy="105" r="6" fill="#94a3b8" />
              <circle cx="115" cy="105" r="6" fill="#94a3b8" />
              <path d="M95 120Q100 125 105 120" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <path d="M120 60C125.523 60 130 64.4772 130 70V90H110V70C110 64.4772 114.477 60 120 60Z" fill="#bae6fd" transform="rotate(15 120 60)" />
            </svg>
          </motion.div>
          <p className="text-base font-bold text-gray-800">It's a little quiet here...</p>
          <p className="mt-1 text-xs text-gray-400">Try a different search or category</p>
          <Button variant="primary" size="sm" className="mt-4" icon={<Plus className="h-4 w-4" />} onClick={() => toast.success('Added new note.')}>
            Create note
          </Button>
        </div>
      )}
    </PageShell>
  )
}

function NoteCard({ note, index }: { note: Note; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {note.pinned && (
        <div className="absolute right-3 top-3">
          <Pin className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
        </div>
      )}
      <div className="mb-3 flex items-start gap-2">
        <Badge tone={note.tone} dot>
          <Tag className="mr-0.5 inline h-2.5 w-2.5" />
          {note.category}
        </Badge>
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{note.title}</h3>
      <p className="mt-2 line-clamp-3 text-xs text-gray-500 leading-relaxed">{note.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">{note.date}</span>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition">
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TripNotesPage
