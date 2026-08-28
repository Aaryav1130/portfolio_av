#!/usr/bin/env python3
"""
Build a single self-contained preview.html from the real source of truth:
  src/styles.css      -> inlined verbatim
  src/data/content.ts -> evaluated by node, loaded here as JSON
  src/components/*    -> markup mirrored, icons extracted from Icons.tsx
  public/img          -> portrait inlined as base64

The point: see the actual design in a browser with no npm install.
This file is a dev aid, not part of the app build.
"""
import base64
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
if not (ROOT / "src").exists():
    ROOT = pathlib.Path("/sessions/gallant-quirky-pascal/mnt/Portfolio_Claude")

def load_content():
    """Strip the TS type syntax off content.ts and let node evaluate it, so the
    preview always reflects the real data file with no hand-maintained copy."""
    import subprocess, tempfile, os
    src = (ROOT / "src/data/content.ts").read_text(encoding="utf-8")
    js = re.sub(r"^export type [\s\S]*?\n\}\n", "", src, flags=re.M)
    js = re.sub(r"^export type .*$", "", js, flags=re.M)
    js = re.sub(r"\bexport const (\w+)\s*:\s*[A-Za-z_][\w\[\]<>., |']*=", r"const \1 =", js)
    js = js.replace("export const ", "const ")
    js = re.sub(r"\bas const\b", "", js)
    names = re.findall(r"^const (\w+)", js, flags=re.M)
    js += "\nconsole.log(JSON.stringify({%s}))\n" % ",".join(names)
    fd, path = tempfile.mkstemp(suffix=".mjs")
    try:
        os.write(fd, js.encode()); os.close(fd)
        out = subprocess.run(["node", path], capture_output=True, text=True)
        if out.returncode:
            raise SystemExit("content.ts failed to evaluate:\n" + out.stderr)
        return json.loads(out.stdout)
    finally:
        os.unlink(path)


D = load_content()
profile, marquee = D["profile"], D["marquee"]
projects, skills = D["projects"], D["skills"]
timeline, stack = D["timeline"], D["stack"]

CSS = (ROOT / "src/styles.css").read_text(encoding="utf-8")

# ---------- icons: lift the SVG bodies straight out of Icons.tsx ----------
ICON_SRC = (ROOT / "src/components/Icons.tsx").read_text(encoding="utf-8")
ICONS = {}
for m in re.finditer(r"^\s*(\w+): \(p: P\) => \(<svg \{\.\.\.base\} \{\.\.\.p\}>(.*?)</svg>\),\s*$",
                     ICON_SRC, flags=re.M):
    inner = m.group(2)
    for a, b in (("strokeWidth", "stroke-width"), ("strokeLinecap", "stroke-linecap"),
                 ("strokeLinejoin", "stroke-linejoin"), ("clipRule", "clip-rule"),
                 ("fillRule", "fill-rule")):
        inner = inner.replace(a, b)
    ICONS[m.group(1)] = inner
assert "arrow" in ICONS and "github" in ICONS, "icon extraction failed"


def ico(name):
    """Match the base props in Icons.tsx. Size/stroke come from CSS."""
    body = ICONS.get(name, ICONS["box"])
    return ('<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" '
            'stroke-linecap="round" stroke-linejoin="round">' + body + "</svg>")


def esc(s):
    return html.escape(str(s), quote=True)


def chips(xs):
    return "".join('<span class="chip">%s</span>' % esc(x) for x in xs)


# Unused since 2026-08-26: the featured card was the only consumer, and the
# reference's version of that card has no bullet list (see featured_card below).
# Kept because project `points` are still authored in content.ts and any future
# card variant that renders them will want this exact markup back.
def bullets(xs):
    lis = "".join('<li style="margin-bottom:8px">%s</li>' % esc(x) for x in xs)
    return ('<ul style="margin:16px 0 0;padding-left:20px;color:var(--muted);'
            'font-size:15px">%s</ul>' % lis)


# ---------------------------- chrome ----------------------------
SECTIONS = [("me", "Me"), ("projects", "Projects"),
            ("timeline", "Timeline"), ("stack", "Stack"), ("connect", "Connect")]

