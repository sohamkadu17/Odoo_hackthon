import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Mail, Bell, Shield, Globe, Camera, Save, LogOut } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Globe },
]

function ProfileSettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')

  return (
    <PageShell
      title="Profile & Settings"
      eyebrow="Account"
      subtitle="Manage your personal information, preferences, and account settings."
    >
      <div className="grid gap-6 lg:grid-cols-[220px,1fr]">
        {/* Sidebar nav */}
        <aside className="space-y-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {section.label}
                </button>
              )
            })}
          </div>

          <Link to="/login"><Button variant="secondary" className="w-full mt-2" icon={<LogOut className="h-4 w-4 text-red-500" />}>
            <span className="text-red-600">Sign out</span>
          </Button></Link>
        </aside>

        {/* Main content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {activeSection === 'profile' && (
            <>
              {/* Avatar section */}
              <WireCard title="Profile Photo">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img 
                    loading="lazy"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop" 
                      alt="Alex Jordan" 
                      className="h-20 w-20 rounded-2xl object-cover shadow-md border border-gray-200" 
                    />
                    <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 border-2 border-white text-white hover:bg-blue-700 transition">
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Alex Jordan</p>
                    <p className="text-xs text-gray-500">alex@email.com</p>
                    <Button variant="secondary" size="sm" className="mt-2">
                      Upload new photo
                    </Button>
                  </div>
                </div>
              </WireCard>

              {/* Personal info */}
              <WireCard title="Personal Information">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">First name</label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Last name</label>
                    <input
                      type="text"
                      defaultValue="Jordan"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      <Mail className="inline mr-1 h-3.5 w-3.5" />
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="alex@email.com"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Home city</label>
                    <input
                      type="text"
                      placeholder="e.g. New York, USA"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Passport nationality</label>
                    <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Bio (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tell your crew a bit about your travel style…"
                      className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </WireCard>

              {/* Save */}
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => toast.success('Changes discarded.')}>Cancel</Button>
                <Button variant="primary" icon={<Save className="h-4 w-4" />} onClick={() => toast.success('Profile saved successfully!')}>
                  Save changes
                </Button>
              </div>
            </>
          )}

          {activeSection !== 'profile' && (
            <WireCard
              title={sections.find((s) => s.id === activeSection)?.label ?? ''}
              description={`Manage your ${activeSection} settings here.`}
              variant="dashed"
            >
              <div className="flex h-40 items-center justify-center">
                <p className="text-sm text-gray-400">Settings coming soon.</p>
              </div>
            </WireCard>
          )}
        </motion.div>
      </div>
    </PageShell>
  )
}

export default ProfileSettingsPage
