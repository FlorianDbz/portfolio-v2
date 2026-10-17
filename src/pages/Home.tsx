import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import Section from '../components/Section'
import { games, models } from '../content'
import { links } from '../lib/links'

const HeroScene = lazy(() => import('../components/HeroScene'))

/** La scène 3D se charge après l'affichage du texte. */
function DeferredScene() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 300)
    return () => window.clearTimeout(id)
  }, [])
  if (!ready) return null
  return (
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
  )
}

const parcours = [
  { date: '2020 – 2021', text: 'DEUST IOSI puis licence professionnelle, Université Polytechnique Hauts-de-France. Stages chez Creo Ignem et Redsense.' },
  { date: '2022 – 2023', text: 'Cursus Mastère Ingénierie de la 3D et des jeux vidéo à l’ESGI, en alternance chez Redsense (Java, HTML, CSS).' },
  { date: '2025 – 2026', text: 'Médiateur numérique à la Cité des Géométries : formation de groupes de 20 à 50 personnes, ateliers Python et Lego Mindstorms.' },
  { date: 'Aujourd’hui', text: 'Disponible immédiatement pour un CDI de développeur Fullstack JavaScript.' },
]

const apports = [
  'Des interfaces React et TypeScript pensées de la maquette à la mise en ligne.',
  'Des applications PC et mobile avec Electron et React Native.',
  'Le sens de la pédagogie : expliquer, documenter, transmettre.',
  'Une vraie culture 3D (Three.js, Blender, Unity, Unreal) quand le projet en a besoin.',
]

export default function Home() {
  const featuredModels = models.filter((m) => m.featured).slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section className="grid min-h-[80vh] items-center gap-8 py-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Développeur Fullstack JavaScript · Hauts-de-France
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Des applications web avec du relief.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Je conçois des interfaces et des applications PC et mobile en React, TypeScript, React Native et Electron,
            avec une touche de 3D quand elle sert le projet.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#web" className="rounded-lg bg-accent px-5 py-3 font-bold text-ink hover:brightness-110">
              Voir les projets
            </a>
            <a href="#contact" className="rounded-lg border border-line px-5 py-3 font-bold hover:border-accent">
              Me contacter
            </a>
          </div>
        </div>
        <div className="h-[360px] sm:h-[460px]">
          <DeferredScene />
        </div>
      </section>

      {/* Web */}
      <Section id="web" index="01" title="Web">
        <article className="mb-6 grid overflow-hidden rounded-2xl border border-line bg-panel lg:grid-cols-[1.3fr_1fr]">
          <div className="flex aspect-video items-center justify-center bg-[#1c1b1a] font-mono text-xs text-muted">
            [Capture de Tomevale]
          </div>
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <p className="font-mono text-xs text-muted">Bêta v0.11 · PC et mobile</p>
            <h3 className="font-display text-3xl font-bold">Tomevale</h3>
            <p className="text-muted">
              Application League of Legends : statistiques, suivi des parties, assistant en jeu, comptes et
              synchronisation. Développée en solo avec React, TypeScript, Electron, React Native, Tailwind CSS,
              Supabase et l’API Riot Games.
            </p>
            <a href={links.tomevale} className="self-start rounded-lg bg-accent px-5 py-3 font-bold text-ink hover:brightness-110">
              Voir le projet sur GitHub
            </a>
            <p className="text-xs text-muted/70">
              Tomevale n’est pas approuvé par Riot Games et ne reflète pas les opinions de Riot Games ou de toute
              personne officiellement impliquée dans la production ou la gestion des propriétés de Riot Games.
            </p>
          </div>
        </article>

        <div className="grid gap-6 md:grid-cols-2">
          <ProjectCard
            meta="2026 · React · Three.js"
            title="Ce portfolio"
            text="Conçu et codé de A à Z, avec mes propres modèles 3D intégrés en temps réel."
            href={links.portfolioRepo}
          />
          <ProjectCard
            meta="Symfony · SQL"
            title="Blog Symfony"
            text="Création d’articles, inscription et connexion, base de données."
            href={links.github}
          />
        </div>
      </Section>

      {/* Labo 3D */}
      <Section id="labo" index="02" title="Labo 3D">
        <div className="grid gap-6 md:grid-cols-3">
          {featuredModels.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-2xl border border-line bg-panel">
              <div className="flex aspect-square items-center justify-center bg-[#1c1b1a] font-mono text-xs text-muted">
                [{m.title}]
              </div>
              <p className="p-4 font-display text-lg font-bold">{m.title}</p>
            </div>
          ))}
          <Link
            to="/labo"
            className="flex aspect-square flex-col justify-end rounded-2xl border border-accent/50 p-6 hover:bg-accent/10"
          >
            <span className="font-mono text-xs text-accent">{models.length} modèle(s)</span>
            <span className="font-display text-2xl font-bold">Ouvrir le labo →</span>
          </Link>
        </div>
      </Section>

      {/* Jeux */}
      <Section id="jeux" index="03" title="Jeux">
        <ul className="divide-y divide-line border-y border-line">
          {games.map((g) => (
            <li key={g.slug} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5">
              <span className="font-display text-2xl font-bold">{g.title}</span>
              <span className="font-mono text-xs text-muted">
                {g.engine} · {g.status === 'à venir' ? 'À venir' : g.year}
              </span>
            </li>
          ))}
        </ul>
        <Link to="/jeux" className="mt-6 inline-block font-bold text-accent">
          Tous les jeux →
        </Link>
      </Section>

      {/* À propos */}
      <Section id="apropos" index="04" title="À propos">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6 text-lg">
            <p>
              Je m’appelle Florian, alias Mezsan. Je passe du code web au moteur de jeu, et du moteur de jeu à Blender.
              Ce qui m’intéresse, c’est de livrer des applications utiles, propres et agréables à utiliser.
            </p>
            <ol className="flex flex-col gap-4 border-l border-line pl-6">
              {parcours.map((p) => (
                <li key={p.date}>
                  <p className="font-mono text-xs text-accent">{p.date}</p>
                  <p className="text-base text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-4 font-display text-2xl font-bold">Ce que j’apporte à une équipe</h3>
            <ul className="flex flex-col gap-3">
              {apports.map((a) => (
                <li key={a} className="rounded-lg border border-line bg-panel p-4 text-muted">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" index="05" title="Contact">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <a href={`mailto:${links.email}`} className="font-display text-2xl font-bold hover:text-accent">
              {links.email}
            </a>
            <div className="flex gap-6 font-mono text-sm">
              <a href={links.github} className="hover:text-accent">GitHub</a>
              <a href={links.itch} className="hover:text-accent">itch.io</a>
              <a href={links.linkedin} className="hover:text-accent">LinkedIn</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  )
}

function ProjectCard({ meta, title, text, href }: { meta: string; title: string; text: string; href: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="flex aspect-video items-center justify-center bg-[#1c1b1a] font-mono text-xs text-muted">
        [Capture]
      </div>
      <div className="flex flex-col gap-3 p-6">
        <p className="font-mono text-xs text-muted">{meta}</p>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <p className="text-muted">{text}</p>
        <a href={href} className="font-bold text-accent">Code sur GitHub →</a>
      </div>
    </article>
  )
}
