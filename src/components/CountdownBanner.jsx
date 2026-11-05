import { useEffect, useState } from 'react'
import { Flame, X } from 'lucide-react'

// Countdown to midnight — resets daily, promo banner style.
export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  if (dismissed) return null

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="relative flex items-center justify-center gap-3 overflow-hidden bg-charcoal px-4 py-2 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -left-4 -top-6 h-16 w-16 rounded-full bg-brand-yellow" />
        <div className="absolute -bottom-6 right-10 h-14 w-14 rounded-full bg-brand-red" />
      </div>
      <Flame className="h-4 w-4 shrink-0 text-brand-yellow" />
      <p className="truncate text-xs font-semibold sm:text-sm">
        TODAY'S SPECIAL — FREE delivery on orders above RM50!
      </p>
      <div className="hidden items-center gap-1 font-mono text-xs font-bold sm:flex">
        {[timeLeft.h, timeLeft.m, timeLeft.s].map((v, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="rounded bg-brand-red px-1.5 py-0.5 text-white">{pad(v)}</span>
            {i < 2 && <span className="text-brand-grey">:</span>}
          </span>
        ))}
        <span className="ml-1 text-brand-grey">left</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/60 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

function getTimeLeft() {
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  const diff = Math.max(0, end - now)
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}
