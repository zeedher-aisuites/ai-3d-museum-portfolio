import { recruiterPortfolio, type RecruiterProjectType } from '../content/recruiter'
import '../styles/recruiter.css'

const projectTypeLabels: Record<RecruiterProjectType, string> = {
  'personal-project': 'Personal project',
  'spec-concept': 'Spec concept',
  'technical-poc': 'Technical POC',
  'client-work': 'Client work',
}

export function RecruiterEntry() {
  const { profile, caseStudies, process, technicalEdge, about } = recruiterPortfolio
  const publishedCaseStudies = caseStudies.filter((study) => study.status === 'published')

  return (
    <div className="recruiter-entry" id="top">
      <a className="recruiter-skip" href="#main">Skip to content</a>

      <header className="recruiter-header">
        <a className="recruiter-brand" href="#top" aria-label={`${profile.name} — home`}>
          {profile.logo && (
            <img
              src={profile.logo.src}
              alt={profile.logo.alt}
              width="52"
              height="52"
            />
          )}
          <span>{profile.name}</span>
        </a>

        <nav className="recruiter-nav" aria-label="Portfolio navigation">
          {publishedCaseStudies.length > 0 && <a href="#work">Work</a>}
          <a href="#process">Process</a>
          <a href="#technical-edge">Technical edge</a>
          <a href="#about">About</a>
          <a href={profile.museumEntryRoute}>ATELIER 3D</a>
        </nav>
      </header>

      <main id="main">
        <section className="recruiter-hero" aria-labelledby="recruiter-name">
          <div className="recruiter-hero-copy">
            <p className="recruiter-eyebrow">{profile.headline}</p>
            <h1 id="recruiter-name">{profile.name}</h1>
            <p className="recruiter-supporting-line">{profile.supportingLine}</p>
            <p className="recruiter-summary">{profile.summary}</p>

            <dl className="recruiter-details">
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{profile.availability}</dd>
              </div>
            </dl>

            <div className="recruiter-actions">
              <a className="recruiter-action recruiter-action-primary" href={`mailto:${profile.email}`}>
                Get in touch
              </a>
              <a
                className="recruiter-action"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a
                className="recruiter-action"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {profile.logo && (
            <div className="recruiter-hero-mark" aria-hidden="true">
              <img src={profile.logo.src} alt="" width="260" height="260" />
            </div>
          )}
        </section>

        {publishedCaseStudies.length > 0 && (
          <section className="recruiter-section recruiter-work" id="work">
            <div className="recruiter-section-heading">
              <p className="recruiter-eyebrow">Selected work</p>
              <h2>Evidence, not volume.</h2>
            </div>

            <div className="recruiter-work-grid">
              {publishedCaseStudies.map((study) => (
                <article className="recruiter-work-card" key={study.id}>
                  <img
                    src={study.cover.src}
                    alt={study.cover.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="recruiter-work-copy">
                    <div className="recruiter-work-meta">
                      {study.projectType && <span>{projectTypeLabels[study.projectType]}</span>}
                      {study.year && <span>{study.year}</span>}
                    </div>
                    <h3>{study.title}</h3>
                    <p>{study.summary}</p>
                    {study.externalUrl && (
                      <a href={study.externalUrl} target="_blank" rel="noreferrer">
                        View project <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="recruiter-section" id="process">
          <div className="recruiter-section-heading">
            <p className="recruiter-eyebrow">How I work</p>
            <h2>Generation starts after the decisions.</h2>
            <p>
              I use AI throughout concept development and production, but the process is structured
              around intention, previs, context, shot design, and iteration.
            </p>
          </div>

          <ol className="recruiter-process">
            {process.map((item) => (
              <li key={item.step}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="recruiter-section recruiter-technical" id="technical-edge">
          <div className="recruiter-section-heading">
            <p className="recruiter-eyebrow">Technical edge</p>
            <h2>Creative AI, backed by applied AI.</h2>
          </div>

          <div className="recruiter-technical-grid">
            {technicalEdge.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="recruiter-section recruiter-about" id="about">
          <div>
            <p className="recruiter-eyebrow">{about.eyebrow}</p>
            <h2>{about.title}</h2>
          </div>
          <div className="recruiter-about-copy">
            {about.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <aside className="recruiter-atelier" aria-labelledby="atelier-heading">
          <p className="recruiter-eyebrow">ATELIER</p>
          <h2 id="atelier-heading">Immersive 3D Portfolio</h2>
          <p>
            An independent creative practice and experimental space for generative media,
            visual systems, and AI production studies.
          </p>
          <a href={profile.museumEntryRoute}>{profile.museumEntryLabel} →</a>
        </aside>
      </main>

      <footer className="recruiter-footer">
        <span>{profile.name}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </div>
  )
}