nav_links = "".join(
    '<a class="nav-link" href="#%s"%s>%s</a>' % (i, ' aria-current="true"' if i == "me" else "", l)
    for i, l in SECTIONS)

NAV = """<nav class="nav" aria-label="Main">
  <a class="nav-mark" href="#me">{mark}<span class="dot">.</span></a>
  <div class="nav-links" id="navlinks">{links}</div>
  <button class="nav-burger" id="burger" aria-expanded="false" aria-label="Open menu">{menu}</button>
  <button class="nav-toggle" id="themebtn" aria-label="Switch theme">{moon}</button>
</nav>""".format(mark=esc(profile["wordmark"]), links=nav_links,
                 menu=ico("menu"), moon=ico("moon"))

STATUS = """<div class="statusbar mono" role="status">
  <span>{t}</span><span class="hide-sm">{loc}</span><span class="spacer"></span>
  <span><i class="pulse" aria-hidden="true"></i>{av}</span><span class="hide-sm">{v}</span>
</div>""".format(t=esc(profile["title"]), loc=esc(profile["location"]),
                 av=esc(profile["availability"]), v=esc(profile["version"]))

RAIL = ('<div class="rail" aria-hidden="true">'
        '<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">'
        '<path d="M7 17 17 7M7 7h10v10"/></svg>'
        '<span>%s — %s</span><b class="rail-serial">%s</b></div>'
        % (esc(profile["name"]), esc(profile["title"]), esc(profile["serial"])))


def head(eyebrow, meta):
    return ('<div class="section-head mono"><span>%s</span><span class="head-meta">%s</span></div>'
            % (esc(eyebrow).upper(), esc(meta).upper()))


# ----------------------------- hero -----------------------------
portrait_b64 = base64.b64encode((ROOT / "public/img/portrait.jpg").read_bytes()).decode()

spec = "".join('<div class="spec-row"><dt>%s</dt><dd>%s</dd></div>'
               % (esc(r["label"]), esc(r["value"])) for r in profile["spec"])
track = ('<div class="marquee-track" aria-hidden="true">%s</div>'
         % "".join("<span>%s</span>" % esc(m) for m in marquee))
def _skill_items(g):
    return "".join('<div class="skill-i">%s</div>' % esc(i) for i in g["items"])

sks = "".join('<div class="skill-col"><div class="skill-h mono">%s</div>'
              '<div class="skill-scroll" style="--n:%d;--i:%d">'
              '<div class="skill-track">%s<div aria-hidden="true">%s</div></div></div></div>'
              % (esc(g["group"]), len(g["items"]), ci, _skill_items(g), _skill_items(g))
              for ci, g in enumerate(skills))

HERO = """<section id="me" aria-label="Introduction">
  <div class="hero">
    {rail}
    <div class="hero-main">
      <h1 class="hero-mark">{mark}<span class="mark-dot" aria-hidden="true"></span></h1>
      <p class="hero-name">{name}</p>
      <p class="hero-bio">{bio}</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#projects">View projects {arrow}</a>
        <a class="btn btn-ghost" href="{cv}" download>Download CV {dl}</a>
      </div>
      <dl class="spec"><div class="spec-h mono">Specification</div>{spec}</dl>
    </div>
    <figure class="hero-figure" style="margin:0">
      <img src="data:image/jpeg;base64,{img}" alt="{name}, {title}" width="900" height="1125">
      <span class="bracket tl"></span><span class="bracket tr"></span>
      <span class="bracket bl"></span><span class="bracket br"></span>
      <figcaption class="figure-tag mono">Serial — 001</figcaption>
      <div class="figure-bar mono" aria-hidden="true"><span>{fbl}</span><span>{fbr}</span></div>
    </figure>
  </div>
  <div class="marquee">{track}{track}</div>
  <div class="skills">{sks}</div>
  <div class="mission">
    <div class="mission-rail" aria-hidden="true"><span>Mission statement</span></div>
    <div class="mission-body">
      <h2>Building systems that <span class="em">retrieve, reason and hold up under measurement<svg
        class="underline" viewBox="0 0 300 9" preserveAspectRatio="none" aria-hidden="true"><path
        d="M2 6c60-4 120-4 180-1s80 2 116-2" fill="none" stroke="currentColor" stroke-width="3"
        stroke-linecap="round"/></svg></span> — not just demos.</h2>
      <p class="hand" style="margin-top:26px">— yeah, i actually built all of this ↑</p>
    </div>
  </div>
</section>""".format(fbl=esc(profile["figureBar"]["left"]), fbr=esc(profile["figureBar"]["right"]),
           mark=esc(profile["wordmark"]), name=esc(profile["name"]),
                     bio=esc(profile["tagline"]), title=esc(profile["title"]),
                     cv=esc(profile["links"]["resume"]), img=portrait_b64,
                     arrow=ico("arrow"), dl=ico("download"), rail=RAIL,
                     spec=spec, track=track, sks=sks)

