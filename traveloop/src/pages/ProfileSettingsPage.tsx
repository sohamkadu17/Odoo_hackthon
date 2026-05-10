import PageShell from '../components/PageShell'

function ProfileSettingsPage() {
  return (
    <PageShell
      title="Profile & Settings"
      subtitle="Update personal info, preferences, and privacy controls."
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Profile information</h3>
          <p>Name, photo, email, and language preferences.</p>
        </div>
        <div className="placeholder-card">
          <h3>Saved destinations</h3>
          <p>Manage favorites and frequently searched cities.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default ProfileSettingsPage
