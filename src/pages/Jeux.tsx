import { useMemo, useState } from 'react'
import { games, type Game } from '../content'

export default function Jeux() {
  const filters = useMemo(() => ['Tous', ...new Set(games.map((g) => g.engine)), 'À venir'], [])
  const [filter, setFilter] = useState('Tous')
  const list = games.filter((g) =>
    filter === 'Tous' ? true : filter === 'À venir' ? g.status === 'à venir' : g.engine === filter,
  )
  const [selected, setSelected] = useState<Game>(games[0])

  return (
    <div className="py-12">
      <h1 className="mb-2 font-display text-5xl font-extrabold">Jeux</h1>
      <p className="mb-8 text-muted">Développés en solo. Les jeux se téléchargent sur itch.io.</p>

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
                onClick={() => setSelected(g)}
                className={`w-full rounded-xl border p-4 text-left ${selected.slug === g.slug ? 'border-accent bg-accent/10' : 'border-line bg-panel'}`}
              >
                <p className="font-display text-xl font-bold">{g.title}</p>
                <p className="font-mono text-xs text-muted">
                  {g.engine} · {g.status === 'à venir' ? 'À venir' : g.year}
                </p>
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
        <video src={game.video} controls preload="none" className="aspect-video w-full bg-black" />
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
          game.itch && (
            <a href={game.itch} className="self-start rounded-lg bg-accent px-5 py-3 font-bold text-ink hover:brightness-110">
              Télécharger sur itch.io
            </a>
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
