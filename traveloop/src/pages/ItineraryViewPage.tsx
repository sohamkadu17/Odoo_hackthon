import PageShell from '../components/PageShell'

function ItineraryViewPage() {
  return (
    <PageShell
      title="Itinerary View"
      subtitle="Review the trip in timeline or calendar mode."
      actions={<button className="ghost">Toggle view</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Day-by-day layout</h3>
          <p>City headers, activity blocks, and time slots.</p>
        </div>
        <div className="placeholder-card">
          <h3>Cost summary</h3>
          <p>Daily totals with highlights for high-spend days.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default ItineraryViewPage
