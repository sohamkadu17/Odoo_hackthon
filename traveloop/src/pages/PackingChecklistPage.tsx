import PageShell from '../components/PageShell'

function PackingChecklistPage() {
  return (
    <PageShell
      title="Packing Checklist"
      subtitle="Keep track of essentials with reusable lists."
      actions={<button className="primary">Add item</button>}
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Checklist items</h3>
          <p>Check off packed items and filter by category.</p>
        </div>
        <div className="placeholder-card">
          <h3>Categories</h3>
          <p>Clothing, documents, electronics, and more.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default PackingChecklistPage
