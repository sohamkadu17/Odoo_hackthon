import PageShell from '../components/PageShell'

function MyTripsPage() {
  return (
    <PageShell
      title="My Trips"
      subtitle="Manage all trips, edit details, or jump back into planning."
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Trip cards</h3>
          <p>Summaries with date range, stops, and quick actions.</p>
        </div>
        <div className="placeholder-card">
          <h3>Filters</h3>
          <p>Sort by upcoming, drafts, or shared itineraries.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default MyTripsPage