# ---- WORK / experience section removed 2026-08-24: the TIMELINE covers
# Aaryav's single role, and timeline[0] in content.ts now carries its four
# metrics. `experience` is intentionally no longer read here. ----


def build_clock(since):
    """Mirror of BuildClock() in src/components/Work.tsx.

    The static date label is rendered here; the ticking d/h/m/s span is filled by
    the JS at the bottom of this file, keyed off data-since. Both sides append
    T00:00:00 so the date is read as LOCAL midnight — a bare 'YYYY-MM-DD' is
    parsed as UTC by the JS spec, which would shift the day count for anyone off
    UTC, Aaryav included at +5:30."""
    y, m, d = (int(x) for x in since.split("-"))
    MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
           "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    label = "%02d %s %d" % (d, MON[m - 1], y)
    return ('<div class="build-clock">'
            '<span class="bc-h">%s Building since</span>'
            '<span class="bc-d">%s</span>'
            # aria-hidden: a value changing every second makes a screen reader
            # unusable, and .bc-d above carries the same information.
            '<span class="bc-t" aria-hidden="true" data-since="%s">&mdash;</span>'
            '</div>') % (ico("clock"), esc(label), esc(since))


def featured_card(p):
    """Mirror of FeaturedCard() in src/components/Work.tsx — the reference's
    "currently building" panel, NOT an enlarged grid card. Renders a deliberately
    shorter subset (status / year / category / title / blurb / one chip row /
    link): no bullet list, no role line, no metric chips. See the .card.featured
    comment block in src/styles.css for the measurements behind that."""
    status = ('<span class="status-pill"><i class="pulse" aria-hidden="true"></i>%s</span>'
              % esc(p["status"])) if p.get("status") else ""
    clock = build_clock(p["since"]) if p.get("since") else ""
    live = ('<a href="%s" target="_blank" rel="noopener noreferrer">Live demo %s</a>'
            % (esc(p["live"]), ico("arrow"))) if p.get("live") else ""
    return """<article class="card featured" data-cat="{cat}">
      <div class="feat-wrap">
        <div class="feat-main">
          <div class="feat-top">{status}<span class="mono feat-year">{yr}</span><span class="badge badge-out">{cat}</span></div>
          <h3 class="card-t">{nm}</h3>
          <p class="card-b">{bl}</p>
          <div class="card-stack">{st}</div>
        </div>{clock}
      </div>
      <div class="card-links"><a href="{repo}" target="_blank" rel="noopener noreferrer">View {ar}</a>{live}</div>
    </article>""".format(cat=esc(p["category"]), status=status, yr=esc(p["year"]),
                         nm=esc(p["name"]), bl=esc(p["blurb"]), st=chips(p["stack"]),
                         clock=clock, repo=esc(p["repo"]), ar=ico("arrow"), live=live)


