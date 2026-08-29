# av. — Aaryav Chaudhary

Personal portfolio. Neo-brutalist Swiss-grid layout, built from scratch — no UI kit, no CSS framework, no component library.

## Stack

Vite 6 · React 18 · TypeScript 5.7 — and nothing else. Seven dependencies total, five of which are the toolchain itself.

Tailwind, PostCSS and `lucide-react` were all evaluated and dropped: the design is a hard-edged grid with a fixed token palette, which hand-written CSS expresses more directly than utility classes, and the 25 icons are inline SVG in `src/components/Icons.tsx` rather than a 300-icon dependency.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

There is also `preview.html` at the repo root — a generated single-file mirror of the whole site with CSS inlined, the portrait base64'd, and vanilla-JS versions of the theme toggle, project filters and draggable ring. It opens on a double-click with no install. Regenerate it after editing content or styles:

```bash
python gen_preview.py
```

## Architecture

`src/data/content.ts` is the single source of truth for every piece of copy on the site. Components hold zero literal text — they read from that module and are typed against it, so a change to a project name or a metric happens in exactly one place and the compiler finds every consumer.

```
src/
  data/content.ts     profile · projects · skills · timeline · stack — all copy
  styles.css          design tokens + every rule, with a dark-mode override block
  components/
    Chrome.tsx        nav (scrollspy) · status bar · section heads · side rail
    Hero.tsx          ME — wordmark, portrait, spec sheet, marquee, skills, mission
    Work.tsx          PROJECTS — filter pills + card grid
    Timeline.tsx      TIMELINE — alternating spine
    Stack.tsx         STACK — draggable 3D ring
    Connect.tsx       CONNECT — contact + socials
    Icons.tsx         25 inline SVG icons
```

## Design system

Zero border-radius, hard offset shadows instead of blur, 1px structural rules, monospace micro-labels. Everything is a CSS custom property on `:root` with an `html[data-theme='dark']` override, so the whole palette shifts from one attribute.

The scale is deliberate rather than eyeballed — the type ramp, band paddings and rule weights were derived by measuring reference captures in units of their own cap-height, and the reasoning behind each non-obvious value is left in a comment next to it in `styles.css`.

Sections: **ME → PROJECTS → TIMELINE → STACK → CONNECT.**

## Deploying

`vercel.json` already carries the SPA rewrite. Point Vercel at this repo; build command `npm run build`, output `dist`.

## Contact

[GitHub](https://github.com/Aaryav1130) · [LinkedIn](https://www.linkedin.com/in/aaryav-chaudhary/) · [LeetCode](https://leetcode.com/u/Aaron_1055/) · aaryav1130@gmail.com
