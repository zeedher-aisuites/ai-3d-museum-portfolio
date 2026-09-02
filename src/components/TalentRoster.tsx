import { talent } from '../content/talent'
import { assetUrl, type DigitalTalent } from '../content/types'

type TalentRosterProps = {
  onSelect: (item: DigitalTalent) => void
}

export function TalentRoster({ onSelect }: TalentRosterProps) {
  if (talent.length === 0) {
    return (
      <div className="content-empty-state">
        <p className="eyebrow">AI Talent / Casting roster</p>
        <strong>Original digital talent is being cast.</strong>
        <p>The studio-approved portrait roster will appear here with character direction, capabilities, voice availability and optional motion.</p>
      </div>
    )
  }

  return (
    <div className="talent-roster" aria-label="AI talent roster">
      {talent.map((item) => (
        <button key={item.id} className="talent-card" onClick={() => onSelect(item)} aria-label={`Open digital talent: ${item.name}`}>
          <img src={assetUrl(item.hero)} alt={item.name} loading="lazy" />
          <span className="talent-card-copy"><b>{item.name}</b><i>{item.capabilities.slice(0, 4).join(' · ')}</i></span>
        </button>
      ))}
    </div>
  )
}
