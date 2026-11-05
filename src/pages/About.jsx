import { Link } from 'react-router-dom'
import { ArrowRight, Award, HeartHandshake, Leaf, Users } from 'lucide-react'
import FoodImage from '../components/FoodImage'
import { PRODUCTS } from '../data/products'

const values = [
  { icon: Award, title: 'Quality First', desc: 'Every piece of chicken meets our strict freshness standards — marinated, coated and fried with care.' },
  { icon: HeartHandshake, title: 'Customer Love', desc: 'We treat every order like it is for family. Friendly service, hot food, happy customers.' },
  { icon: Leaf, title: 'Honest Ingredients', desc: 'No MSG, no shortcuts — just real chicken, real spices and real flavour.' },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Our Story</p>
          <h1 className="font-display mt-2 max-w-3xl text-5xl leading-none sm:text-7xl">
            FROM A SMALL STALL TO <span className="text-brand-yellow">MALAYSIA'S FAVOURITE</span>
          </h1>
          <p className="mt-4 max-w-2xl text-brand-grey">
            Husin Fried Chicken began in 2015 as a humble roadside stall in Bangsar.
            Today, HFC serves thousands of happy customers every week — all united
            by one obsession: the perfect piece of fried chicken.
          </p>
        </div>
      </section>

      {/* Story + image */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-4xl text-charcoal sm:text-5xl">OUR BACKGROUND</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-charcoal/70">
            <p>
              What started as a family recipe passed down through generations became
              HFC's signature 24-hour marinade — a blend of Malaysian spices,
              buttermilk and a secret touch we will never reveal.
            </p>
            <p>
              Every morning, our chefs prepare fresh batter and marinate the chicken
              by hand. We fry to order, never in bulk, so every piece that reaches
              you is shatteringly crispy outside and bursting with juices inside.
            </p>
            <p>
              From our first stall to multiple outlets and this online ordering
              platform, our mission remains the same: serve food we would proudly
              feed our own families.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-brand-yellow/30 p-4">
            <Users className="h-8 w-8 shrink-0 text-brand-brown" />
            <p className="text-sm font-semibold text-charcoal">
              Over <span className="text-brand-red">50,000</span> orders served and
              counting — terima kasih, Malaysia!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FoodImage
            src={PRODUCTS[0].image}
            alt="HFC fried chicken"
            className="aspect-[3/4] w-full rounded-3xl object-cover shadow-card"
          />
          <FoodImage
            src={PRODUCTS[14].image}
            alt="HFC chicken meal"
            className="mt-8 aspect-[3/4] w-full rounded-3xl object-cover shadow-card"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-yellow/25 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">OUR VALUES</h2>
            <p className="mt-2 text-charcoal/60">What makes HFC different</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white p-7 shadow-card">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="font-display mt-4 text-2xl text-charcoal">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl text-charcoal sm:text-5xl">TASTE THE DIFFERENCE</h2>
        <Link
          to="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-red px-10 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-1 hover:bg-charcoal"
        >
          Order Now <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
