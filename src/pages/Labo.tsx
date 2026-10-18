import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useState } from 'react'
import * as THREE from 'three'
import ModelTile from '../components/ModelTile'
import { StudioLights } from '../components/SpinningModel'
import { models, type Model3D } from '../content'
import { asset } from '../lib/asset'

type Mode = 'textures' | 'matcap' | 'wireframe'
const modes: { id: Mode; label: string }[] = [
  { id: 'textures', label: 'Textures' },
  { id: 'matcap', label: 'Matcap' },
  { id: 'wireframe', label: 'Fil de fer' },
]

function Model({ file, mode }: { file: string; mode: Mode }) {
  const { scene } = useGLTF(asset(file))
  const clone = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      if (mode === 'matcap') obj.material = new THREE.MeshNormalMaterial()
      if (mode === 'wireframe') obj.material = new THREE.MeshBasicMaterial({ color: '#ff6a2b', wireframe: true })
    })
    return root
  }, [scene, mode])
  return <primitive object={clone} />
}

function Viewer({ model, onClose }: { model: Model3D; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>('textures')
  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-ink/95 p-4 sm:p-8" role="dialog" aria-label={model.title}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold">{model.title}</h2>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-md border px-3 py-2 ${mode === m.id ? 'border-accent text-accent' : 'border-line text-muted'}`}
            >
              {m.label}
            </button>
          ))}
          <button onClick={onClose} className="rounded-md border border-line px-3 py-2 text-muted hover:text-text">
            Fermer
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden rounded-2xl border border-line bg-panel">
        <Canvas camera={{ position: [2, 1.5, 3], fov: 45 }} dpr={[1, 2]}>
          <StudioLights />
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.4}>
              <Center>
                <Model file={model.file} mode={mode} />
              </Center>
            </Bounds>
          </Suspense>
          <OrbitControls makeDefault autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>
    </div>
  )
}

export default function Labo() {
  const categories = useMemo(() => ['Tous', ...new Set(models.map((m) => m.category))], [])
  const [filter, setFilter] = useState('Tous')
  const [open, setOpen] = useState<Model3D | null>(null)
  const list = filter === 'Tous' ? models : models.filter((m) => m.category === filter)

  return (
    <div className="py-12">
      <h1 className="mb-2 font-display text-5xl font-extrabold">Labo 3D</h1>
      <p className="mb-8 text-muted">Mes modèles Blender, en temps réel. Cliquez sur un modèle pour le manipuler.</p>

      <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-2 ${filter === c ? 'border-accent text-accent' : 'border-line text-muted'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {list.map((m) => (
          <button
            key={m.id}
            onClick={() => setOpen(m)}
            className="overflow-hidden rounded-2xl border border-line bg-panel text-left hover:border-accent"
          >
            <ModelTile model={m} />
            <div className="p-4">
              <p className="font-mono text-xs text-muted">{m.category}</p>
              <p className="font-display text-lg font-bold">{m.title}</p>
            </div>
          </button>
        ))}
      </div>

      {open && <Viewer model={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