def card(p):
    cls = "card" + (" draft" if p.get("draft") else "")
    top = ('<span class="draft-flag">Needs detail</span>' if p.get("draft")
           else '<span class="badge">%s</span>' % esc(p["category"]))
    ms = ""
    if p.get("metrics"):
        ms = ('<div class="card-metrics">%s</div>'
              % "".join('<span class="m">%s</span>' % esc(m) for m in p["metrics"]))
    live = ('<a href="%s" target="_blank" rel="noopener noreferrer">Live demo %s</a>'
            % (esc(p["live"]), ico("arrow"))) if p.get("live") else ""
    return """<article class="{cls}" data-cat="{cat}">
      <div class="card-top"><span class="mono" style="color:var(--muted)">{yr}</span>{top}</div>
      <h3 class="card-t">{nm}</h3><p class="card-b">{bl}</p>{ms}
      <div class="card-role mono">{role}</div>
      <div class="card-stack">{st}</div>
      <div class="card-links"><a href="{repo}" target="_blank" rel="noopener noreferrer">Code {ar}</a>{live}</div>
    </article>""".format(cls=cls, cat=esc(p["category"]), yr=esc(p["year"]), top=top,
                         nm=esc(p["name"]), bl=esc(p["blurb"]), ms=ms,
                         role=esc(p["role"]), st=chips(p["stack"]), repo=esc(p["repo"]),
                         ar=ico("arrow"), live=live)


filters = "".join('<button class="filter" data-f="%s"%s>%s</button>'
                  % (f, ' aria-pressed="true"' if f == "ALL" else "", f)
                  for f in ["ALL", "AI", "FULL STACK", "ML"])

PROJECTS = """<section id="projects" class="section" aria-label="Projects">{h}
  <div class="section-body">
    <h2 class="display">projects<span class="dot">.</span></h2>
    <p class="lede">Retrieval systems, multi-agent platforms and ML services — built end to end and measured.</p>
    <div class="filters" role="group" aria-label="Filter projects" style="margin-top:34px">{f}</div>
    <div class="grid3" id="grid">{cards}</div>
  </div></section>""".format(h=head("Selected work", "%d projects" % len(projects)), f=filters,
                            cards="".join(card(p) for p in projects))

# --------------------------- timeline ---------------------------
rows = ""
for i, t in enumerate(timeline):
    side = 'left' if i % 2 == 0 else 'right'
    card_html = (f'<div class="tl-card" data-year="{esc(t["year"])}"><h3>{esc(t["title"])}</h3>'
                 f'<p class="tl-org">{esc(t["org"])}</p><p class="tl-body">{esc(t["body"])}</p>'
                 '<div class="tl-tags">' +
                 "".join(f'<span class="chip">{esc(g)}</span>' for g in t["tags"]) +
                 '</div></div>')
    col1 = card_html if side == 'left' else f'<div class="tl-year-text left-year">{esc(t["year"])}</div>'
    col3 = card_html if side == 'right' else f'<div class="tl-year-text right-year">{esc(t["year"])}</div>'
    rows += f'''
            <div class="tl-row {side}">
              {col1}
              <div class="tl-center"><span class="tl-node"></span></div>
              {col3}
            </div>'''

TIMELINE = """<section id="timeline" class="section" aria-label="Timeline">{h}
  <div class="section-body">
    <h2 class="display">timeline<span class="dot">.</span></h2>
    <p class="lede">A visual history of experiments, roles, and continuous evolution in tech.</p>
    <hr class="section-divider" />
    <div class="tl" id="tl-container" style="margin-top:44px">
      <div class="tl-progress" id="tl-progress"></div>
      {rows}
    </div>
  </div></section>""".format(h=head("Career path", "6 experiences"), rows=rows)


METRICS = """<section id="metrics" aria-label="By the numbers" style="border-top: 1px solid var(--line);">
  <div class="mono" style="padding: 16px 24px; border-bottom: 1px solid var(--line); font-size: 10px; letter-spacing: 0.1em; color: var(--muted);">
    BY THE NUMBERS
  </div>
  <div class="metrics">
    <div class="metric"><div class="metric-v">1+</div><div class="metric-l">YEARS EXPERIENCE</div></div>
    <div class="metric"><div class="metric-v">15+</div><div class="metric-l">PROJECTS DELIVERED</div></div>
    <div class="metric"><div class="metric-v">20+</div><div class="metric-l">TECHNOLOGIES</div></div>
    <div class="metric"><div class="metric-v">&infin;</div><div class="metric-l">INNOVATION</div></div>
  </div>
</section>"""

