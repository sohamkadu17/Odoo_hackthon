import PageShell from '../components/PageShell'

function TripNotesPage() {
  return (
    <PageShell
      title="Trip Notes"
      subtitle="Capture reminders tied to trips or specific stops."
      actions={<button className="primary">New note</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Notes list</h3>
          <p>Chronological notes with tags and timestamps.</p>
        </div>
        <div className="placeholder-card">
          <h3>Quick add</h3>
          <p>Draft new reminders without leaving the trip.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default TripNotesPage
