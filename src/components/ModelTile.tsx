import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { Model3D } from '../content'
import { asset } from '../lib/asset'

const SpinningModel = lazy(() => import('./SpinningModel'))

/**
 * Aperçu carré d'un modèle : la miniature s'affiche tout de suite,
 * puis le modèle 3D prend le relais et tourne sur lui-même tant que la carte est visible.
 * Hors de l'écran, le canvas est démonté pour ne pas garder de contexte WebGL ouvert.
 */
export default function ModelTile({ model }: { model: Model3D }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  const [reduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative aspect-square w-full overflow-hidden bg-[#1c1b1a]">
      {model.thumb && (
        <img
          src={asset(model.thumb)}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready && visible ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
      {visible && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <SpinningModel file={model.file} speed={reduced ? 0 : 0.6} onReady={onReady} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
