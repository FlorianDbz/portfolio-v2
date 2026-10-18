import modelList from './models.json'

export type Game = {
  slug: string
  title: string
  engine: string
  year: number
  status: 'publié' | 'à venir'
  summary: string
  /** Version jouable directement dans le navigateur (itch.io HTML5). */
  play?: string
  download?: { label: string; url: string; platforms?: string }
  cover: string
  video: string
  devlog: { date: string; text: string }[]
}

export type Model3D = {
  id: string
  title: string
  category: string
  featured: boolean
  file: string
  thumb: string
}

// Un dossier par jeu : src/content/games/<slug>/game.json
const gameFiles = import.meta.glob<Omit<Game, 'slug'>>('./games/*/game.json', {
  eager: true,
  import: 'default',
})

export const games: Game[] = Object.entries(gameFiles)
  .map(([path, data]) => ({ slug: path.split('/')[2], ...data }))
  .sort((a, b) => {
    if (a.status !== b.status) return a.status === 'à venir' ? -1 : 1
    return b.year - a.year
  })

export const models = modelList as Model3D[]
