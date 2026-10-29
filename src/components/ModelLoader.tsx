import { useEffect, useState } from 'react'

/**
 * Indicateur de chargement posé sur une zone 3D.
 * Il n'apparaît qu'au bout d'un court délai : si le modèle est déjà en cache, rien ne clignote.
 */
export default function ModelLoader({ show, compact = false }: { show: boolean; compact?: boolean }) {
  const [late, setLate] = useState(false)
  useEffect(() => {
    if (!show) return
    const id = window.setTimeout(() => setLate(true), 250)
    return () => window.clearTimeout(id)
  }, [show])
  const visible = show && late
  return (
    <div
      role="status"
      aria-hidden={!visible}
      className={`pointer-events-none absolute z-10 flex flex-col items-center gap-3 transition-opacity duration-300 ${
        'inset-0 justify-center'
      } ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <span className={`relative h-0.5 overflow-hidden rounded-full bg-line ${compact ? 'w-16' : 'w-32'}`}>
        <span className="absolute inset-y-0 left-0 w-1/3 animate-[model-loader_1.1s_ease-in-out_infinite] rounded-full bg-accent motion-reduce:animate-none" />
      </span>
      {!compact && <span className="font-mono text-xs text-muted">Chargement du modèle…</span>}
      {compact && <span className="sr-only">Chargement du modèle…</span>}
    </div>
  )
}
