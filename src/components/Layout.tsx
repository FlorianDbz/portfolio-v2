import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { links } from '../lib/links'

const year = new Date().getFullYear()

/**
 * Largeur commune à l'en-tête, au contenu et au pied de page : pleine largeur,
 * marges qui grandissent avec l'écran, plafond à 1920 px pour les écrans ultra-larges.
 */
const shell = 'mx-auto w-full max-w-[1920px] px-4 sm:px-8 lg:px-12 2xl:px-20'

const nav = [
  { href: '/#web', label: 'Web' },
  { href: '/labo', label: 'Labo 3D' },
  { href: '/jeux', label: 'Jeux' },
  { href: '/#apropos', label: 'À propos' },
  { href: '/#contact', label: 'Contact' },
]

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-ink/90 backdrop-blur">
        <div className={`${shell} flex items-center justify-between gap-4 py-4`}>
        <Link to="/" className="flex items-center gap-3" aria-label="Accueil">
          <img src={logo} alt="Logo Florian Debosz" className="h-9 w-9" />
          <span className="font-display text-lg font-bold">Florian Debosz</span>
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted">
          {nav.map((item) =>
            item.href.startsWith('/#') ? (
              <a key={item.href} href={item.href} className="hover:text-accent">
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => (isActive ? 'text-accent' : 'hover:text-accent')}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
        </div>
      </header>

      <main className={shell}>{children}</main>

      <footer className={`${shell} flex flex-wrap justify-between gap-3 border-t border-line py-6 font-mono text-xs text-muted`}>
        <span>© {year} Florian Debosz</span>
        <span className="flex gap-4">
          <a href={links.github} className="hover:text-accent">GitHub</a>
          <a href={links.itch} className="hover:text-accent">itch.io</a>
          <a href={links.linkedin} className="hover:text-accent">LinkedIn</a>
        </span>
      </footer>
    </>
  )
}
