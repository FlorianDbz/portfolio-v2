import type { ReactNode } from 'react'

export default function Section({
  id,
  index,
  title,
  children,
}: {
  id: string
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-16">
      <div className="mb-10 flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent">{index}</span>
        <h2 className="font-display text-4xl font-extrabold sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  )
}
