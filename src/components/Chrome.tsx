import { useEffect, useState } from 'react'
import { Icon } from './Icons'
import { profile } from '../data/content'

const SECTIONS = [
  { id: 'me', label: 'Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'stack', label: 'Explore' },
  { id: 'connect', label: 'Connect' },
]

export function Nav() {
  const [active, setActive] = useState('me')
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefers
    setDark(isDark)
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // highlight the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (vis) setActive(vis.target.id)
      },
      { rootMargin: '-90px 0px -55% 0px', threshold: [0.1, 0.5] },
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="nav" aria-label="Main">
      <a className="nav-mark" href="#me">
        {profile.wordmark}<span className="dot">.</span>
      </a>

      <div className={`nav-links${open ? ' open' : ''}`}>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            className="nav-link"
            href={`#${s.id}`}
            aria-current={active === s.id}
            onClick={() => setOpen(false)}
          >
            {s.label}
          </a>
        ))}
      </div>

      <button
        className="nav-burger"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <Icon.close /> : <Icon.menu />}
      </button>

      <button className="nav-toggle" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
        {dark ? <Icon.sun /> : <Icon.moon />}
      </button>
    </nav>
  )
}

export function StatusBar() {
  return (
    <div className="statusbar mono" role="status">
      <span>{profile.title}</span>
      <span className="hide-sm">{profile.location}</span>
      <span className="spacer" />
      <span><i className="pulse" aria-hidden="true" />{profile.availability}</span>
      <span className="hide-sm">{profile.version}</span>
    </div>
  )
}

export function Rail() {
  return (
    <div className="rail" aria-hidden="true">
      <Icon.arrowNE />
      <span>{profile.name} — {profile.title}</span>
      <b className="rail-serial">{profile.serial}</b>
    </div>
  )
}

export function SectionHead({ eyebrow, meta }: { eyebrow: string; meta?: string }) {
  return (
    <div className="section-head mono">
      <span>{eyebrow}</span>
      {meta && <span className="head-meta">{meta}</span>}
    </div>
  )
}
