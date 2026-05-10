import PageShell from '../components/PageShell'

function CreateTripPage() {
  return (
    <PageShell
      title="Create Trip"
      subtitle="Start a new itinerary with dates, a name, and optional cover photo."
      actions={<button className="primary">Save trip</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Trip details</h3>
          <p>Trip name, description, and a cover photo upload.</p>
        </div>
        <div className="placeholder-card">
          <h3>Date range</h3>
          <p>Pick start and end dates to shape the timeline.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default CreateTripPage
