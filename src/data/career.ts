// OWNER: Claude. Experience, education, skills, awards — all from QJ's Nov 2026 résumé.
import type { Activity, Award, Education, Role, SkillGroup } from './types';

export const experience: Role[] = [
  {
    org: 'treatsure',
    title: 'Agentic AI Solutions Engineering Intern',
    location: 'Singapore',
    start: '2026-08',
    end: '2026-10',
    project: 'treatsure',
    href: 'https://treatsure.co',
    points: [
      'Relaunched treatsure.co in 9 weeks as the human lead of an AI coding-agent workflow (Claude Code)',
      'Built a Payload CMS so the owner updates the site without a developer, cutting average update time by 80%',
      'Built a sales and user analytics dashboard that turns hours of monthly Excel work into minutes',
      'Ran parallel QA agents, independent agent code review and a 3-agent translation pipeline, with guardrails',
    ],
  },
  {
    org: 'Promyro',
    title: 'AI & Agentic Developer (Intern, then Freelance)',
    location: 'Ho Chi Minh City / Remote',
    start: '2026-05',
    end: '2026-09',
    project: 'promyro',
    points: [
      'Built an AI-powered energy management system from the ground up in 12 weeks, now preparing pilots with 2 customers',
      'Full stack in Python, FastAPI, PostgreSQL and Next.js: live energy-flow maps, cost, CO2 and peak-demand dashboards',
      'Built "Ask AI", a read-only tool-calling agent over live energy data and a weather API',
      'Built a Raspberry Pi edge agent reading EV chargers and inverters over Modbus TCP',
    ],
  },
  {
    org: 'Singapore Management University',
    title: 'Teaching Assistant',
    location: 'Singapore',
    start: '2025-08',
    end: '2026-03',
    points: ['Supported a 40+ student class: attendance, engagement tracking, feedback to the professor and course admin'],
  },
];

export const education: Education[] = [
  {
    school: 'Singapore Management University',
    degree: 'Bachelor of Science (Information Systems)',
    location: 'Singapore',
    start: '2024-08',
    points: [
      'Coursework: Generative AI with LLMs, AI Fundamentals, Analytics Foundation, Modelling and Data Analytics, Data Management, Software Project Management',
      'Hack For Cities 2026 Finalist, Most Innovative Solution',
      'Excel Master Challenge 2026 Finalist',
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    name: 'Agentic AI',
    items: [
      { name: 'Claude Code', icon: 'claude' },
      { name: 'Codex', icon: 'openai' },
      { name: 'OpenRouter', icon: 'openrouter' },
      { name: 'Multi-agent workflows' },
      { name: 'Tool-calling agents' },
      { name: 'Agentic RAG' },
    ],
  },
  {
    name: 'Languages',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'SQL' },
      { name: 'PHP', icon: 'php' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
    ],
  },
  {
    name: 'Frameworks',
    items: [
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'React', icon: 'react' },
      { name: 'Payload CMS', icon: 'payloadcms' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Streamlit', icon: 'streamlit' },
      { name: 'Vue.js', icon: 'vuedotjs' },
      { name: 'Tailwind', icon: 'tailwindcss' },
      { name: 'Bootstrap', icon: 'bootstrap' },
    ],
  },
  {
    name: 'Data & cloud',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Docker', icon: 'docker' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Azure' },
      { name: 'Superset', icon: 'apachesuperset' },
      { name: 'Tableau' },
      { name: 'Excel' },
    ],
  },
  {
    name: 'Tools',
    items: [
      { name: 'GitHub', icon: 'github' },
      { name: 'Linear', icon: 'linear' },
      { name: 'Figma', icon: 'figma' },
      { name: 'VS Code' },
    ],
  },
];

export const awards: Award[] = [
  { title: 'Hack For Cities 2026', detail: 'Finalist, Most Innovative Solution', year: '2026', project: 'metromind' },
  { title: 'Excel Master Challenge 2026', detail: 'Finalist', year: '2026' },
];

/** Hackathons QJ took part in without placing. Render as one quiet line, not as award cards. */
export const alsoParticipated: { title: string; year: string; project?: string }[] = [
  { title: 'Hackomania 2026', year: '2026', project: 'blockbattles' },
  { title: 'SBS Transit Hackathon 2025', year: '2025' },
];

export const activities: Activity[] = [
  {
    org: 'SMU Caretalyst YOLO',
    role: 'Facilitator (2025), Member (2024)',
    start: '2024-08',
    end: '2025-11',
    detail: 'Returned as a facilitator, guiding underprivileged children through a 6-week outdoor learning project',
  },
];
