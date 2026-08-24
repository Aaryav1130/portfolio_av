// NOTE: this file keeps the name Work.tsx for import stability, but the WORK /
// experience section was removed on 2026-08-24 (the TIMELINE already covers
// Aaryav's single role). Only the PROJECTS section lives here now. `experience`
// is deliberately no longer imported — it is still exported from content.ts,
// and an unused *export* is fine, but an unused *import* would fail the build
// under noUnusedLocals.
import { useMemo, useState } from 'react'
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

function Card({ p }: { p: Project }) {
  return (
    <article className={`card${p.featured ? ' featured' : ''}${p.draft ? ' draft' : ''}`}>
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

      {p.featured && (
        <ul style={{ margin: '18px 0 0', paddingLeft: 20, color: 'var(--muted)', fontSize: 15 }}>
          {p.points.map((pt, i) => <li key={i} style={{ marginBottom: 8 }}>{pt}</li>)}
        </ul>
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
