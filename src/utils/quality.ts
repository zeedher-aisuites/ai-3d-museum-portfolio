export type Quality = 'low' | 'medium' | 'high'

export const detectQuality = (): Quality => {
  const cores = navigator.hardwareConcurrency ?? 4
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  const smallScreen = window.matchMedia('(max-width: 700px)').matches

  if (smallScreen && (cores <= 4 || memory <= 4)) return 'low'
  if (cores >= 8 && memory >= 8 && !smallScreen) return 'high'
  return 'medium'
}

export const qualityDpr: Record<Quality, [number, number]> = {
  low: [1, 1.15],
  medium: [1, 1.5],
  high: [1, 2],
}
