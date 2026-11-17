// OWNER: Claude. Site-wide facts. Fields marked TODO(QJ) are left empty on purpose
// until QJ confirms them — empty values are simply not rendered.
export const site = {
  name: 'Koh Qing Jia',
  short: 'QJ',
  domain: 'kohqingjia.io',
  url: 'https://kohqingjia.io',
  role: 'Information Systems student at SMU',
  intro:
    'I build AI agents, data products and the software around them, and I ship them to real users.',
  location: 'Singapore',
  links: {
    github: 'https://github.com/kohqingjia',
    linkedin: 'https://www.linkedin.com/in/kohqingjia/',
    email: '', // TODO(QJ): which address may be public?
    /** Stable short link; redirects to the PDF in /public (see astro.config.mjs). */
    resume: '/cv',
  },
} as const;

export const statusLabel = {
  building: 'Building now',
  shipped: 'Shipped',
  archived: 'Archived',
} as const;
