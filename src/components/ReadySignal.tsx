import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

/** Prévient une fois que la scène a rendu ses premières images (modèle chargé, shaders compilés). */
export default function ReadySignal({ onReady }: { onReady?: () => void }) {
  const frames = useRef(0)
  useFrame(() => {
    frames.current += 1
    if (frames.current === 3) onReady?.()
  })
  return null
}
