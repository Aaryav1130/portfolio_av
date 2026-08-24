import { useEffect, useRef, useState } from 'react'
import { Icon, type IconName } from './Icons'
import { SectionHead } from './Chrome'
import { stack } from '../data/content'

const RADIUS = 400

/**
 * Draggable 3D ring. Progressive enhancement:
 * - pointer drag + arrow keys rotate it
 * - on small screens / reduced-motion, CSS hides the ring and shows a static grid
 */
export function Stack() {
  const [angle, setAngle] = useState(0)
  const drag = useRef<{ x: number; start: number } | null>(null)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function move(e: PointerEvent) {
      if (!drag.current) return
      setAngle(drag.current.start + (e.clientX - drag.current.x) * 0.35)
    }
    function up() { drag.current = null }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const step = 360 / stack.length

  return (
    <section id="stack" className="section" aria-label="Tech stack">
      <SectionHead eyebrow="Tech radar" meta={`${stack.length} technologies`} />
      <div className="section-body">
        <h2 className="display">stack<span className="dot">.</span></h2>
        <div className="explore-hint">
          <p className="lede" style={{ marginTop: 6 }}>
            The tools I reach for. Drag to rotate, or use the arrow keys.
          </p>
        </div>

        <div
          className="ring-wrap"
          ref={wrap}
          role="group"
          aria-label="Rotatable technology gallery"
          tabIndex={0}
          onPointerDown={(e) => { drag.current = { x: e.clientX, start: angle } }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { setAngle((a) => a - step); e.preventDefault() }
            if (e.key === 'ArrowLeft') { setAngle((a) => a + step); e.preventDefault() }
          }}
        >
          <div className="ring-centre">
            <p className="t1">Built with</p>
            <p className="t2">a measured stack.</p>
            <p className="t3 mono">Drag to explore</p>
          </div>

          <div className="ring" style={{ transform: `translateZ(-${RADIUS}px) rotateY(${angle}deg)` }}>
            {stack.map((s, i) => {
              const Ico = Icon[s.icon as IconName] ?? Icon.box
              return (
                <div
                  key={s.name}
                  className="ring-card"
                  style={{ transform: `rotateY(${i * step}deg) translateZ(${RADIUS}px)` }}
                >
                  <Ico />
                  <span className="n">{s.name}</span>
                  <span className="no">{s.note}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Accessible / mobile / reduced-motion fallback */}
        <ul className="stack-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {stack.map((s) => {
            const Ico = Icon[s.icon as IconName] ?? Icon.box
            return (
              <li className="stack-item" key={s.name}>
                <Ico />
                <div>
                  <div className="n">{s.name}</div>
                  <div className="no">{s.note}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
