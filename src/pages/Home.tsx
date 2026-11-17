// OWNER: Codex (visual). Claude's skeleton: section order + real content. Section ids
// (#about, #experience, #projects, #skills, #awards, #contact) are nav targets — keep them.
import { useState } from 'react';
import { Link } from 'react-router';
import { site } from '../data/site';
import { awards, education, experience, skills } from '../data/career';
import { featuredProjects, period } from '../lib/projects';
import ProjectCard from '../components/ProjectCard';
import GithubActivity from '../components/GithubActivity';
import { useTitle } from '../lib/useTitle';

const wrap = 'mx-auto w-[min(100%-2rem,72rem)]';
const sectionHead = 'mb-8 flex flex-col gap-2';
const eyebrow = 'font-mono text-xs uppercase tracking-[0.2em] text-slate-500';

export default function Home() {
  useTitle(site.name);
  const [tab, setTab] = useState<'experience' | 'education'>('experience');
  return (
    <>
      <section className={`${wrap} flex min-h-[80svh] flex-col items-center justify-center gap-6 py-24 text-center`} aria-labelledby="hero-title">
        <p className={eyebrow}>{site.headline}</p>
        <h1 id="hero-title" className="text-5xl font-medium tracking-tight sm:text-7xl">{site.name}</h1>
        <p className="font-mono text-lg text-accent">
          {site.roles.join(' · ')}
        </p>
        <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">{site.intro}</p>
        <p className="flex flex-wrap justify-center gap-3">
          <a href="#projects" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-strong">See my projects</a>
          <a href={site.links.resume} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium dark:border-slate-700">Download résumé</a>
        </p>
      </section>

      <section id="about" className={`${wrap} scroll-mt-24 py-16`} aria-labelledby="about-title">
        <div className={sectionHead}><p className={eyebrow}>About</p><h2 id="about-title" className="text-3xl font-medium">About me</h2></div>
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 text-slate-600 dark:text-slate-300">{site.about.map((p) => <p key={p}>{p}</p>)}</div>
          <dl className="grid grid-cols-2 gap-4">
            {site.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <dt className={eyebrow}>{f.label}</dt><dd className="mt-1 text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8"><GithubActivity /></div>
      </section>

      <section id="experience" className={`${wrap} scroll-mt-24 py-16`} aria-labelledby="exp-title">
        <div className={sectionHead}><p className={eyebrow}>Journey</p><h2 id="exp-title" className="text-3xl font-medium">Experience and education</h2></div>
        <div role="tablist" aria-label="Journey" className="mb-6 inline-flex rounded-full border border-slate-200 p-1 text-sm dark:border-slate-800">
          {(['experience', 'education'] as const).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} aria-controls={`panel-${t}`} id={`tab-${t}`} onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 capitalize ${tab === t ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-300'}`}>
              {t}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          <ol className="space-y-4">
            {tab === 'experience'
              ? experience.map((r) => (
                  <li key={r.org + r.title} className="grid gap-2 rounded-2xl border border-slate-200 p-5 sm:grid-cols-[12rem_1fr] dark:border-slate-800">
                    <div className="font-mono text-xs text-slate-500"><p>{period(r.start, r.end)}</p><p>{r.location}</p></div>
                    <div>
                      <h3 className="font-medium">{r.title} · {r.project ? <Link to={`/${r.project}`} className="text-accent">{r.org}</Link> : r.org}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
                    </div>
                  </li>
                ))
              : education.map((e) => (
                  <li key={e.school} className="grid gap-2 rounded-2xl border border-slate-200 p-5 sm:grid-cols-[12rem_1fr] dark:border-slate-800">
                    <div className="font-mono text-xs text-slate-500"><p>{period(e.start, e.end)}</p><p>{e.location}</p></div>
                    <div>
                      <h3 className="font-medium">{e.degree} · {e.school}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                    </div>
                  </li>
                ))}
          </ol>
        </div>
      </section>

      <section id="projects" className={`${wrap} scroll-mt-24 py-16`} aria-labelledby="projects-title">
        <div className={`${sectionHead} sm:flex-row sm:items-end sm:justify-between`}>
          <div><p className={eyebrow}>Work</p><h2 id="projects-title" className="text-3xl font-medium">Projects</h2></div>
          <Link to="/projects" className="text-sm text-accent">All {''}projects →</Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => <li key={p.slug} className="relative"><ProjectCard project={p} /></li>)}
        </ul>
      </section>

      <section id="skills" className={`${wrap} scroll-mt-24 py-16`} aria-labelledby="skills-title">
        <div className={sectionHead}><p className={eyebrow}>Stack</p><h2 id="skills-title" className="text-3xl font-medium">Skills and tools</h2></div>
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((g) => (
            <div key={g.name} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <h3 className="mb-3 font-medium">{g.name}</h3>
              <ul className="flex flex-wrap gap-2 text-sm">{g.items.map((s) => <li key={s.name} className="rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-800">{s.name}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="awards" className={`${wrap} scroll-mt-24 py-16`} aria-labelledby="awards-title">
        <div className={sectionHead}><p className={eyebrow}>Recognition</p><h2 id="awards-title" className="text-3xl font-medium">Hackathons and awards</h2></div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {awards.map((a) => (
            <li key={a.title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <p className="font-mono text-xs text-slate-500">{a.year}</p>
              <h3 className="font-medium">{a.project ? <Link to={`/${a.project}`} className="hover:text-accent">{a.title}</Link> : a.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{a.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className={`${wrap} scroll-mt-24 py-16`} aria-labelledby="contact-title">
        <div className="rounded-3xl border border-slate-200 p-8 dark:border-slate-800">
          <p className={eyebrow}>Contact</p>
          <h2 id="contact-title" className="mt-2 text-3xl font-medium">Let's build something useful</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{site.openTo}. Based in {site.location}.</p>
          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <li><a className="block rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800" href={`mailto:${site.links.email}`}>Email</a></li>
            <li><a className="block rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800" href={site.links.linkedin} rel="me">LinkedIn</a></li>
            <li><a className="block rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800" href={site.links.github} rel="me">GitHub</a></li>
            <li><a className="block rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800" href={site.links.resume}>Résumé (PDF)</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
