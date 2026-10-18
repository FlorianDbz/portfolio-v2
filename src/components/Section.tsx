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
      {/* Pas de numéro : les sections ne forment pas une suite (index gardé dans l'API pour revenir en arrière facilement). */}
      <h2 className="mb-10 font-display text-4xl font-extrabold sm:text-5xl" data-index={index}>
        {title}
      </h2>
      {children}
    </section>
  )
}
