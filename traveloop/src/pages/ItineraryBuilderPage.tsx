import PageShell from '../components/PageShell'

function ItineraryBuilderPage() {
  return (
    <PageShell
      title="Itinerary Builder"
      subtitle="Add cities, dates, and activities to assemble the full trip."
      actions={<button className="primary">Add stop</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Stops timeline</h3>
          <p>Drag to reorder cities and adjust travel dates.</p>
        </div>
        <div className="placeholder-card">
          <h3>Activities</h3>
          <p>Assign experiences to each stop with quick edits.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default ItineraryBuilderPage
