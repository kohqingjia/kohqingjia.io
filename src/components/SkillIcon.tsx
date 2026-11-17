// Official Simple Icons, self-hosted individually; no icon-library runtime.
const available = new Set([
  'claude',
  'openrouter',
  'python',
  'typescript',
  'javascript',
  'php',
  'html5',
  'css',
  'nextdotjs',
  'react',
  'payloadcms',
  'fastapi',
  'streamlit',
  'vuedotjs',
  'tailwindcss',
  'bootstrap',
  'postgresql',
  'supabase',
  'mysql',
  'docker',
  'githubactions',
  'vercel',
  'apachesuperset',
  'github',
  'linear',
  'figma',
]);
/** Real brand logo only. Skills without one render as plain text (no fake monograms). */
export default function SkillIcon({ icon }: { name?: string; icon?: string }) {
  if (!icon || !available.has(icon)) return null;
  return (
    <span className="skill-icon" aria-hidden="true">
      <img src={`/icons/${icon}.svg`} alt="" width="20" height="20" loading="lazy" />
    </span>
  );
}