# ----------------------------- stack ----------------------------
RADIUS = 380
step = 360.0 / len(stack)
ring = "".join(
    '<div class="ring-card" style="transform:rotateY(%.4fdeg) translateZ(%dpx)">%s'
    '<span class="n">%s</span><span class="no">%s</span></div>'
    % (i * step, RADIUS, ico(s["icon"]), esc(s["name"]), esc(s["note"]))
    for i, s in enumerate(stack))
sgrid = "".join('<li class="stack-item">%s<div><div class="n">%s</div>'
                '<div class="no">%s</div></div></li>'
                % (ico(s["icon"]), esc(s["name"]), esc(s["note"])) for s in stack)

STACK = """<section id="stack" class="section" aria-label="Tech stack">{h}
  <div class="section-body">
    <h2 class="display">explore<span class="dot">.</span></h2>
    <div class="explore-hint"><p class="lede" style="margin-top:6px">
      Drag to rotate the gallery. Hover over cards to flip them. Click to expand and read in detail.</p></div>
    <hr class="section-divider" />
    <div class="ring-wrap" id="ringwrap" role="group" aria-label="Rotatable technology gallery" tabindex="0">
      <div class="ring-centre"><p class="t1">The future is built on</p><p class="t2">Creative Technology.</p>
        <p class="t3">DRAG TO EXPLORE</p></div>
      <div class="ring" id="ring" style="transform:translateZ(-{r}px) rotateY(0deg)">{ring}</div>
    </div>
    <ul class="stack-grid" style="list-style:none;padding:0;margin:0">{sgrid}</ul>
  </div></section>""".format(h=head("Tech radar", "Circular gallery"),
                            r=RADIUS, ring=ring, sgrid=sgrid)

# ---------------------------- connect ---------------------------
L = profile["links"]
CONNECT = """<section id="connect" class="section" aria-label="Contact">{h}
  <div class="section-body" style="padding-bottom:40px">
    <h2 class="display">connect<span class="dot">.</span></h2>
    <p class="lede">Open to AI/ML engineering roles and internships. The fastest way to reach me is email.</p>
  </div>
  <div class="connect">
    <div class="connect-col">
      <p class="mono" style="color:var(--muted);margin-bottom:22px">Send a message</p>
      <form id="cform">
        <div class="field"><label for="cf-name">Name</label>
          <input id="cf-name" name="name" required placeholder="Your name"></div>
        <div class="field"><label for="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required placeholder="you@company.com"></div>
        <div class="field"><label for="cf-msg">Message</label>
          <textarea id="cf-msg" name="message" required placeholder="What would you like to talk about?"></textarea></div>
        <button class="btn btn-primary" type="submit">Send message {ar}</button>
      </form>
    </div>
    <div class="connect-col">
      <p class="mono" style="color:var(--muted);margin-bottom:22px">Contact info</p>
      <div class="info-row">{pin} {loc}</div>
      <a class="info-row" href="mailto:{em}">{mail} {em}</a>
      <a class="info-row" href="tel:+91{ph}">{phone} +91 {ph}</a>
      <p class="mono" style="color:var(--muted);margin:26px 0 0">Find me online</p>
      <div class="social">
        <a href="{gh}" target="_blank" rel="noopener noreferrer">{ghi} GitHub</a>
        <a href="{li}" target="_blank" rel="noopener noreferrer">{lii} LinkedIn</a>
        <a href="{lc}" target="_blank" rel="noopener noreferrer">{code} LeetCode</a>
        <a href="{cv}" download>{dl} Résumé</a>
      </div>
      <div class="avail"><p class="h">{ck} {av}</p>
        <p>Final-year B.Tech CSE at IIIT Bhopal, graduating 2027. Looking for AI/ML engineering
        roles and internships — happy to talk about retrieval systems, agents or anything above.</p>
      </div>
    </div>
  </div>
  <footer class="footer mono"><span>© 2026 {name}</span>
    <span>Built with React, TypeScript &amp; Vite</span><span>{v}</span></footer>
</section>""".format(h=head("Get in touch", profile["availability"]), ar=ico("arrow"),
                    pin=ico("pin"), loc=esc(profile["location"]), mail=ico("mail"),
                    em=esc(L["email"]), phone=ico("phone"), ph=esc(L["phone"]),
                    gh=esc(L["github"]), ghi=ico("github"), li=esc(L["linkedin"]),
                    lii=ico("linkedin"), lc=esc(L["leetcode"]), code=ico("code"),
                    cv=esc(L["resume"]), dl=ico("download"), ck=ico("check"),
                    av=esc(profile["availability"]), name=esc(profile["name"]),
                    v=esc(profile["version"]))

