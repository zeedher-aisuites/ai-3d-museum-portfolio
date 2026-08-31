import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../content/site'

export function LoadingScreen({ progress, visible }: { progress: number; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="loading-screen" exit={{ opacity: 0, transition: { duration: 0.55 } }}>
          <div>
            <p className="eyebrow">{site.descriptor} / 2026</p>
            <h1>{site.name}</h1>
            <div className="loading-line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
            <p className="loading-label">ASSEMBLING THE COLLECTION <b>{progress}%</b></p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
