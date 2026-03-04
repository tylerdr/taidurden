# taidurden.com — AI Ventures Portfolio

## What This Is
The public-facing portfolio site for Tai Durden's AI Ventures operation. A living dashboard that tells the story of an AI agent building a venture portfolio autonomously — from $0 to $1M ARR.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript strict
- Tailwind CSS
- Static export (`output: 'export'` in next.config)
- Deploy to Vercel (tai-durden-ai team)

## Design
- Dark, minimal, techy aesthetic — like a Bloomberg terminal meets a hacker's dashboard
- Monospace accents, terminal-green highlights, dark backgrounds
- Clean typography, lots of whitespace
- Mobile responsive
- Subtle animations (counter tickers, status pulse dots)

## Pages to Build

### / (Homepage)
- Hero: "Tai Durden — AI Venture Builder" with tagline "Building a $1M portfolio. Zero human code. Full autonomous AI."
- Live stats dashboard: total ventures, total pages, total revenue (placeholder $0 for now), days since launch
- Venture cards grid — each card links to venture detail
- "The Process" section — visual pipeline: Idea → Research → Build → Deploy → Optimize → Scale
- Newsletter signup CTA: "Follow the $0 → $1M journey"

### /ventures (Venture Directory)
- Card grid of all ventures with: name, domain, status badge, description, key metrics
- Filter by status: Live, Building, Planned

### /ventures/[slug] (Venture Detail)
- Individual page per venture with: full description, screenshots, metrics, tech stack, timeline
- Initial ventures:
  - peakedlabs (peakedlabs.com) — Biohacking telehealth directory
  - protocolrank (protocolrank.com) — Health protocol rankings

### /story (The Story)
- How Tai Durden works: AI agent architecture, sub-agent system, autonomous operation
- Timeline of milestones (hardcoded initially, will be dynamic later)
- Philosophy: "100% AI-built, AI-monitored, AI-optimized"

### /process (The Process)
- Visual breakdown of the venture creation pipeline
- Each phase explained with real examples from existing ventures
- Tools used: Next.js, Vercel, AI coding agents, SEO automation

### /newsletter
- Full-page newsletter signup
- "Weekly dispatch from an AI building a venture empire"
- Email capture form (can be a simple mailto or Buttondown/Substack embed for now)

## Footer (All Pages)
- "Tai Durden AI Ventures" branding
- Links to: Twitter @taidurden, GitHub, Newsletter
- "Part of the Tai Durden AI Ventures portfolio" — the shared branding line

## SEO
- JSON-LD Organization schema
- Unique meta titles and descriptions per page
- Open Graph images
- sitemap.xml
- robots.txt

## Content Tone
- Confident, slightly provocative, builder-energy
- Not corporate, not cringe — think indie hacker meets Bloomberg
- Data-driven: numbers, metrics, timelines
- Transparent: show the real numbers even when they're $0

## DO NOT
- Add authentication or user accounts
- Add a database — this is static
- Over-engineer — keep it simple, ship fast
- Use generic stock photos — use screenshots, terminal aesthetics, data viz
- Add unnecessary dependencies
