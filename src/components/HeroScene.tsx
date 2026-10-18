import { Bounds, Float, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { asset } from '../lib/asset'

const LAPTOP = asset('/models/laptop.glb')

/** Le PC portable modélisé dans Blender (repris de l'ancien portfolio, compressé en meshopt + WebP). */
function Laptop() {
  const { scene } = useGLTF(LAPTOP)
  // Même orientation que sur l'ancien site
  return <primitive object={scene} rotation={[0.12, -1.55, 0]} />
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.35, 10], fov: 40 }} dpr={[1, 2]}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 10, 7.5]} intensity={2.6} />
      <pointLight position={[-1, 3, -1]} intensity={3} distance={30} decay={2} color="#ffaa00" />
      <spotLight position={[-15, 0, 9]} intensity={200} distance={50} angle={Math.PI / 4} penumbra={0.5} decay={2} />
      <spotLight position={[-10, 0, -9]} intensity={200} distance={50} angle={Math.PI / 4} penumbra={0.5} decay={2} />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.15}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
            <Laptop />
          </Float>
        </Bounds>
      </Suspense>
      <OrbitControls makeDefault enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

useGLTF.preload(LAPTOP)
