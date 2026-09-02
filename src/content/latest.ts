import { showroom } from './showroom'
import { tutorials } from './tutorials'
import { videos } from './videos'
import type { RoomId, Selection } from './types'

export type LatestHighlight = {
  id: string
  label: string
  room: RoomId
  selection: Selection
}

const labelFor = (type: 'film' | 'story' | 'experiment') => ({
  film: 'Latest Film',
  story: 'Latest Micro Story',
  experiment: 'Latest Experiment',
}[type])

export const latestHighlights: LatestHighlight[] = [
  ...showroom.filter((item) => item.latest && item.latestType).map((item) => ({ id: item.id, label: labelFor(item.latestType!), room: 'showroom' as const, selection: { type: 'showroom' as const, item } })),
  ...videos.filter((item) => item.latest && item.latestType).map((item) => ({ id: item.id, label: labelFor(item.latestType!), room: 'films' as const, selection: { type: 'video' as const, item } })),
  ...tutorials.filter((item) => item.latest && item.latestType).map((item) => ({ id: item.id, label: labelFor(item.latestType!), room: 'lab' as const, selection: { type: 'resource' as const, item } })),
].sort((left, right) => left.label.localeCompare(right.label))
