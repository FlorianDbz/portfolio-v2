import { Bounds, Center, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import type { Group } from 'three'
import { asset } from '../lib/asset'

/** Éclairage commun aux miniatures et à la visionneuse du labo. */
export function StudioLights() {
  return (
    <>
      <ambientLight intensity={1.4} />
      <hemisphereLight args={['#ffffff', '#3a2a20', 1.2]} />
      <directionalLight position={[3, 5, 4]} intensity={2.6} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} color="#ffd2b0" />
    </>
  )
}

function Turntable({ file, speed, onReady }: { file: string; speed: number; onReady?: () => void }) {
  const { scene } = useGLTF(asset(file))
  // Une copie par carte : la même scène ne peut pas être affichée dans deux canvas à la fois
  const clone = useMemo(() => scene.clone(true), [scene])
  const ref = useRef<Group>(null)
  useEffect(() => onReady?.(), [onReady])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed
  })
  return (
    <group ref={ref}>
      <Center>
        <primitive object={clone} />
      </Center>
    </group>
  )
}

/** Modèle qui tourne sur lui-même, fond transparent. */
export default function SpinningModel({
  file,
  speed = 0.6,
  onReady,
}: {
  file: string
  speed?: number
  onReady?: () => void
}) {
  return (
    <Canvas camera={{ position: [2.2, 1.4, 3.2], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <StudioLights />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.35}>
          <Turntable file={file} speed={speed} onReady={onReady} />
        </Bounds>
      </Suspense>
    </Canvas>
  )
}
