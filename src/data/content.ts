/**
 * ALL SITE CONTENT LIVES HERE.
 * Edit this file to update the site — you should never need to touch components.
 */

export const profile = {
  wordmark: 'av',
  name: 'Aaryav Chaudhary',
  title: 'AI Engineer',
  tagline:
    'AI Engineer specializing in LLMs, RAG systems, and privacy-preserving machine learning. Building intelligent systems that bridge research models, retrieval pipelines, and production infrastructure.',
  location: 'Bhopal, India',
  availability: 'OPEN TO OPPORTUNITIES',
  version: 'v1.0.26',
  serial: '001',
  figureBar: { left: 'ENGINEER', right: '2026' },
  spec: [
    { label: 'ROLE', value: 'AI ENGINEER · LLM / RAG SYSTEMS' },
    { label: 'FOCUS', value: 'RETRIEVAL · MULTI-AGENT · PRIVACY-PRESERVING ML' },
    { label: 'LOCATION', value: 'BHOPAL, INDIA' },
    { label: 'EDUCATION', value: 'B.TECH CSE @ IIIT BHOPAL — 2027' },
    { label: 'STATUS', value: 'OPEN TO FULL-TIME & INTERNSHIPS' },
  ],
  links: {
    github: 'https://github.com/Aaryav1130',
    linkedin: 'https://www.linkedin.com/in/aaryav-chaudhary/',
    leetcode: 'https://leetcode.com/u/Aaron_1055/',
    email: 'aaryav1130@gmail.com',
    phone: '7817926035',
    resume: '/Chaudhary_Aaryav_AI.pdf',
  },
} as const

/** Scrolling marquee keywords */
export const marquee = [
  'LLMs', 'RAG', 'FEDERATED LEARNING', 'MULTI-AGENT SYSTEMS', 'DIFFERENTIAL PRIVACY',
  'VECTOR SEARCH', 'FINE-TUNING', 'TRANSFORMERS', 'NLP', 'MLOps',
]

/** Headline metrics — the strongest recruiter signal on the page */
export const metrics = [
  { value: '95%', label: 'of centralized accuracy', sub: 'under differential privacy' },
  { value: '90%+', label: 'answer faithfulness', sub: 'RAGAS evaluation' },
  { value: '<200ms', label: 'p99 latency', sub: 'at 1,000+ req/day' },
  { value: 'TOP 200', label: 'of 75,000+ teams', sub: 'Amazon ML Challenge' },
]

/* experience — CURRENTLY UNRENDERED (2026-08-24).
   Aaryav removed the WORK section because the TIMELINE already covers his one
   role. Kept as the source of record: timeline[0] now carries these four
   metrics in prose, and this is where to copy them from if a WORK section is
   ever restored. Nothing imports it, which is safe — noUnusedLocals flags
   unused imports and locals, not unused exports. */
export const experience = [
  {
    role: 'Research Intern — Federated Learning & RAG',
    org: 'University of Galway, Ireland',
    period: 'Sep 2025 – Mar 2026',
    mode: 'Remote',
    tags: ['PYTHON', 'FEDERATED LEARNING', 'DIFFERENTIAL PRIVACY', 'FAISS', 'BM25'],
    points: [
      'Engineered privacy-preserving Federated Learning for LLMs using differential privacy, reaching 95% of centralized accuracy with 30% stronger regulatory compliance across distributed nodes.',
      'Developed hybrid RAG pipelines (BM25 + dense embeddings) with FAISS vector indexing, improving retrieval efficiency by 40% and cutting inference latency by 25%.',
    ],
  },
]

export type Project = {
  slug: string
  name: string
  blurb: string
  year: string
  category: 'AI' | 'FULL STACK' | 'ML'
  role: string
  featured?: boolean
  /** shown as a pulsing pill on the featured card, e.g. 'IN PROGRESS' */
  status?: string
  /** ISO date the build started — drives the live BUILDING SINCE counter */
  since?: string
  metrics?: string[]
  points: string[]
  stack: string[]
  repo: string
  live?: string
  /** set true for entries you still need to verify/expand */
  draft?: boolean
}

