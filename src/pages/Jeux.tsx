import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { games, type Game } from '../content'
import { asset } from '../lib/asset'

export default function Jeux() {
  const filters = useMemo(() => ['Tous', ...new Set(games.map((g) => g.engine)), 'À venir'], [])
  const [filter, setFilter] = useState('Tous')
  const list = games.filter((g) =>
    filter === 'Tous' ? true : filter === 'À venir' ? g.status === 'à venir' : g.engine === filter,
  )
  // Par défaut : le dernier jeu sorti (la liste est déjà triée, les projets à venir en tête)
  // Un lien de l'accueil (/jeux?jeu=<slug>) ouvre directement la fiche du jeu cliqué
  const [params] = useSearchParams()
  const [selectedSlug, setSelectedSlug] = useState(
    () => games.find((g) => g.slug === params.get('jeu'))?.slug ?? (games.find((g) => g.status !== 'à venir') ?? games[0]).slug,
  )
  // Si le filtre masque le jeu choisi, on affiche le premier de la liste filtrée
  const selected: Game = list.find((g) => g.slug === selectedSlug) ?? list[0] ?? games[0]

  return (
    <div className="py-12">
      <h1 className="mb-2 font-display text-5xl font-extrabold">Jeux</h1>
      <p className="mb-8 text-muted">Développés en solo. Les jeux se téléchargent sur itch.io, le modpack sur CurseForge.</p>

      <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 ${filter === f ? 'border-accent text-accent' : 'border-line text-muted'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        <ul className="flex flex-col gap-2">
          {list.map((g) => (
            <li key={g.slug}>
              <button
                onClick={() => setSelectedSlug(g.slug)}
                className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left ${selected.slug === g.slug ? 'border-accent bg-accent/10' : 'border-line bg-panel hover:border-accent/50'}`}
              >
                {g.cover ? (
                  <img src={asset(g.cover)} alt="" loading="lazy" className="aspect-video w-24 shrink-0 rounded-md object-cover" />
                ) : (
                  <span className="aspect-video w-24 shrink-0 rounded-md border border-dashed border-line" />
                )}
                <span className="min-w-0">
                  <span className="block font-display text-xl font-bold">{g.title}</span>
                  <span className="block font-mono text-xs text-muted">
                    {g.status === 'à venir' ? `${g.engine}, en préparation` : `${g.engine}, ${g.year}`}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <GameSheet game={selected} />
      </div>
    </div>
  )
}

function GameSheet({ game }: { game: Game }) {
  const upcoming = game.status === 'à venir'
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-panel">
      {game.video ? (
        <video src={asset(game.video)} controls preload="none" className="aspect-video w-full bg-black" />
      ) : game.cover ? (
        <img src={asset(game.cover)} alt={`Capture de ${game.title}`} className="aspect-video w-full object-cover" />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-[#1c1b1a] font-mono text-xs text-muted">
          [{upcoming ? 'Teaser' : 'Vidéo de gameplay'}]
        </div>
      )}
      <div className="flex flex-col gap-4 p-6">
        <h2 className="font-display text-3xl font-bold">{game.title}</h2>
        <p className="text-muted">{game.summary}</p>

        {upcoming ? (
          <form className="flex flex-wrap gap-3" onSubmit={(e) => e.preventDefault()}>
            {/* À brancher sur un service d'emailing */}
            <input
              type="email"
              required
              placeholder="Votre email"
              className="flex-1 rounded-lg border border-line bg-ink px-4 py-3 focus:border-accent focus:outline-none"
            />
            <button className="rounded-lg bg-accent px-5 py-3 font-bold text-ink">Me prévenir</button>
          </form>
        ) : (
          (game.play || game.download) && (
            <div className="flex flex-wrap gap-3">
              {game.play && (
                <a href={game.play} className="rounded-lg bg-accent px-5 py-3 font-bold text-ink hover:brightness-110">
                  Jouer dans le navigateur
                </a>
              )}
              {game.download && (
                <a
                  href={game.download.url}
                  className={
                    game.play
                      ? 'rounded-lg border border-line px-5 py-3 font-bold hover:border-accent'
                      : 'rounded-lg bg-accent px-5 py-3 font-bold text-ink hover:brightness-110'
                  }
                >
                  Télécharger sur {game.download.label}
                  {game.download.platforms && <span className="ml-2 font-mono text-xs font-normal opacity-70">{game.download.platforms}</span>}
                </a>
              )}
            </div>
          )
        )}

        {game.devlog.length > 0 && (
          <div>
            <h3 className="mb-2 font-mono text-xs uppercase text-accent">Journal de dev</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {game.devlog.map((d) => (
                <li key={d.date}>
                  <span className="font-mono text-xs">{d.date}</span> — {d.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
