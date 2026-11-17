// OWNER: Claude. Site-wide facts (from QJ's Nov 2026 résumé). Empty values are not rendered.
import portrait from '../assets/me/portrait.webp';
import square from '../assets/me/square.webp';
export const site = {
  name: 'Koh Qing Jia',
  short: 'QJ',
  url: 'https://kohqingjia.io',
  headline: 'Information Systems student at SMU',
  /** Rotating role line for the hero (QJ's target roles). */
  roles: ['AI engineer', 'product builder', 'data analyst'],
  intro:
    'I build AI agents, data products and the software around them, and I ship them to real users.',
  about: [
    "I'm an Information Systems student at Singapore Management University. I like building things people actually use, and lately that means AI agents with guardrails around them.",
    'I relaunched treatsure.co in 9 weeks as the human lead of a Claude Code agent workflow. At Promyro I built an energy management system from the ground up in 12 weeks. At SMU I lead the development of ClassPart AI, a multi-agent assessment system.',
  ],
  facts: [
    { label: 'Studying', value: 'BSc Information Systems, SMU' },
    { label: 'Focus', value: 'Agentic AI · Full stack · Data' },
    { label: 'Languages', value: 'English · Mandarin Chinese' },
    { label: 'Open to', value: 'Product, data and AI engineering roles' },
  ],
  location: 'Singapore',
  openTo: 'Open to product, data and AI engineering roles',
  /** QJ's photo (metadata stripped). portrait = 4:5 with the mountain view; square = upper body, for avatars. */
  photo: {
    portrait: { src: portrait, width: 960, height: 1200 },
    square: { src: square, width: 640, height: 640 },
    alt: 'Koh Qing Jia smiling on a stone terrace above green mountains and rice terraces',
  },
  links: {
    github: 'https://github.com/kohqingjia',
    githubHandle: 'kohqingjia',
    linkedin: 'https://www.linkedin.com/in/kohqingjia/',
    email: 'qingjia.koh.2024@computing.smu.edu.sg',
    /** Stable short link; Caddy redirects /cv to the PDF in /public. */
    resume: '/cv',
    resumeFile: '/KohQingJia_Resume.pdf',
  },
} as const;

export const statusLabel = {
  building: 'Building now',
  shipped: 'Shipped',
  archived: 'Archived',
} as const;
