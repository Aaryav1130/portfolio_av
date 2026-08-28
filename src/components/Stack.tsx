import { useEffect, useRef, useState } from 'react'
import { Icon, type IconName } from './Icons'
import { SectionHead } from './Chrome'
import { stack } from '../data/content'

const RADIUS = 380

/**
 * Draggable 3D ring. Progressive enhancement:
 * - pointer drag + arrow keys rotate it
 * - on small screens / reduced-motion, CSS hides the ring and shows a static grid
 */
export function Stack() {
  const drag = useRef<{ x: number; start: number } | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(0)

  const step = 360 / stack.length

  useEffect(() => {
    let frame: number
    let lastTime = performance.now()

    function spin() {
      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(-${RADIUS}px) rotateY(${angleRef.current}deg)`
      }
    }

    function tick(time: number) {
      if (!drag.current) {
        angleRef.current -= (time - lastTime) * 0.015
        spin()
      }
      lastTime = time
      frame = requestAnimationFrame(tick)
    }

    function move(e: PointerEvent) {
      if (!drag.current) return
      angleRef.current = drag.current.start + (e.clientX - drag.current.x) * 0.35
      spin()
    }
    function up() { drag.current = null }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="stack" className="section" aria-label="Tech stack">
      <SectionHead eyebrow="Tech radar" meta="Circular gallery" />
      <div className="section-body">
        <h2 className="display">explore<span className="dot">.</span></h2>
        <div className="explore-hint">
          <p className="lede" style={{ marginTop: 6 }}>
            Drag to rotate the gallery. Hover over cards to flip them. Click to expand and read in detail.
          </p>
        </div>
        <hr className="section-divider" />

        <div
          className="ring-wrap"
          ref={wrapRef}
          role="group"
          aria-label="Rotatable technology gallery"
          tabIndex={0}
          onPointerDown={(e) => { drag.current = { x: e.clientX, start: angleRef.current } }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { angleRef.current -= step; if(ringRef.current) ringRef.current.style.transform = `translateZ(-${RADIUS}px) rotateY(${angleRef.current}deg)`; e.preventDefault() }
            if (e.key === 'ArrowLeft') { angleRef.current += step; if(ringRef.current) ringRef.current.style.transform = `translateZ(-${RADIUS}px) rotateY(${angleRef.current}deg)`; e.preventDefault() }
          }}
        >
          <div className="ring-centre">
            <p className="t1">The future is built on</p>
            <p className="t2">Creative Technology.</p>
            <p className="t3">DRAG TO EXPLORE</p>
          </div>

          <div className="ring" ref={ringRef} style={{ transform: `translateZ(-${RADIUS}px) rotateY(0deg)` }}>
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
