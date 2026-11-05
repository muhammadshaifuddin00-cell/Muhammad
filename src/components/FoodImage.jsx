import { useState } from 'react'
import { Drumstick } from 'lucide-react'

// Food photo with a branded SVG fallback so no image ever appears broken.
export default function FoodImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brand-yellow/40 via-stone-200 to-brand-brown/30 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Drumstick className="h-10 w-10 text-brand-brown/60" strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
