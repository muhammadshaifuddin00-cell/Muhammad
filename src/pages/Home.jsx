import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgePercent,
  ChefHat,
  Clock,
  Drumstick,
  Flame,
  Quote,
  Star,
  Truck,
} from 'lucide-react'
import { PRODUCTS, formatRM } from '../data/products'
import ProductCard from '../components/ProductCard'
import FoodImage from '../components/FoodImage'
import CountdownBanner from '../components/CountdownBanner'

const bestSellers = PRODUCTS.filter((p) => p.badge === 'Best Seller').slice(0, 4)
const testimonials = [
  {
    name: 'Aisyah Rahman',
    role: 'Regular Customer',
    text: 'The crispiest fried chicken in KL! Every bite is juicy inside and crunchy outside. My whole family loves it.',
    rating: 5,
  },
  {
    name: 'Daniel Lim',
    role: 'Food Blogger',
    text: 'HFC set the bar for Malaysian fried chicken. Their secret marinade is no joke — I reviewed it on my channel.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Office Worker',
    text: 'Ordering for lunch has never been easier. Fast delivery and the chicken stays hot. 10/10!',
    rating: 4,
  },
]

export default function Home() {
  return (
    <div>
      <CountdownBanner />

      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-yellow/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-yellow">
              <Flame className="h-3.5 w-3.5" /> Freshly Fried Daily
            </span>
            <h1 className="font-display mt-5 text-6xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              CRISPY,
              <br />
              <span className="text-brand-yellow">JUICY</span> &amp;
              <br />
              <span className="text-brand-red">DELICIOUS!</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base text-brand-grey lg:mx-0 lg:text-lg">
              Experience the irresistible taste of Husin Fried Chicken — marinated
              24 hours, fried to perfection, delivered hot to your door.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/menu"
                className="w-full rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-white hover:text-brand-red sm:w-auto"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="w-full rounded-full border-2 border-brand-yellow px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-brand-yellow transition-all hover:bg-brand-yellow hover:text-charcoal sm:w-auto"
              >
                Explore Menu
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-grey lg:justify-start">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow" /> 4.8/5 rating
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-brand-red" /> Free delivery RM50+
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-brown" /> Open till 11PM
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="animate-floaty overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-brand-yellow/60">
              <FoodImage
                src={PRODUCTS[0].image}
                alt="HFC Signature Fried Chicken"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -left-3 bottom-6 rounded-2xl bg-white px-5 py-3 shadow-xl sm:-left-8">
              <p className="font-display text-3xl text-brand-red">24hrs</p>
              <p className="text-xs font-semibold text-charcoal/60">SECRET MARINADE</p>
            </div>
            <div className="absolute -right-3 top-6 rounded-2xl bg-brand-yellow px-5 py-3 shadow-xl sm:-right-6">
              <p className="font-display text-3xl text-charcoal">100%</p>
              <p className="text-xs font-semibold text-charcoal/60">HALAL CERTIFIED</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO BANNERS */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-red p-6 text-white sm:p-8">
          <BadgePercent className="absolute -right-4 -top-4 h-28 w-28 text-white/10" />
          <p className="font-display text-4xl sm:text-5xl">20% OFF</p>
          <p className="mt-1 font-semibold text-white/90">All Combo Meals this weekend</p>
          <Link
            to="/menu?category=combo-meals"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-red transition-colors hover:bg-brand-yellow"
          >
            Grab the Deal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-brand-yellow p-6 text-charcoal sm:p-8">
          <Drumstick className="absolute -right-4 -top-4 h-28 w-28 text-charcoal/10" />
          <p className="font-display text-4xl sm:text-5xl">BUY 1 FREE 1</p>
          <p className="mt-1 font-semibold text-charcoal/80">Family Feast on weekdays 2–5PM</p>
          <Link
            to="/menu?category=chicken-meals"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-red"
          >
            View Meals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Customer Favourites</p>
            <h2 className="font-display mt-1 text-4xl text-charcoal sm:text-5xl">BEST SELLERS</h2>
          </div>
          <Link
            to="/menu"
            className="hidden items-center gap-1 text-sm font-bold text-brand-red hover:underline sm:flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TODAY'S SPECIAL */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-brown via-charcoal to-charcoal p-8 text-white sm:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-red/30 blur-3xl" />
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-charcoal">
                <Flame className="h-3.5 w-3.5" /> Today's Special
              </span>
              <h2 className="font-display mt-4 text-5xl leading-none sm:text-6xl">
                HONEY GLazed <span className="text-brand-yellow">8PC</span>
              </h2>
              <p className="mt-3 max-w-md text-brand-grey">
                Sticky-sweet honey glaze over our crispiest chicken — available
                today only while stocks last.
              </p>
              <div className="mt-6 flex items-center gap-5">
                <div>
                  <p className="text-sm text-brand-grey">Special price</p>
                  <p className="font-display text-4xl text-brand-red">
                    {formatRM(24.9)}{' '}
                    <span className="text-xl text-brand-grey line-through">{formatRM(32.9)}</span>
                  </p>
                </div>
                <Link
                  to="/menu/fc-signature-6pc"
                  className="rounded-full bg-brand-red px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-brand-yellow hover:text-charcoal"
                >
                  Order Now
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="animate-floaty overflow-hidden rounded-3xl shadow-2xl">
                <FoodImage
                  src={PRODUCTS[0].image}
                  alt="Honey glazed fried chicken"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: ChefHat, title: 'Secret Recipe', desc: 'Marinated 24 hours in our family recipe.' },
            { icon: Drumstick, title: 'Always Fresh', desc: 'Fried to order — never kept sitting.' },
            { icon: BadgePercent, title: 'Great Value', desc: 'Combos and family packs for every budget.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/30 text-brand-brown">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl text-charcoal">{title}</h3>
                <p className="mt-1 text-sm text-charcoal/60">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-yellow/25 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Reviews</p>
            <h2 className="font-display mt-1 text-4xl text-charcoal sm:text-5xl">WHAT CUSTOMERS SAY</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-card"
              >
                <Quote className="h-8 w-8 text-brand-red/30" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-charcoal/10 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red font-display text-lg text-white">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-charcoal">{t.name}</p>
                    <p className="text-xs text-charcoal/50">{t.role}</p>
                  </div>
                  <span className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-charcoal/20'}`}
                      />
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-5xl text-charcoal sm:text-6xl">
          HUNGRY? <span className="text-brand-red">LET'S GO!</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-charcoal/60">
          Order ahead and skip the queue — your chicken will be ready when you are.
        </p>
        <Link
          to="/menu"
          className="mt-8 inline-block rounded-full bg-charcoal px-10 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-1 hover:bg-brand-red"
        >
          Start Ordering
        </Link>
      </section>
    </div>
  )
}
