export function Metrics() {
  return (
    <section id="metrics" aria-label="By the numbers" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="mono" style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)' }}>
        BY THE NUMBERS
      </div>
      <div className="metrics">
        <div className="metric">
          <div className="metric-v">1+</div>
          <div className="metric-l">YEARS EXPERIENCE</div>
        </div>
        <div className="metric">
          <div className="metric-v">15+</div>
          <div className="metric-l">PROJECTS DELIVERED</div>
        </div>
        <div className="metric">
          <div className="metric-v">20+</div>
          <div className="metric-l">TECHNOLOGIES</div>
        </div>
        <div className="metric">
          <div className="metric-v">∞</div>
          <div className="metric-l">INNOVATION</div>
        </div>
      </div>
    </section>
  )
}
