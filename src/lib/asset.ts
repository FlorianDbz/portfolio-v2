/**
 * Chemin vers un fichier de public/.
 * La base est figée au chargement de la page, pour que les chemins restent bons
 * même après un changement de page (/labo, /jeux) ou dans un sous-dossier.
 */
const BASE = new URL(import.meta.env.BASE_URL, window.location.href).href

export const asset = (path: string) => (path ? new URL(path.replace(/^\//, ''), BASE).href : '')
