import Button from '../components/Button'
import PageShell from '../components/PageShell'
import WireCard from '../components/WireCard'

const savedDestinations = ['Lisbon', 'Copenhagen', 'Kyoto', 'Mexico City']

function ProfileSettingsPage() {
  return (
    <PageShell
      title="Profile and Settings"
      subtitle="Update personal info, preferences, and privacy controls."
      actions={<Button>Save changes</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <WireCard
          title="Profile information"
          description="Name, photo, email, and language preferences."
        >
          <form className="space-y-4">
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Full name
              <input
                type="text"
                placeholder="Avery Chen"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Email
              <input
                type="email"
                placeholder="avery@traveloop.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-700">
              Preferred language
              <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>
          </form>
        </WireCard>
        <div className="space-y-6">
          <WireCard
            title="Preferences"
            description="Budget alerts and notification settings."
            variant="soft"
          >
            <div className="space-y-3 text-sm text-slate-600">
              <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2">
                <span>Weekly budget summary</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                />
              </label>
              <label className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2">
                <span>New itinerary share alerts</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                />
              </label>
            </div>
          </WireCard>
          <WireCard
            title="Saved destinations"
            description="Favorites and frequently searched cities."
            variant="dashed"
          >
            <div className="flex flex-wrap gap-2">
              {savedDestinations.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {city}
                </span>
              ))}
            </div>
          </WireCard>
        </div>
      </div>
    </PageShell>
  )
}

export default ProfileSettingsPage
