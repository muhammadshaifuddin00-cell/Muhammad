import { Link } from 'react-router-dom'
import { ArrowRight, BadgePercent, Clock, Tag } from 'lucide-react'
import { PRODUCTS, formatRM } from '../data/products'
import FoodImage from '../components/FoodImage'

const promos = [
  {
    badge: 'Weekend Special',
    title: '20% OFF All Combos',
    desc: 'Every combo meal is 20% off every Saturday and Sunday. Dine in or delivery — the choice is yours.',
    code: 'HFC20',
    color: 'bg-brand-red',
    text: 'text-white',
    category: 'combo-meals',
  },
  {
    badge: 'Lunch Deal',
    title: 'Buy 1 Free 1 Meals',
    desc: 'Weekdays 2PM–5PM: buy any chicken meal, get a second one free. Perfect for office lunches.',
    code: 'HFCLUNCH',
    color: 'bg-brand-yellow',
    text: 'text-charcoal',
    category: 'chicken-meals',
  },
  {
    badge: 'Student Offer',
    title: '15% OFF with Student Card',
    desc: 'Flash your valid student card at checkout or mention it when ordering online.',
    code: 'HFCSTUDENT',
    color: 'bg-charcoal',
    text: 'text-white',
    category: 'all',
  },
  {
    badge: 'New Customer',
    title: 'RM5 OFF First Order',
    desc: 'First time ordering? Enjoy RM5 off any order above RM30. Welcome to the HFC family!',
    code: 'HFCHELLO',
    color: 'bg-brand-brown',
    text: 'text-white',
    category: 'all',
  },
]

const promoProducts = PRODUCTS.filter((p) => p.compareAt || p.badge === 'Promo' || p.badge === 'Value')

export default function Promotions() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Deals & Offers</p>
        <h1 className="font-display mt-1 text-5xl text-charcoal sm:text-6xl">PROMOTIONS</h1>
        <p className="mt-2 max-w-xl text-charcoal/60">
          Save more on your favourite HFC meals. All promos applied automatically at checkout (demo).
        </p>
      </div>

      {/* Promo cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {promos.map((p) => (
          <div
            key={p.code}
            className={`relative overflow-hidden rounded-3xl ${p.color} ${p.text} p-7 sm:p-9`}
          >
            <BadgePercent className="absolute -right-5 -top-5 h-32 w-32 opacity-15" />
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
              {p.badge}
            </span>
            <h2 className="font-display mt-3 text-4xl leading-none sm:text-5xl">{p.title}</h2>
            <p className="mt-3 max-w-md text-sm opacity-85">{p.desc}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-lg border-2 border-dashed border-current/50 px-4 py-1.5 font-mono text-sm font-bold tracking-wider">
                {p.code}
              </span>
              <Link
                to={p.category === 'all' ? '/menu' : `/menu?category=${p.category}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-4"
              >
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Discounted products */}
      <div className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <Tag className="h-6 w-6 text-brand-red" />
          <h2 className="font-display text-3xl text-charcoal sm:text-4xl">DEALS YOU'LL LOVE</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promoProducts.map((p) => (
            <Link
              key={p.id}
              to={`/menu/${p.id}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative overflow-hidden">
                <FoodImage
                  src={p.image}
                  alt={p.name}
                  className="group-hover-zoom aspect-[4/3] w-full object-cover"
                />
                {p.compareAt && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white">
                    -{Math.round(((p.compareAt - p.price) / p.compareAt) * 100)}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg text-charcoal group-hover:text-brand-red">{p.name}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bold text-brand-red">{formatRM(p.price)}</span>
                  {p.compareAt && (
                    <span className="text-sm text-charcoal/40 line-through">{formatRM(p.compareAt)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* T&Cs */}
      <div className="mt-12 rounded-2xl border border-charcoal/10 bg-white p-6 text-sm text-charcoal/60">
        <p className="flex items-center gap-2 font-bold text-charcoal">
          <Clock className="h-4 w-4 text-brand-red" /> Terms & Conditions
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Promotions cannot be combined unless stated otherwise.</li>
          <li>Prices shown are in Malaysian Ringgit (RM) and include SST where applicable.</li>
          <li>Promo availability is subject to daily stock limits.</li>
          <li>This is a demo storefront — no real orders or payments are processed.</li>
        </ul>
      </div>
    </div>
  )
}