export const projects: Project[] = [
  {
    slug: 'recruitment-agent',
    name: 'RecruitmentAgent',
    blurb: 'Multi-agent career platform with RAG resume parsing, ATS scoring, and a live AI-avatar interview agent.',
    year: '2026',
    category: 'AI',
    role: 'AI ENGINEER',
    metrics: ['3-TIER JOB PIPELINE', 'LIVE AVATAR INTERVIEW', 'LaTeX RESUME GEN'],
    points: [
      'Architected a multi-agent recruitment platform on LangChain + Groq LLaMA-3, combining RAG-based resume parsing, JD-vs-resume ATS scoring, and automated LaTeX resume generation with FAISS vector search.',
      'Designed a 3-tier job search pipeline (JobSpy, SerpAPI, fallback) across LinkedIn, Indeed and Glassdoor, plus a real-time AI-avatar interview agent powered by LiveKit and Groq STT/TTS.',
    ],
    stack: ['PYTHON', 'LANGCHAIN', 'GROQ', 'FAISS', 'LIVEKIT', 'STREAMLIT'],
    repo: 'https://github.com/Aaryav1130/RecruitmentAgent',
    live: 'https://recruitmentagent-ijspeikrzlsn8iw7mxug5s.streamlit.app/',
  },
  {
    slug: 'ai-data-analyst',
    name: 'AI Data Analyst',
    blurb: 'Conversational analytics platform - query CSV datasets in natural language through a 6-tool LLM router.',
    year: '2026',
    category: 'FULL STACK',
    role: 'FULL STACK AI ENGINEER',
    metrics: ['6-TOOL LLM ROUTER', 'SSE STREAMING'],
    points: [
      'Engineered a full-stack AI data analysis platform with FastAPI and React, letting users query CSV datasets in natural language through a 6-tool LLM router built on Google Gemini.',
      'Implemented automated chart generation, IQR/Z-score anomaly detection and SQL/Pandas code generation, streaming responses in real time via Server-Sent Events for fast multi-file exploration.',
    ],
    stack: ['PYTHON', 'FASTAPI', 'REACT', 'GEMINI', 'PLOTLY', 'PANDAS'],
    repo: 'https://github.com/Aaryav1130/AI-Data-Analyst',
  },
  {
    slug: 'healthgpt',
    name: 'HealthGPT',
    blurb: 'Medical QA system using LangGraph DAG orchestration with two-stage hybrid retrieval and cross-encoder reranking.',
    year: '2026',
    category: 'AI',
    role: 'AI ENGINEER',
    metrics: ['90%+ RAGAS FAITHFULNESS', '3-8 TOK/SEC ON CPU'],
    points: [
      'Built a medical QA system with LangGraph DAG orchestration, 2-stage hybrid retrieval (FAISS + BM25 with Reciprocal Rank Fusion) and cross-encoder reranking, achieving 90%+ answer faithfulness on RAGAS metrics.',
      'Deployed a containerized backend via Docker Compose with Prometheus monitoring, CI/CD through GitHub Actions, and Server-Sent Events streaming for real-time token delivery at 3-8 tokens/sec on CPU-only hardware.',
    ],
    stack: ['PYTHON', 'FASTAPI', 'LANGGRAPH', 'FAISS', 'LLAMA 3.2', 'DOCKER', 'PROMETHEUS'],
    repo: 'https://github.com/Aaryav1130/healthgpt',
    live: 'https://healthgpt-swart.vercel.app/',
  },
  {
    slug: 'yatra-vritta',
    name: 'Yatra-Vritta',
    blurb: 'AI travel recommendation engine with a KNN model serving 1,000+ concurrent requests at sub-200ms latency.',
    year: '2025',
    category: 'ML',
    role: 'ML ENGINEER',
    metrics: ['92% MATCH ACCURACY', '1,000+ REQ/DAY', '-45% PLANNING TIME'],
    points: [
      'Built an AI travel recommendation engine in Python with Scikit-learn, implementing a K-Nearest Neighbors model achieving 92% match accuracy, handling 1,000+ concurrent requests/day at sub-200ms latency on AWS.',
      'Orchestrated event-driven microservices with a Flask REST API and MongoDB, implementing HIPAA- and GDPR-compliant data handling and reducing trip-planning time by 45%.',
    ],
    stack: ['PYTHON', 'FLASK', 'SCIKIT-LEARN', 'NODE.JS', 'MONGODB', 'AWS'],
    repo: 'https://github.com/Aaryav1130/Yatra-Vritta',
    live: 'https://yatra-vritta-theta.vercel.app/',
  },
  {
    slug: 'tripnexa',
    name: 'TripNexa',
    blurb: 'Intelligent conversational travel assistant - smart destination suggestions and trip itinerary generation.',
    year: '2026',
    category: 'FULL STACK',
    role: 'FULL STACK AI DEVELOPER',
    metrics: ['SESSION-BASED CHAT', 'GEMINI AI INTEGRATION'],
    points: [
      'Architected a conversational travel planning agent using FastAPI, React, and Gemini AI, allowing users to discover destinations and construct full itineraries through natural language.',
      'Developed a robust session-based chat history system backed by PostgreSQL and Firebase Auth, maintaining context across multiple planning sessions for highly personalized recommendations.',
    ],
    stack: ['FASTAPI', 'REACT', 'GEMINI AI', 'POSTGRESQL', 'FIREBASE', 'TAILWIND'],
    repo: 'https://github.com/Aaryav1130/TripNexa',
  },
  {
    slug: 'rag-chatbot',
    name: 'RAG Chatbot',
    blurb: 'Conversation-aware RAG chatbot using llama.cpp and ChromaDB with incremental vector indexing and query rewriting.',
    year: '2025',
    category: 'AI',
    role: 'AI ENGINEER',
    metrics: ['INCREMENTAL INDEXING', 'QUERY REWRITING', 'HIERARCHICAL SUMMARIZATION'],
    points: [
      'Built a retrieval-augmented chatbot with llama.cpp (GGUF quantized models) and ChromaDB, implementing Sentence Transformer embeddings with incremental vector indexing — only changed documents are re-embedded, tracked via SQLite metadata and version hashes.',
      'Engineered a two-stage response pipeline with LLM-based query rewriting and hierarchical context summarization, maintaining full conversation history for multi-turn QA over a Markdown document corpus.',
    ],
    stack: ['PYTHON', 'LLAMA.CPP', 'CHROMADB', 'SENTENCE TRANSFORMERS', 'DOCKER', 'POETRY'],
    repo: 'https://github.com/Aaryav1130/rag-chatbot',
  },
  {
    slug: 'stream-it',
    name: 'Stream-It',
    blurb: 'Full-stack live streaming platform with RTMP ingest, real-time chat, and creator dashboards — a Twitch-style experience.',
    year: '2025',
    category: 'FULL STACK',
    role: 'FULL STACK DEVELOPER',
    metrics: ['RTMP LIVE INGEST', 'REAL-TIME CHAT', 'WEBHOOK-DRIVEN SYNC'],
    points: [
      'Developed a full-stack live streaming platform with Next.js 14 App Router and LiveKit for RTMP ingest and real-time media delivery, featuring creator dashboards for stream-key management, metadata editing, and live status toggling.',
      'Implemented Clerk-based authentication with webhook-driven user sync to PostgreSQL via Prisma, plus real-time chat with configurable slow mode, follow/block relationships, and community moderation tools.',
    ],
    stack: ['NEXT.JS', 'TYPESCRIPT', 'LIVEKIT', 'PRISMA', 'POSTGRESQL', 'CLERK', 'TAILWIND'],
    repo: 'https://github.com/Aaryav1130/stream-it',
    live: 'https://stream-it-1ps8.vercel.app/',
  },
]

