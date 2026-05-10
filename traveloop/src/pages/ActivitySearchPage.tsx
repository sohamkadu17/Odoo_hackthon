import PageShell from '../components/PageShell'

function ActivitySearchPage() {
  return (
    <PageShell
      title="Activity Search"
      subtitle="Browse experiences and add them to each stop."
      actions={<button className="primary">Add activity</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Activity list</h3>
          <p>Quick previews with duration, price, and reviews.</p>
        </div>
        <div className="placeholder-card">
          <h3>Filters</h3>
          <p>Type, cost, duration, and time of day.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default ActivitySearchPage
