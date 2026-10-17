import { useState, type FormEvent } from 'react'
import { links } from '../lib/links'

/**
 * Formulaire de contact. Pour l'instant il ouvre le client mail (mailto).
 * À brancher plus tard sur un service d'envoi (Formspree, Resend, fonction Vercel…).
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = `[${data.get('subject')}] ${data.get('name')}`
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field =
    'w-full rounded-lg border border-line bg-panel px-4 py-3 text-text placeholder:text-muted/60 focus:border-accent focus:outline-none'

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Nom" className={field} />
        <input name="email" type="email" required placeholder="Email" className={field} />
      </div>
      <select name="subject" className={field} defaultValue="Offre d'emploi">
        <option>Offre d'emploi</option>
        <option>Autre</option>
      </select>
      <textarea name="message" required rows={5} placeholder="Message" className={field} />
      <button className="justify-self-start rounded-lg bg-accent px-5 py-3 font-bold text-ink hover:brightness-110">
        Envoyer
      </button>
      {sent && <p className="font-mono text-xs text-muted">Votre messagerie s'est ouverte avec le message prêt à envoyer.</p>}
    </form>
  )
}
