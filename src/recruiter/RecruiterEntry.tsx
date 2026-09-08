import { recruiterProfile } from '../content/recruiter'
import '../styles/recruiter.css'

export function RecruiterEntry() {
  return (
    <div className="recruiter-entry">
      <header className="recruiter-header">
        <p>Independent Creative Practice</p>
      </header>
      <main className="recruiter-main">
        <p className="recruiter-kicker">{recruiterProfile.headline}</p>
        <h1>{recruiterProfile.name}</h1>
        <p className="recruiter-supporting-line">{recruiterProfile.supportingLine}</p>
        <p className="recruiter-summary">{recruiterProfile.summary}</p>
        <dl className="recruiter-details">
          <div><dt>Based in</dt><dd>{recruiterProfile.location}</dd></div>
          <div><dt>Availability</dt><dd>{recruiterProfile.availability}</dd></div>
        </dl>
        <nav className="recruiter-links" aria-label="Professional links">
          <a href={`mailto:${recruiterProfile.email}`}>Email</a>
          <a href={recruiterProfile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={recruiterProfile.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in a new tab)">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <a className="recruiter-atelier-link" href={recruiterProfile.museumEntryRoute}>{recruiterProfile.museumEntryLabel}</a>
      </main>
    </div>
  )
}
