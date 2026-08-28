import { useEffect, useRef } from 'react'
import { SectionHead } from './Chrome'
import { timeline } from '../data/content'

export function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return
      const container = lineRef.current.parentElement
      if (!container) return
      const rect = container.getBoundingClientRect()
      const viewportMid = window.innerHeight / 2
      const progress = Math.max(0, viewportMid - rect.top)
      const height = Math.min(rect.height, progress)
      lineRef.current.style.height = `${height}px`

      const rows = container.querySelectorAll('.tl-row')
      rows.forEach(row => {
        const node = row.querySelector('.tl-node')
        if (!node) return
        const nodeRect = node.getBoundingClientRect()
        if (viewportMid >= nodeRect.top + nodeRect.height / 2) {
          row.classList.add('active')
        } else {
          row.classList.remove('active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="timeline" className="section" aria-label="Timeline">
      <SectionHead eyebrow="Career path" meta="6 experiences" />
      <div className="section-body">
        <h2 className="display">timeline<span className="dot">.</span></h2>
        <p className="lede">A visual history of experiments, roles, and continuous evolution in tech.</p>
        <hr className="section-divider" />

        <div className="tl" style={{ marginTop: 44 }}>
          <div className="tl-progress" ref={lineRef}></div>
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
                {side === 'left' ? card : <div className="tl-year-text left-year">{t.year}</div>}
                <div className="tl-center">
                  <span className="tl-node" aria-hidden="true" />
                </div>
                {side === 'right' ? card : <div className="tl-year-text right-year">{t.year}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
