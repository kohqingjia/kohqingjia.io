import { Link } from 'react-router';
import { site } from '../data/site';
import {
  alsoParticipated,
  awards,
  education,
  experience,
  skills,
} from '../data/career';
import { featuredProjects } from '../lib/projects';
import ProjectCard from '../components/ProjectCard';
import GithubActivity from '../components/GithubActivity';
import Career from '../components/Career';
import RoleLine from '../components/RoleLine';
import SkillIcon from '../components/SkillIcon';
import Sprite from '../components/Sprite';
import NameDeck from '../components/NameDeck';
import { useTitle } from '../lib/useTitle';
export default function Home() {
  useTitle(site.name);
  return (
    <>
      <section
        className="hero page-width"
        aria-labelledby="hero-title"
        data-hero
      >
        <div className="hero__copy">
          <h1 id="hero-title">{site.name}</h1>
          <RoleLine />
          <p className="hero__intro">{site.intro}</p>
          <p className="hero__context">
            {site.headline} <span aria-hidden="true">/</span> {site.location}
          </p>
          <p className="hero__actions">
            <a className="button button--primary" href="#projects">
              See my projects<span aria-hidden="true">↘</span>
            </a>
            <a className="button" href={site.links.resume}>
              Résumé
              <span className="eyebrow" aria-hidden="true">
                PDF
              </span>
              <span className="sr-only"> (PDF)</span>
            </a>
          </p>
        </div>
        <NameDeck />
      </section>
      <section
        id="about"
        className="home-section page-width"
        aria-labelledby="about-title"
      >
        <header className="section-heading">
          <h2 id="about-title">About</h2>
        </header>
        <div className="about-grid">
          <div className="portrait-card">
            {site.photo ? (
              <img
                src={site.photo.square.src}
                alt={site.photo.alt}
                width={site.photo.square.width}
                height={site.photo.square.height}
                loading="lazy"
              />
            ) : (
              <Sprite slug="qj-profile" file="qj.svg" size={256} />
            )}
            <p>
              {site.name}
              <span className="eyebrow">{site.location}</span>
            </p>
          </div>
          <div className="about-copy">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <dl className="fact-grid">
              {site.facts.map((f) => (
                <div key={f.label}>
                  <dt className="eyebrow">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <GithubActivity />
      </section>
      <section
        id="experience"
        className="home-section page-width"
        aria-labelledby="exp-title"
      >
        <header className="section-heading">
          <h2 id="exp-title">Experience and education</h2>
        </header>
        <Career experience={experience} education={education} />
      </section>
      <section
        id="projects"
        className="home-section page-width"
        aria-labelledby="projects-title"
        data-line
      >
        <header className="section-heading section-heading--split">
          <div>
            <h2 id="projects-title">Projects</h2>
          </div>
          <Link to="/projects" className="text-link">
            Every project<span aria-hidden="true">↗</span>
          </Link>
        </header>
        <ul className="project-grid">
          {featuredProjects.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} index={i} />
            </li>
          ))}
        </ul>
      </section>
      <section
        id="skills"
        className="home-section page-width"
        aria-labelledby="skills-title"
      >
        <header className="section-heading">
          <h2 id="skills-title">Skills and tools</h2>
        </header>
        <div className="skills-grid">
          {skills.map((g) => (
            <div className="skill-group" key={g.name}>
              <h3>{g.name}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s.name}>
                    <SkillIcon name={s.name} icon={s.icon} />
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section
        id="awards"
        className="home-section page-width"
        aria-labelledby="awards-title"
      >
        <header className="section-heading">
          <h2 id="awards-title">Hackathons and awards</h2>
        </header>
        <ul className="awards-grid">
          {awards.map((a) => (
            <li key={a.title}>
              <span className="award-year">{a.year}</span>
              <div>
                <h3>
                  {a.project ? (
                    <Link to={`/${a.project}`}>
                      {a.title}
                      <span aria-hidden="true"> ↗</span>
                    </Link>
                  ) : (
                    a.title
                  )}
                </h3>
                <p>{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="awards-notes">
          <span>Also participated in</span>
          {alsoParticipated.map((a) =>
            a.project ? (
              <Link key={a.title} to={`/${a.project}`}>
                {a.title}
              </Link>
            ) : (
              <span key={a.title}>{a.title}</span>
            ),
          )}
        </p>
      </section>
      <section
        id="contact"
        className="home-section page-width"
        aria-labelledby="contact-title"
      >
        <div className="contact-card">
          <h2 id="contact-title">Get in touch</h2>
          <p className="contact-intro">
            {site.openTo}. Based in {site.location}.
          </p>
          <ul className="contact-links">
            <li>
              <a href={`mailto:${site.links.email}`}>
                <span className="eyebrow">Email</span>
                <span>{site.links.email}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href={site.links.linkedin} rel="me">
                <span>LinkedIn</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href={site.links.github} rel="me">
                <span>GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a href={site.links.resume}>
                <span>Résumé (PDF)</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
