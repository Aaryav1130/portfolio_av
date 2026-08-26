type P = { className?: string }
const base = {
  fill: 'none', strokeWidth: 1.7, strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const, viewBox: '0 0 24 24',
}

export const Icon = {
  github: (p: P) => (<svg {...base} {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 4.8 4.9 4.9 0 0 0 18.9 1S17.6.6 15 2.5a12.3 12.3 0 0 0-6 0C6.4.6 5.1 1 5.1 1A4.9 4.9 0 0 0 5 4.8a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9 17.7V22"/></svg>),
  linkedin: (p: P) => (<svg {...base} {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>),
  mail: (p: P) => (<svg {...base} {...p}><rect x="2" y="4" width="20" height="16"/><path d="m22 7-10 6L2 7"/></svg>),
  code: (p: P) => (<svg {...base} {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>),
  pin: (p: P) => (<svg {...base} {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  phone: (p: P) => (<svg {...base} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z"/></svg>),
  download: (p: P) => (<svg {...base} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>),
  arrowNE: (p: P) => (<svg {...base} {...p}><path d="M7 17 17 7M7 7h10v10"/></svg>),
  arrow: (p: P) => (<svg {...base} {...p}><path d="M5 12h14M12 5l7 7-7 7"/></svg>),
  sun: (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>),
  moon: (p: P) => (<svg {...base} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>),
  menu: (p: P) => (<svg {...base} {...p}><path d="M3 12h18M3 6h18M3 18h18"/></svg>),
  close: (p: P) => (<svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>),
  // stack icons
  flame: (p: P) => (<svg {...base} {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.4-4.6 2-6-.4 3 1.5 3.9 2.8 5.4A6.5 6.5 0 0 1 18 12a6 6 0 1 1-12 0c0-.8.2-1.6.5-2.3"/></svg>),
  link: (p: P) => (<svg {...base} {...p}><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>),
  git: (p: P) => (<svg {...base} {...p}><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9v6a3 3 0 0 0 3 3h6"/></svg>),
  layers: (p: P) => (<svg {...base} {...p}><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>),
  zap: (p: P) => (<svg {...base} {...p}><path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z"/></svg>),
  box: (p: P) => (<svg {...base} {...p}><path d="M21 8v8l-9 5-9-5V8l9-5 9 5z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>),
  container: (p: P) => (<svg {...base} {...p}><rect x="3" y="8" width="18" height="12"/><path d="M7 8V5h4v3M13 8V5h4v3M7 12h4M13 12h4"/></svg>),
  cloud: (p: P) => (<svg {...base} {...p}><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 2A3.5 3.5 0 0 0 6.5 19h11z"/></svg>),
  database: (p: P) => (<svg {...base} {...p}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>),
  bolt: (p: P) => (<svg {...base} {...p}><path d="M12 2v6l4-2-2 6h-4l2 6-4-2v6"/></svg>),
  chart: (p: P) => (<svg {...base} {...p}><path d="M3 3v18h18M8 17V9M13 17v-5M18 17v-9"/></svg>),
  check: (p: P) => (<svg {...base} {...p}><path d="M20 6 9 17l-5-5"/></svg>),
  clock: (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>),
} as const

export type IconName = keyof typeof Icon
