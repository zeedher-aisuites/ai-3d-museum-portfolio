import { useState } from 'react'

export function PromptViewer({ prompt, compact = false }: { prompt: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className={`prompt-viewer${compact ? ' compact' : ''}`} aria-label="Prompt used for this synthetic study">
      <div><p className="eyebrow">Prompt / demo source</p><span>Visible synthetic prompt</span></div>
      <p>{prompt}</p>
      <button type="button" onClick={copyPrompt} aria-live="polite">{copied ? 'Copied' : 'Copy prompt'}</button>
    </section>
  )
}