# ------------------------------ js ------------------------------
JS = """
var SUN = __SUN__, MOON = __MOON__, MENU = __MENU__, CLOSE = __CLOSE__;
var root = document.documentElement, tb = document.getElementById('themebtn');
var dark = false;
try {
  var saved = localStorage.getItem('theme');
  dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
} catch (e) {}
function paint() {
  root.dataset.theme = dark ? 'dark' : 'light';
  tb.innerHTML = dark ? SUN : MOON;
  tb.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
paint();
tb.addEventListener('click', function () {
  dark = !dark;
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  paint();
});

// mobile menu
var burger = document.getElementById('burger'), nl = document.getElementById('navlinks'), open = false;
burger.addEventListener('click', function () {
  open = !open;
  nl.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.innerHTML = open ? CLOSE : MENU;
});
nl.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav-link') && open) { burger.click(); }
});

// scroll-spy — same observer options as Chrome.tsx
var links = [].slice.call(document.querySelectorAll('.nav-link'));
var obs = new IntersectionObserver(function (entries) {
  var vis = entries.filter(function (e) { return e.isIntersecting; })
    .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
  if (!vis) return;
  links.forEach(function (a) {
    if (a.getAttribute('href') === '#' + vis.target.id) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}, { rootMargin: '-90px 0px -55% 0px', threshold: [0.1, 0.5] });
['me', 'projects', 'timeline', 'stack', 'connect'].forEach(function (id) {
  var el = document.getElementById(id); if (el) obs.observe(el);
});

// project filters
var fbtns = [].slice.call(document.querySelectorAll('.filter'));
fbtns.forEach(function (b) {
  b.addEventListener('click', function () {
    var f = b.dataset.f;
    fbtns.forEach(function (o) {
      if (o === b) o.setAttribute('aria-pressed', 'true'); else o.removeAttribute('aria-pressed');
    });
    [].slice.call(document.querySelectorAll('#grid .card')).forEach(function (c) {
      c.style.display = (f === 'ALL' || c.dataset.cat === f) ? '' : 'none';
    });
  });
});

// BUILDING SINCE ticker — mirror of BuildClock() in src/components/Work.tsx.
// T00:00:00 forces LOCAL midnight; a bare 'YYYY-MM-DD' is UTC per spec, which
// would shift the day count by one for anyone off UTC.
var bcs = [].slice.call(document.querySelectorAll('.bc-t[data-since]'));
if (bcs.length) {
  var tickClocks = function () {
    var now = Date.now();
    bcs.forEach(function (el) {
      var start = new Date(el.dataset.since + 'T00:00:00').getTime();
      var t = Math.max(0, Math.floor((now - start) / 1000));
      el.textContent = Math.floor(t / 86400) + 'd ' + Math.floor((t % 86400) / 3600) +
        'h ' + Math.floor((t % 3600) / 60) + 'm ' + (t % 60) + 's';
    });
  };
  tickClocks();
  setInterval(tickClocks, 1000);
}

// Timeline Scroll Animation
var tlContainer = document.getElementById('tl-container');
var tlProgress = document.getElementById('tl-progress');
var tlRows = [].slice.call(document.querySelectorAll('.tl-row'));
if (tlContainer && tlProgress) {
  var updateTimeline = function() {
    var rect = tlContainer.getBoundingClientRect();
    var viewportMid = window.innerHeight / 2;
    var progress = Math.max(0, viewportMid - rect.top);
    var height = Math.min(rect.height, progress);
    tlProgress.style.height = height + 'px';
    
    tlRows.forEach(function(row) {
      var node = row.querySelector('.tl-node');
      if (node) {
        var nodeRect = node.getBoundingClientRect();
        if (viewportMid >= nodeRect.top + nodeRect.height / 2) {
          row.classList.add('active');
        } else {
          row.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', updateTimeline);
  updateTimeline();
}

// draggable ring
var RADIUS = __RADIUS__, STEP = __STEP__, angle = 0;
var ring = document.getElementById('ring'), wrap = document.getElementById('ringwrap'), drag = null;
function spin() { ring.style.transform = 'translateZ(-' + RADIUS + 'px) rotateY(' + angle + 'deg)'; }
wrap.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, start: angle }; });
addEventListener('pointermove', function (e) {
  if (!drag) return;
  angle = drag.start + (e.clientX - drag.x) * 0.35; spin();
});
addEventListener('pointerup', function () { drag = null; });
wrap.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') { angle -= STEP; spin(); e.preventDefault(); }
  if (e.key === 'ArrowLeft') { angle += STEP; spin(); e.preventDefault(); }
});
var lastT = performance.now();
requestAnimationFrame(function tick(t) {
  if (!drag) { angle -= (t - lastT) * 0.005; spin(); }
  lastT = t; requestAnimationFrame(tick);
});

// mailto form
document.getElementById('cform').addEventListener('submit', function (e) {
  e.preventDefault();
  var f = new FormData(e.currentTarget);
  var subject = 'Portfolio enquiry \\u2014 ' + (f.get('name') || 'no name');
  var body = (f.get('message') || '') + '\\n\\n\\u2014\\n' + (f.get('name') || '') + '\\n' + (f.get('email') || '');
  location.href = 'mailto:__EMAIL__?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
"""
JS = (JS.replace("__SUN__", json.dumps(ico("sun")))
        .replace("__MOON__", json.dumps(ico("moon")))
        .replace("__MENU__", json.dumps(ico("menu")))
        .replace("__CLOSE__", json.dumps(ico("close")))
        .replace("__RADIUS__", str(RADIUS))
        .replace("__STEP__", "%.6f" % step)
        .replace("__EMAIL__", L["email"]))

