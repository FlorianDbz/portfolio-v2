import { Bounds, Float, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { MathUtils, type Group } from 'three'
import { asset } from '../lib/asset'

const LAPTOP = asset('/models/laptop.glb')
const ACCENT = '#ff6a2b'

/** Le PC portable modélisé dans Blender (repris de l'ancien portfolio, compressé en meshopt + WebP). */
function Laptop() {
  const { scene } = useGLTF(LAPTOP)
  // Même orientation que sur l'ancien site
  return <primitive object={scene} rotation={[0.12, -1.55, 0]} />
}

/** Le PC s'oriente doucement vers la souris, où qu'elle soit sur la page. */
function FollowPointer({ children, still }: { children: React.ReactNode; still: boolean }) {
  const ref = useRef<Group>(null)
  useFrame(({ pointer }, delta) => {
    if (!ref.current || still) return
    const k = 1 - Math.exp(-delta * 3)
    ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.35, k)
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, -pointer.y * 0.12, k)
  })
  return <group ref={ref}>{children}</group>
}

export default function HeroScene() {
  const still = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  return (
    <Canvas
      camera={{ position: [0, 0.35, 10], fov: 40 }}
      dpr={[1, 2]}
      // La souris est suivie sur toute la page, pas seulement au-dessus du canvas
      eventSource={document.getElementById('root') ?? undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 7.5]} intensity={2.2} />
      {/* Contre-jour orange : détache la silhouette du fond noir */}
      <spotLight position={[0, 4, -8]} intensity={260} distance={40} angle={Math.PI / 3} penumbra={0.8} decay={2} color={ACCENT} />
      {/* Lumière chaude venue de l'écran, qui éclaire le clavier */}
      <pointLight position={[0, 0.6, 1.4]} intensity={6} distance={6} decay={2} color="#ffb48a" />
      <spotLight position={[-15, 0, 9]} intensity={160} distance={50} angle={Math.PI / 4} penumbra={0.5} decay={2} />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.1}>
          <FollowPointer still={!!still}>
            <Float speed={1.2} rotationIntensity={still ? 0 : 0.12} floatIntensity={still ? 0 : 0.3}>
              <Laptop />
            </Float>
          </FollowPointer>
        </Bounds>
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(LAPTOP)
