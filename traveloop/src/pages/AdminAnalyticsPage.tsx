import PageShell from '../components/PageShell'

function AdminAnalyticsPage() {
  return (
    <PageShell
      title="Admin Analytics"
      subtitle="Monitor platform usage and top travel trends."
    >
      <div className="placeholder-grid">
        <div className="placeholder-card">
          <h3>Usage charts</h3>
          <p>Trips created, user engagement, and retention.</p>
        </div>
        <div className="placeholder-card">
          <h3>Top cities</h3>
          <p>Most booked destinations and activity trends.</p>
        </div>
      </div>
    </PageShell>
  )
}

export default AdminAnalyticsPage
