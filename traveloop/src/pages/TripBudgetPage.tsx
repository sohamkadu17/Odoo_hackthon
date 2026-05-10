import PageShell from '../components/PageShell'

function TripBudgetPage() {
  return (
    <PageShell
      title="Trip Budget Breakdown"
      subtitle="Track total costs and category splits across the trip."
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Cost breakdown</h3>
          <p>Transport, stay, meals, and activities by day.</p>
        </div>
        <div className="placeholder-card">
          <h3>Charts</h3>
          <p>Visualize spending trends and average cost per day.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default TripBudgetPage
