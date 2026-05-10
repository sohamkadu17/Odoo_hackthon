import PageShell from '../components/PageShell'

function SharedItineraryPage() {
  return (
    <PageShell
      title="Shared Itinerary"
      subtitle="Public view for sharing or copying a trip."
      actions={<button className="ghost">Copy trip</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Read-only plan</h3>
          <p>Timeline, highlights, and activity lineup.</p>
        </div>
        <div className="placeholder-card">
          <h3>Share tools</h3>
          <p>Public URL and social media options.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default SharedItineraryPage
