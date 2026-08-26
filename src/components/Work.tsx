// NOTE: this file keeps the name Work.tsx for import stability, but the WORK /
// experience section was removed on 2026-08-24 (the TIMELINE already covers
// Aaryav's single role). Only the PROJECTS section lives here now. `experience`
// is deliberately no longer imported — it is still exported from content.ts,
// and an unused *export* is fine, but an unused *import* would fail the build
// under noUnusedLocals.
import { useEffect, useMemo, useState } from 'react'
import { Icon } from './Icons'
import { SectionHead } from './Chrome'
import { projects, type Project } from '../data/content'

const FILTERS = ['ALL', 'AI', 'FULL STACK', 'ML'] as const

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL')

  const shown = useMemo(
    () => (filter === 'ALL' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const featured = shown.find((p) => p.featured)
  const rest = shown.filter((p) => !p.featured)

  return (
    <section id="projects" className="section" aria-label="Projects">
      <SectionHead eyebrow="Selected work" meta={`${projects.length} projects`} />
      <div className="section-body">
        <h2 className="display">projects<span className="dot">.</span></h2>
        <p className="lede">
          Retrieval systems, multi-agent platforms and ML services — built end to end and measured.
        </p>

        <div className="filters" role="group" aria-label="Filter projects" style={{ marginTop: 34 }}>
          {FILTERS.map((f) => (
            <button key={f} className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {featured && <Card p={featured} />}

        <div className="grid3">
          {rest.map((p) => <Card key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  )
}

/**
 * Live "BUILDING SINCE" panel on the featured card.
 * The date is parsed with an explicit T00:00:00 so it is read as LOCAL midnight;
 * bare 'YYYY-MM-DD' is parsed as UTC by spec, which would shift the day count
 * for anyone east or west of UTC — including Aaryav at UTC+5:30.
 */
function BuildClock({ since }: { since: string }) {
  const start = useMemo(() => new Date(`${since}T00:00:00`).getTime(), [since])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const total = Math.max(0, Math.floor((now - start) / 1000))
  const d = Math.floor(total / 86400)
  const h = Math.floor((total % 86400) / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60

  const label = new Date(`${since}T00:00:00`)
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase()

  return (
    <div className="build-clock">
      <span className="bc-h"><Icon.clock />Building since</span>
      <span className="bc-d">{label}</span>
      {/* aria-hidden on purpose: a value that changes every second would make a
          screen reader unusable. The date above carries the same information. */}
      <span className="bc-t" aria-hidden="true">{d}d {h}h {m}m {s}s</span>
    </div>
  )
}

/**
 * The featured card is the reference's "currently building" panel, NOT an
 * enlarged grid card. Measured against the reference in units of its own
 * year-label cap (u), the reference card is 39.2u tall and mine was 61.7u —
 * and the 58% overshoot was structural, not padding: the reference has no
 * bullet list, no role line and no second chip row. So this renders a
 * deliberately shorter subset (status · year · category · title · blurb ·
 * one chip row · link) rather than reusing the grid card and hiding parts.
 */
function FeaturedCard({ p }: { p: Project }) {
  return (
    <article className="card featured">
      <div className="feat-wrap">
        <div className="feat-main">
          <div className="feat-top">
            {p.status && (
              <span className="status-pill">
                <i className="pulse" aria-hidden="true" />{p.status}
              </span>
            )}
            <span className="mono feat-year">{p.year}</span>
            <span className="badge badge-out">{p.category}</span>
          </div>

          <h3 className="card-t">{p.name}</h3>
          <p className="card-b">{p.blurb}</p>

          <div className="card-stack">
            {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>
        </div>

        {p.since && <BuildClock since={p.since} />}
      </div>

      <div className="card-links">
        <a href={p.repo} target="_blank" rel="noopener noreferrer">
          View <Icon.arrow />
        </a>
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer">
            Live demo <Icon.arrow />
          </a>
        )}
      </div>
    </article>
  )
}

function Card({ p }: { p: Project }) {
  if (p.featured) return <FeaturedCard p={p} />

  return (
    <article className={`card${p.draft ? ' draft' : ''}`}>
      <div className="card-top">
        <span className="mono" style={{ color: 'var(--muted)' }}>{p.year}</span>
        {p.draft ? <span className="draft-flag">Needs detail</span> : <span className="badge">{p.category}</span>}
      </div>

      <h3 className="card-t">{p.name}</h3>
      <p className="card-b">{p.blurb}</p>

      {p.metrics && p.metrics.length > 0 && (
        <div className="card-metrics">
          {p.metrics.map((m) => <span className="m" key={m}>{m}</span>)}
        </div>
      )}

      <div className="card-role mono">{p.role}</div>

      <div className="card-stack">
        {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
      </div>

      <div className="card-links">
        <a href={p.repo} target="_blank" rel="noopener noreferrer">
          Code <Icon.arrow />
        </a>
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer">
            Live demo <Icon.arrow />
          </a>
        )}
      </div>
    </article>
  )
}
