export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'

export interface Job {
  id: string
  refCode: string
  title: string
  company: string
  location: string
  remote: boolean
  category: string
  type: JobType
  salary: string
  posted: string // ISO date
  pinned: boolean
  description: string
  responsibilities: string[]
  requirements: string[]
}

export const CATEGORIES = [
  'Engineering',
  'Design',
  'Product',
  'Operations',
  'Marketing',
] as const

export const JOBS: Job[] = [
  {
    id: '1',
    refCode: 'REF-014',
    title: 'Senior Frontend Engineer',
    company: 'Northgate Analytics',
    location: 'Austin, TX',
    remote: true,
    category: 'Engineering',
    type: 'Full-time',
    salary: '$140k – $175k',
    posted: '2026-08-20',
    pinned: true,
    description:
      'Own the component architecture for our data-visualization product used by trading desks across three continents. You will work closely with design and the platform team to keep the app fast under real market load.',
    responsibilities: [
      'Lead frontend architecture decisions for the core dashboard',
      'Mentor two mid-level engineers',
      'Partner with design on a shared component library',
      'Profile and cut render time on data-heavy views',
    ],
    requirements: [
      '5+ years building production React applications',
      'Strong TypeScript and state-management fundamentals',
      'Experience with high-frequency data rendering (charts, tables, grids)',
      'Comfortable owning a codebase end to end',
    ],
  },
  {
    id: '2',
    refCode: 'REF-021',
    title: 'Product Designer',
    company: 'Northgate Analytics',
    location: 'Remote',
    remote: true,
    category: 'Design',
    type: 'Full-time',
    salary: '$110k – $135k',
    posted: '2026-08-22',
    pinned: false,
    description:
      'Shape the workflows analysts use every day. You will run research sessions with real traders, translate messy problems into calm interfaces, and pair closely with engineering to ship.',
    responsibilities: [
      'Run discovery interviews with power users',
      'Design end-to-end flows from sketch to shipped UI',
      'Maintain and extend the design system',
      'Review implementation for fidelity to spec',
    ],
    requirements: [
      '4+ years of product design in a B2B or fintech context',
      'A portfolio showing complex-workflow simplification',
      'Fluent in Figma and basic prototyping',
      'Able to defend decisions with research, not opinion',
    ],
  },
  {
    id: '3',
    refCode: 'REF-033',
    title: 'Backend Engineer, Payments',
    company: 'Fenwick & Loom',
    location: 'New York, NY',
    remote: false,
    category: 'Engineering',
    type: 'Full-time',
    salary: '$150k – $190k',
    posted: '2026-08-15',
    pinned: true,
    description:
      'Build and harden the ledger services that move money for our merchant customers. Correctness and auditability matter more than speed of shipping here.',
    responsibilities: [
      'Design idempotent, auditable payment pipelines',
      'Write and review service-level SLAs',
      'Partner with compliance on reporting requirements',
      'On-call rotation for payment infrastructure',
    ],
    requirements: [
      '5+ years backend engineering, ideally in payments or banking',
      'Deep understanding of distributed transactions',
      'Experience with Postgres at scale',
      'Comfortable working under audit-level scrutiny',
    ],
  },
  {
    id: '4',
    refCode: 'REF-040',
    title: 'Growth Marketing Lead',
    company: 'Ferrous Studio',
    location: 'Remote',
    remote: true,
    category: 'Marketing',
    type: 'Contract',
    salary: '$90/hr',
    posted: '2026-08-24',
    pinned: false,
    description:
      'Take ownership of paid and lifecycle channels for a six-month engagement while we search for a permanent hire. You will report directly to the founder.',
    responsibilities: [
      'Run and optimize paid acquisition across two channels',
      'Build lifecycle email flows for onboarding and retention',
      'Set up attribution and weekly reporting',
      'Hand off a documented playbook at contract end',
    ],
    requirements: [
      '3+ years running paid channels with a real budget',
      'Comfortable with SQL for your own reporting',
      'Startup experience preferred',
      'Available 25–30 hrs/week',
    ],
  },
  {
    id: '5',
    refCode: 'REF-052',
    title: 'Operations Coordinator',
    company: 'Fenwick & Loom',
    location: 'New York, NY',
    remote: false,
    category: 'Operations',
    type: 'Full-time',
    salary: '$65k – $78k',
    posted: '2026-08-10',
    pinned: false,
    description:
      'Keep the trains running: vendor contracts, office logistics, onboarding logistics, and the dozens of small systems that let everyone else focus on their work.',
    responsibilities: [
      'Own vendor relationships and renewals',
      'Coordinate new-hire onboarding logistics',
      'Maintain internal operations documentation',
      'Support finance with expense tracking',
    ],
    requirements: [
      '2+ years in an operations or executive-support role',
      'Excellent written communication',
      'Comfortable juggling many small threads at once',
      'Based in or willing to relocate to NYC',
    ],
  },
  {
    id: '6',
    refCode: 'REF-061',
    title: 'Product Manager, Platform',
    company: 'Ferrous Studio',
    location: 'Chicago, IL',
    remote: true,
    category: 'Product',
    type: 'Full-time',
    salary: '$130k – $160k',
    posted: '2026-08-18',
    pinned: false,
    description:
      'Own the internal platform team roadmap: developer tooling, deploy infrastructure, and the shared services other product teams build on top of.',
    responsibilities: [
      'Set quarterly roadmap with the platform engineering team',
      'Interview internal teams to surface platform gaps',
      'Write specs that engineers actually enjoy reading',
      'Track and report on developer-experience metrics',
    ],
    requirements: [
      '4+ years product management, ideally on a platform or infra team',
      'Technical enough to review a design doc unassisted',
      'A track record of saying no to protect focus',
      'Based in Chicago or able to work Central hours',
    ],
  },
  {
    id: '7',
    refCode: 'REF-070',
    title: 'Freelance Illustrator',
    company: 'Ferrous Studio',
    location: 'Remote',
    remote: true,
    category: 'Design',
    type: 'Freelance',
    salary: '$400 – $900 per piece',
    posted: '2026-08-25',
    pinned: false,
    description:
      'We need a recurring illustrator for editorial pieces on our blog and quarterly report. Ongoing, project-by-project basis with no minimum commitment.',
    responsibilities: [
      'Deliver 2–4 illustrations per month on a rolling basis',
      'Work from loose creative briefs',
      'Turn around drafts within a week',
      'Maintain a consistent visual voice across pieces',
    ],
    requirements: [
      'A portfolio of editorial or conceptual illustration work',
      'Comfortable with brief, async feedback cycles',
      'Available for occasional rush requests',
    ],
  },
]
