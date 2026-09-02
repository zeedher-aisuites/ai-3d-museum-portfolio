export type DemoCategory = 'food' | 'drink' | 'ugc' | 'item'

export type DemoJobResponse = {
  status: 'success' | 'queued' | 'processing' | 'error'
  imageUrl?: string
  jobId?: string
  message?: string
}

const demoApiUrl = import.meta.env.VITE_DEMO_API_URL?.replace(/\/$/, '')

export const hasDemoLabApi = Boolean(demoApiUrl)

const request = async (path: string, options?: RequestInit) => {
  if (!demoApiUrl) throw new Error('Live generation backend not connected in this build.')
  const response = await fetch(`${demoApiUrl}${path}`, options)
  const payload = await response.json() as DemoJobResponse
  if (!response.ok || payload.status === 'error') throw new Error(payload.message || 'The generation request could not be completed.')
  return payload
}

export const generateFlyer = (image: File, category: DemoCategory) => {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('category', category)
  return request('/generate-flyer', { method: 'POST', body: formData })
}

export const getDemoJob = (jobId: string) => request(`/jobs/${encodeURIComponent(jobId)}`)
