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
export default function SkillIcon({
  name,
  icon,
}: {
  name: string;
  icon?: string;
}) {
  return (
    <span className="skill-icon" aria-hidden="true">
      {icon && available.has(icon) ? (
        <img
          src={`/icons/${icon}.svg`}
          alt=""
          width="20"
          height="20"
          loading="lazy"
        />
      ) : (
        <span className="skill-monogram">
          {name.replace(/[^a-z]/gi, '').slice(0, 2)}
        </span>
      )}
    </span>
  );
}
