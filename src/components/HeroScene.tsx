import { Float, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

/**
 * Scène du hero. Placeholder géométrique en attendant le modèle du PC portable :
 * déposer public/models/laptop.glb puis remplacer <Laptop /> par un <Gltf src="/models/laptop.glb" />.
 */
function Laptop() {
  return (
    <group rotation={[0.25, -0.6, 0]}>
      {/* base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.4, 0.1, 1.6]} />
        <meshStandardMaterial color="#1c1b1a" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* écran */}
      <group position={[0, 0, -0.8]} rotation={[-0.25, 0, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.4, 1.6, 0.06]} />
          <meshStandardMaterial color="#1c1b1a" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.8, 0.035]}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshStandardMaterial color="#ff6a2b" emissive="#ff6a2b" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 1.2, 4.2], fov: 40 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} />
      <pointLight position={[-3, 1, 2]} color="#ff6a2b" intensity={8} />
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Laptop />
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
