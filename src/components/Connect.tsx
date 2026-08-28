import type { FormEvent } from 'react'
import { Icon } from './Icons'
import { SectionHead } from './Chrome'
import { profile } from '../data/content'

export function Connect() {
  const { links } = profile

  // mailto keeps the form working with zero backend — no service to break or expire.
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Portfolio enquiry — ${f.get('name') || 'no name'}`
    const body = `${f.get('message') || ''}\n\n—\n${f.get('name') || ''}\n${f.get('email') || ''}`
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="connect" className="section" aria-label="Contact">
      <SectionHead eyebrow="Get in touch" meta={profile.availability} />
      <div className="section-body" style={{ paddingBottom: 40 }}>
        <h2 className="display">connect<span className="dot">.</span></h2>
        <p className="lede">
          Open to AI/ML engineering roles and internships. Let's collaborate and build innovative solutions together.
        </p>
      </div>

      <div className="connect">
        <div className="connect-col">
          <div className="connect-h">Send a message</div>
          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" name="name" required autoComplete="name" placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
            </div>
            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea id="cf-msg" name="message" required placeholder="Tell me about your project..." />
            </div>
            <button className="btn-submit" type="submit">
              Send message <Icon.arrow />
            </button>
          </form>
        </div>

        <div className="connect-col">
          <div className="connect-h">Contact info</div>

          <div className="info-row"><Icon.pin /> {profile.location}</div>
          <a className="info-row" href={`mailto:${links.email}`}><Icon.mail /> {links.email}</a>
          <a className="info-row" href={`tel:+91${links.phone}`}><Icon.phone /> +91 {links.phone}</a>

          <div className="connect-h no-line" style={{ margin: '26px 0 0', paddingBottom: 0 }}>Find me online</div>
          <div className="social">
            <a href={links.github} target="_blank" rel="noopener noreferrer"><Icon.github /> GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><Icon.linkedin /> LinkedIn</a>
            <a href={links.leetcode} target="_blank" rel="noopener noreferrer"><Icon.code /> LeetCode</a>
            <a href={links.resume} download><Icon.download /> R&eacute;sum&eacute;</a>
          </div>

          <div className="avail">
            <div className="h"><span className="green-sq" /> {profile.availability}</div>
            <p>
              AI engineer @ Cynapto. Open to interesting opportunities and collaborations.
            </p>
          </div>
        </div>
      </div>

      <footer className="footer mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React, TypeScript &amp; Vite</span>
        <span>{profile.version}</span>
      </footer>
    </section>
  )
}
