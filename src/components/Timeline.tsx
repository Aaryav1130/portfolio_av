import { SectionHead } from './Chrome'
import { timeline } from '../data/content'

export function Timeline() {
  return (
    <section id="timeline" className="section" aria-label="Timeline">
      <SectionHead eyebrow="Career path" meta={`${timeline.length} entries`} />
      <div className="section-body">
        <h2 className="display">timeline<span className="dot">.</span></h2>
        <p className="lede">Education, research and recognition, most recent first.</p>

        <div className="tl" style={{ marginTop: 44 }}>
          {timeline.map((t, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            const card = (
              <div className="tl-card" data-year={t.year}>
                <h3>{t.title}</h3>
                <p className="tl-org">{t.org}</p>
                <p className="tl-body">{t.body}</p>
                <div className="tl-tags">
                  {t.tags.map((g) => <span className="chip" key={g}>{g}</span>)}
                </div>
              </div>
            )
            return (
              <div className={`tl-row ${side}`} key={`${t.year}-${t.title}`}>
                {side === 'left' ? card : <div className="tl-empty" />}
                <div className="tl-year">
                  <span className="tl-node" aria-hidden="true" />
                  {t.year}
                </div>
                {side === 'right' ? card : <div className="tl-empty" />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
