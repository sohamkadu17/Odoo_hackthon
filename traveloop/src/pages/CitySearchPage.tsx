import PageShell from '../components/PageShell'

function CitySearchPage() {
  return (
    <PageShell
      title="City Search"
      subtitle="Discover cities by region, popularity, and cost index."
      actions={<button className="primary">Add to trip</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Search results</h3>
          <p>City cards with highlights and quick add actions.</p>
        </div>
        <div className="placeholder-card">
          <h3>Filters</h3>
          <p>Region, climate, budget score, and popularity.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default CitySearchPage