BANNER = """<div style="position:fixed;left:0;right:0;bottom:0;z-index:99;background:#111;color:#fff;
font:600 11px/1.5 ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;
padding:9px 14px;text-align:center;border-top:2px solid #ff4f1f">
STATIC PREVIEW — generated from src/. Run <span style="color:#ff8a5f">npm run dev</span> for the real app.
</div>"""

OUT = """<!doctype html>
<html lang="en" data-theme="light"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>PREVIEW — {name} · {title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
{css}
body {{ padding-bottom: 42px; }}
</style></head>
<body>
<a class="skip" href="#me">Skip to content</a>
{nav}{status}
<main class="page">{hero}{projects}{timeline}{metrics}{stack}{connect}</main>
{banner}
<script>{js}</script>
</body></html>""".format(name=esc(profile["name"]), title=esc(profile["title"]), css=CSS,
                         nav=NAV, status=STATUS, hero=HERO,
                         projects=PROJECTS, timeline=TIMELINE, metrics=METRICS, stack=STACK,
                         connect=CONNECT, banner=BANNER, js=JS)

# Vite serves public/ at the web root, but this file is opened over file://,
# so point the CV + Resume links at the real relative path.
_r = profile["links"]["resume"]
OUT = OUT.replace('"%s"' % _r, '"public%s"' % _r)

dest = ROOT / "preview.html"
dest.write_text(OUT, encoding="utf-8")
print("wrote %s  (%.1f KB)" % (dest, len(OUT.encode()) / 1024))
print("icons extracted : %d" % len(ICONS))
print("sections        : me, projects(%d), timeline(%d), stack(%d), connect"
      % (len(projects), len(timeline), len(stack)))
