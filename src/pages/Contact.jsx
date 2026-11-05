import { useState } from 'react'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'

const HOURS = [
  ['Monday – Thursday', '10:00 AM – 10:00 PM'],
  ['Friday – Sunday', '9:00 AM – 11:00 PM'],
  ['Public Holidays', '11:00 AM – 10:00 PM'],
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // Demo only — no backend.
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Get In Touch</p>
        <h1 className="font-display mt-1 text-5xl text-charcoal sm:text-6xl">CONTACT US</h1>
        <p className="mt-2 max-w-xl text-charcoal/60">
          Questions, feedback or catering enquiries — we'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Info */}
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl bg-charcoal p-6 text-white">
            <h2 className="font-display text-2xl text-brand-yellow">VISIT US</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                <span>12, Jalan Telawi, Bangsar, 59100 Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-red" />
                <span>+60 3-2201 8888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-red" />
                <span>hello@husinfriedchicken.com.my</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-display text-2xl text-charcoal">
              <Clock className="h-5 w-5 text-brand-red" /> OPENING HOURS
            </h2>
            <ul className="mt-4 divide-y divide-charcoal/10 text-sm">
              {HOURS.map(([day, time]) => (
                <li key={day} className="flex justify-between py-2.5">
                  <span className="font-semibold text-charcoal/70">{day}</span>
                  <span className="text-charcoal">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="flex h-48 items-center justify-center rounded-2xl bg-brand-brown/20 text-sm font-semibold text-brand-brown">
            <MapPin className="mr-2 h-5 w-5" /> Map — Bangsar, Kuala Lumpur
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-6 shadow-card lg:col-span-3">
          <h2 className="font-display text-2xl text-charcoal">SEND US A MESSAGE</h2>
          {sent && (
            <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Thanks! Your message was received (demo — nothing was actually sent).
            </p>
          )}
          <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2" noValidate>
            <div>
              <label htmlFor="c-name" className="mb-1 block text-sm font-semibold text-charcoal/70">
                Your Name *
              </label>
              <input
                id="c-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-charcoal/15 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-white"
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1 block text-sm font-semibold text-charcoal/70">
                Email *
              </label>
              <input
                id="c-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-charcoal/15 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-white"
                placeholder="you@email.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-subject" className="mb-1 block text-sm font-semibold text-charcoal/70">
                Subject
              </label>
              <input
                id="c-subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-xl border border-charcoal/15 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-white"
                placeholder="e.g. Catering enquiry"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-message" className="mb-1 block text-sm font-semibold text-charcoal/70">
                Message *
              </label>
              <textarea
                id="c-message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-charcoal/15 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-brand-red focus:bg-white"
                placeholder="How can we help?"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-charcoal"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
