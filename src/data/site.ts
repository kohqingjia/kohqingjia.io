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
    linkedin: '', // TODO(QJ): paste LinkedIn URL
    email: '', // TODO(QJ): which address may be public?
    resume: '', // TODO(QJ): /resume.pdf once QJ approves a public copy
  },
} as const;

export const statusLabel = {
  building: 'Building now',
  shipped: 'Shipped',
  archived: 'Archived',
} as const;
