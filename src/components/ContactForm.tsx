import { useState, type FormEvent } from 'react'
import { links } from '../lib/links'

const subjects = ["Une offre d'emploi", 'Autre chose']

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
      <fieldset className="flex flex-wrap items-center gap-3">
        <legend className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">Vous m'écrivez pour</legend>
        {subjects.map((s, i) => (
          <label key={s} className="cursor-pointer">
            <input type="radio" name="subject" value={s} defaultChecked={i === 0} className="peer sr-only" />
            <span className="block rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/60 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/60">
              {s}
            </span>
          </label>
        ))}
      </fieldset>
      <textarea name="message" required rows={5} placeholder="Message" className={field} />
      <button className="justify-self-start rounded-lg bg-accent px-5 py-3 font-bold text-ink hover:brightness-110">
        Envoyer
      </button>
      {sent && <p className="font-mono text-xs text-muted">Votre messagerie s'est ouverte avec le message prêt à envoyer.</p>}
    </form>
  )
}
