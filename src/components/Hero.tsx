import type { CSSProperties } from 'react'
import { Icon } from './Icons'
import { Rail } from './Chrome'
import { profile, marquee, skills } from '../data/content'

export function Hero() {
  return (
    <section id="me" aria-label="Introduction">
      <div className="hero">
        <Rail />
        <div className="hero-main">
          <h1 className="hero-mark">
            {profile.wordmark}<span className="mark-dot" aria-hidden="true" />
          </h1>
          <p className="hero-name">{profile.name}</p>
          <p className="hero-bio">{profile.tagline}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              View projects <Icon.arrow />
            </a>
            <a className="btn btn-ghost" href={profile.links.resume} download>
              Download CV <Icon.download />
            </a>
          </div>

          <dl className="spec">
            <div className="spec-h mono">Specification</div>
            {profile.spec.map((r) => (
              <div className="spec-row" key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="hero-figure" style={{ margin: 0 }}>
          <picture>
            <source srcSet="/img/portrait.webp" type="image/webp" />
            <img src="/img/portrait.jpg" alt={`${profile.name}, ${profile.title}`} width={900} height={1125} />
          </picture>
          <span className="bracket tl" /><span className="bracket tr" />
          <span className="bracket bl" /><span className="bracket br" />
          <figcaption className="figure-tag mono">Serial — 001</figcaption>
          <div className="figure-bar mono" aria-hidden="true">
            <span>{profile.figureBar.left}</span>
            <span>{profile.figureBar.right}</span>
          </div>
        </figure>
      </div>

      <Marquee />

      <div className="skills">
        {skills.map((g, ci) => {
          const items = g.items.map((i) => <div className="skill-i" key={i}>{i}</div>)
          // --n drives the animation duration so all four columns scroll at the
          // same pixel speed regardless of length; --i staggers their phase.
          // The cast is needed because CSSProperties has no index signature.
          const vars = { '--n': g.items.length, '--i': ci } as CSSProperties
          return (
            <div className="skill-col" key={g.group}>
              <div className="skill-h mono">{g.group}</div>
              <div className="skill-scroll" style={vars}>
                <div className="skill-track">
                  {items}
                  <div aria-hidden="true">{items}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Mission />
    </section>
  )
}

function Marquee() {
  const track = (
    <div className="marquee-track" aria-hidden="true">
      {marquee.map((m, i) => <span key={i}>{m}</span>)}
    </div>
  )
  return (
    <div className="marquee">
      {track}{track}
    </div>
  )
}

function Mission() {
  return (
    <div className="mission">
      {/* Rail label is lowercase here; .mission-rail span applies
          text-transform: uppercase, so it renders MISSION STATEMENT. */}
      <div className="mission-rail" aria-hidden="true"><span>Mission statement</span></div>
      <div className="mission-body">
        <h2>
          Building systems that{' '}
          <span className="em">
            retrieve, reason and hold up under measurement
            <svg className="underline" viewBox="0 0 300 9" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 6c60-4 120-4 180-1s80 2 116-2" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{' '}
          — not just demos.
        </h2>
        <p className="hand" style={{ marginTop: 26 }}>— yeah, i actually built all of this ↑</p>
      </div>
    </div>
  )
}
