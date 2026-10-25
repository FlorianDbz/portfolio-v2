# Portfolio V2 — Florian Debosz

Portfolio de développeur Fullstack JavaScript : React, TypeScript, React Three Fiber, Tailwind CSS.
Destiné à **floriandbz.dev**, hébergé sur Vercel.

## Lancer le projet

```bash
npm install
npm run dev      # serveur local
npm run build    # build de production dans dist/
```

## Ajouter du contenu (sans toucher au code)

### Un jeu
Créer un dossier `src/content/games/<slug>/` avec un `game.json` :

```json
{
  "title": "Nom du jeu",
  "engine": "Unreal Engine 5",
  "year": 2026,
  "status": "publié",
  "summary": "Une ou deux phrases.",
  "download": { "label": "itch.io", "url": "https://mezsan.itch.io/nom-du-jeu" },
  "cover": "/images/games/nom-du-jeu.webp",
  "video": "/videos/nom-du-jeu.mp4",
  "devlog": [{ "date": "2026-10", "text": "Ce qui a changé." }]
}
```

`status` vaut `"publié"` ou `"à venir"` (affiche le teaser et l'inscription email).
Les jeux se téléchargent sur itch.io (ou CurseForge pour un modpack), jamais en .exe sur le site.

### Un modèle 3D
1. Exporter depuis Blender en `.glb`, puis compresser :
   `npx gltf-transform optimize entree.glb public/models/nom.glb --compress meshopt`
2. Ajouter une miniature WebP dans `public/thumbs/`.
3. Ajouter une entrée dans `src/content/models.json` (`featured: true` pour l'afficher sur l'accueil).

## Structure

```
src/
  components/   Layout, Section, HeroScene (Three.js), ContactForm
  pages/        Home, Labo (visionneuse Textures / Matcap / Fil de fer), Jeux
  content/      données : un dossier par jeu, models.json
  lib/links.ts  liens GitHub, itch.io, LinkedIn, email
```

## Direction artistique (piste A2)
Fond `#0B0B0C`, accent `#FF6A2B`. Polices : Syne (titres), Manrope (texte), JetBrains Mono (labels).
Les couleurs sont définies dans `src/index.css` (`@theme`).