// Four columns, not eight — the section renders as 4 vertically-scrolling
// tracks, so each column needs enough items to overflow its 225px viewport.
// Regrouped from the original 8 flat groups; every one of the 37 items is kept.
export const skills = [
  { group: 'AI / ML', items: ['LLMs', 'RAG', 'Transformers', 'NLP', 'Fine-tuning', 'Prompt Engineering', 'PyTorch', 'TensorFlow', 'Hugging Face', 'Scikit-learn'] },
  { group: 'LLM TOOLING', items: ['LangChain', 'LangGraph', 'FAISS', 'OpenAI', 'Groq', 'Google Gemini', 'Streamlit'] },
  { group: 'BACKEND & INFRA', items: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'Redis', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'AWS', 'CI/CD'] },
  { group: 'LANGUAGES & CS', items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'DSA (500+ solved)', 'OOP', 'DBMS', 'Operating Systems'] },
]

export const timeline = [
  {
    year: '2026',
    title: 'Research Intern — Federated Learning & RAG',
    org: 'University of Galway, Ireland',
    // Carries the four hard metrics that used to live in the WORK section's
    // experience card (removed 2026-08-24). The timeline is now the ONLY place
    // on the site where Aaryav's professional role and its numbers appear, so
    // this is deliberately the longest body in the timeline.
    body: 'Remote · Sep 2025 – Mar 2026. Privacy-preserving federated learning for LLMs with differential privacy — 95% of centralized accuracy with 30% stronger regulatory compliance. Hybrid BM25 + dense retrieval with FAISS indexing: 40% better retrieval efficiency, 25% lower inference latency.',
    tags: ['FEDERATED LEARNING', 'RAG', 'DIFFERENTIAL PRIVACY', 'FAISS', 'BM25'],
  },
  {
    year: '2026',
    title: 'Amazon ML Challenge — Top 200',
    org: 'Amazon',
    body: 'Ranked in the top 200 of 75,000+ teams in Amazon’s national machine learning competition.',
    tags: ['MACHINE LEARNING', 'COMPETITION'],
  },
  {
    year: '2025',
    title: 'Deep Learning & GenAI Specializations',
    org: 'DeepLearning.AI · Coursera',
    body: 'Machine Learning, Deep Learning, and Generative AI with LLMs under Andrew Ng.',
    tags: ['DEEP LEARNING', 'GENERATIVE AI'],
  },
  {
    year: '2023',
    title: 'B.Tech Computer Science & Engineering',
    org: 'IIIT Bhopal',
    body: 'Coursework in Machine Learning, Deep Learning, NLP, DSA, OOP, Operating Systems and DBMS. Graduating 2027.',
    tags: ['ML', 'NLP', 'DSA'],
  },
]

/** EXPLORE carousel — real stack, not generic logos */
export const stack = [
  { name: 'PyTorch', note: 'Model training & fine-tuning', icon: 'flame' },
  { name: 'LangChain', note: 'Agent & chain orchestration', icon: 'link' },
  { name: 'LangGraph', note: 'DAG-based agent graphs', icon: 'git' },
  { name: 'FAISS', note: 'Dense vector search at scale', icon: 'layers' },
  { name: 'FastAPI', note: 'Async inference APIs', icon: 'zap' },
  { name: 'Hugging Face', note: 'Model & dataset hub', icon: 'box' },
  { name: 'Docker', note: 'Reproducible deployments', icon: 'container' },
  { name: 'AWS', note: 'Cloud inference & hosting', icon: 'cloud' },
  { name: 'PostgreSQL', note: 'Relational storage', icon: 'database' },
  { name: 'MongoDB', note: 'Document storage', icon: 'database' },
  { name: 'Redis', note: 'Caching & queues', icon: 'bolt' },
  { name: 'Scikit-learn', note: 'Classical ML baselines', icon: 'chart' },
]
