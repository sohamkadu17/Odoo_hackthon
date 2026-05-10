type PageShellProps = {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children?: React.ReactNode
}

function PageShell({ title, subtitle, actions, children }: PageShellProps) {
  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Traveloop</p>
          <h1>{title}</h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </header>
      <section className="page-content">{children}</section>
    </div>
  )
}

export default PageShell
