import PageShell from '../components/PageShell'

function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      subtitle="Your home base for upcoming trips and inspiration."
      actions={<button className="primary">Plan new trip</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Recent trips</h3>
          <p>Preview your latest itineraries and quick resume actions.</p>
        </div>
        <div className="placeholder-card">
          <h3>Recommended cities</h3>
          <p>Personalized suggestions based on saved preferences.</p>
        </div>
        <div className="placeholder-card">
          <h3>Budget highlights</h3>
          <p>Weekly spend snapshots and alerts for over-budget days.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default DashboardPage
