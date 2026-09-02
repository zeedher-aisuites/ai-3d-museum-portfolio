import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { generateFlyer, getDemoJob, hasDemoLabApi, type DemoCategory } from '../services/demoLabApi'

type DemoState = 'idle' | 'ready' | 'uploading' | 'generating' | 'success' | 'error'

const categories: DemoCategory[] = ['food', 'drink', 'ugc', 'item']
const progressCopy = ['Analyzing subject', 'Building composition', 'Art directing', 'Generating campaign visual']
const maxUploadSize = 10 * 1024 * 1024

export function DemoLab() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [category, setCategory] = useState<DemoCategory>('food')
  const [state, setState] = useState<DemoState>('idle')
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [backendNotice, setBackendNotice] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const requestActive = useRef(true)

  useEffect(() => () => {
    requestActive.current = false
  }, [])

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const acceptFile = (candidate?: File) => {
    if (!candidate) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(candidate.type)) {
      setState('error')
      setMessage('Use a JPEG, PNG or WebP image.')
      return
    }
    if (candidate.size > maxUploadSize) {
      setState('error')
      setMessage('Use an image smaller than 10 MB.')
      return
    }
    setFile(candidate)
    setResultUrl(null)
    setMessage('')
    setBackendNotice(false)
    setState('ready')
  }

  const onInput = (event: ChangeEvent<HTMLInputElement>) => acceptFile(event.target.files?.[0])
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    acceptFile(event.dataTransfer.files[0])
  }

  const removeFile = () => {
    setFile(null)
    setResultUrl(null)
    setMessage('')
    setBackendNotice(false)
    setState('idle')
    if (inputRef.current) inputRef.current.value = ''
  }

  const generate = async () => {
    if (!file) {
      setState('error')
      setMessage('Add a product image before generating.')
      return
    }
    if (!hasDemoLabApi) {
      setBackendNotice(true)
      return
    }
    try {
      setBackendNotice(false)
      setState('uploading')
      let response = await generateFlyer(file, category)
      if (response.status === 'success' && response.imageUrl) {
        setResultUrl(response.imageUrl)
        setState('success')
        return
      }
      const jobId = response.jobId
      if (!jobId) throw new Error('The generation backend did not return a job identifier.')
      setState('generating')
      for (let attempt = 0; attempt < 40; attempt += 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 1500))
        if (!requestActive.current) return
        response = await getDemoJob(jobId)
        if (response.status === 'success' && response.imageUrl) {
          setResultUrl(response.imageUrl)
          setState('success')
          return
        }
        if (response.status === 'error') throw new Error(response.message || 'The generation could not be completed.')
      }
      throw new Error('The generation is taking longer than expected. Please try again.')
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'The generation could not be completed.')
    }
  }

  const busy = state === 'uploading' || state === 'generating'
  const statusCopy = state === 'generating' ? progressCopy : state === 'uploading' ? ['Preparing image request'] : []

  return (
    <section className="demo-lab" aria-labelledby="demo-lab-title">
      <p className="eyebrow">AI Demo Lab</p>
      <h2 id="demo-lab-title">Upload a product.<br />Generate an ad.</h2>
      <p>Turn a product image into an advertising concept using an AI-first production workflow.</p>
      <div className="demo-category" role="radiogroup" aria-label="Content type">
        {categories.map((item) => <button key={item} role="radio" aria-checked={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} disabled={busy}>{item}</button>)}
      </div>
      {!previewUrl ? (
        <div className="demo-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={onDrop}>
          <input ref={inputRef} id="demo-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={onInput} />
          <label htmlFor="demo-image">Drop a JPEG, PNG or WebP here<br /><small>Up to 10 MB</small></label>
        </div>
      ) : (
        <div className="demo-preview">
          <img src={previewUrl} alt="Uploaded product preview" />
          <button onClick={removeFile} disabled={busy}>Replace or remove</button>
        </div>
      )}
      {resultUrl && <img className="demo-result" src={resultUrl} alt="Generated advertising concept" />}
      {statusCopy.length > 0 && <p className="demo-progress" aria-live="polite">{statusCopy.map((item) => <span key={item}>{item}</span>)}</p>}
      {backendNotice && <p className="demo-notice" aria-live="polite">Live generation backend not connected in this build.</p>}
      {state === 'error' && <p className="demo-error" role="alert">{message}</p>}
      <button className="demo-generate" onClick={generate} disabled={busy}>{busy ? 'Working…' : resultUrl ? 'Generate another variation' : 'Generate concept'}</button>
    </section>
  )
}
