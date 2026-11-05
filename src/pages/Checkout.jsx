import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Banknote,
  Bike,
  CreditCard,
  Smartphone,
  Store,
  TriangleAlert,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { DELIVERY_FEE, FREE_DELIVERY_ABOVE, formatRM } from '../data/products'
import FoodImage from '../components/FoodImage'

const PAYMENTS = [
  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay cash when your order arrives', icon: Banknote },
  { id: 'online-banking', name: 'Online Banking', desc: 'FPX / internet banking (demo)', icon: CreditCard },
  { id: 'ewallet', name: 'E-Wallet', desc: 'TNG, GrabPay, Boost (demo)', icon: Smartphone },
]

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
  const total = subtotal + delivery

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    orderType: 'delivery',
    payment: 'cod',
  })
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (form.name.trim().length < 3) errs.name = 'Please enter your full name'
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim()))
      errs.phone = 'Please enter a valid phone number'
    if (form.orderType === 'delivery' && form.address.trim().length < 10)
      errs.address = 'Please enter a complete delivery address'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const placeOrder = (e) => {
    e.preventDefault()
    if (!validate()) return
    setPlacing(true)
    // Simulated order — no backend/payment processing.
    setTimeout(() => {
      const order = {
        ...form,
        items,
        subtotal,
        delivery,
        total,
        orderId: `HFC-${Date.now().toString(36).toUpperCase()}`,
        placedAt: new Date().toISOString(),
      }
      sessionStorage.setItem('hfc-last-order', JSON.stringify(order))
      clearCart()
      navigate('/order-confirmation', { state: { order } })
    }, 1200)
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-charcoal">NOTHING TO CHECKOUT</h1>
        <p className="mt-2 text-charcoal/60">Your cart is empty.</p>
        <Link
          to="/menu"
          className="mt-6 rounded-full bg-brand-red px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-charcoal"
        >
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display mb-8 text-5xl text-charcoal sm:text-6xl">CHECKOUT</h1>

      <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-3" noValidate>
        {/* Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer info */}
          <section className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl text-charcoal">CUSTOMER DETAILS</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-semibold text-charcoal/70">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="e.g. Ahmad bin Ali"
                  className={`w-full rounded-xl border bg-stone-50 px-4 py-3 text-sm outline-none transition-colors focus:bg-white ${
                    errors.name ? 'border-brand-red' : 'border-charcoal/15 focus:border-brand-red'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-brand-red">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-charcoal/70">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="e.g. 012-345 6789"
                  className={`w-full rounded-xl border bg-stone-50 px-4 py-3 text-sm outline-none transition-colors focus:bg-white ${
                    errors.phone ? 'border-brand-red' : 'border-charcoal/15 focus:border-brand-red'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-xs text-brand-red">{errors.phone}</p>}
              </div>
            </div>
          </section>

          {/* Order type + address */}
          <section className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl text-charcoal">ORDER TYPE</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { id: 'delivery', label: 'Delivery', icon: Bike, note: delivery === 0 ? 'FREE delivery!' : `${formatRM(delivery)} delivery fee` },
                { id: 'pickup', label: 'Self Pickup', icon: Store, note: 'Free — collect at Bangsar outlet' },
              ].map(({ id, label, icon: Icon, note }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, orderType: id }))}
                  className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                    form.orderType === id
                      ? 'border-brand-red bg-brand-red/5'
                      : 'border-charcoal/15 hover:border-charcoal/40'
                  }`}
                >
                  <Icon className={`mt-0.5 h-5 w-5 ${form.orderType === id ? 'text-brand-red' : 'text-charcoal/50'}`} />
                  <span>
                    <span className="block font-bold text-charcoal">{label}</span>
                    <span className="text-xs text-charcoal/60">{note}</span>
                  </span>
                </button>
              ))}
            </div>

            {form.orderType === 'delivery' ? (
              <div className="mt-4">
                <label htmlFor="address" className="mb-1 block text-sm font-semibold text-charcoal/70">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={form.address}
                  onChange={set('address')}
                  placeholder="Street, unit, postcode, city..."
                  className={`w-full rounded-xl border bg-stone-50 px-4 py-3 text-sm outline-none transition-colors focus:bg-white ${
                    errors.address ? 'border-brand-red' : 'border-charcoal/15 focus:border-brand-red'
                  }`}
                />
                {errors.address && <p className="mt-1 text-xs text-brand-red">{errors.address}</p>}
              </div>
            ) : (
              <div className="mt-4 rounded-xl bg-stone-100 p-4 text-sm text-charcoal/70">
                <p className="font-semibold text-charcoal">Pickup location:</p>
                <p>12, Jalan Telawi, Bangsar, 59100 Kuala Lumpur</p>
                <p className="mt-1 text-xs">We'll notify you when your order is ready for collection.</p>
              </div>
            )}
          </section>

          {/* Payment */}
          <section className="rounded-2xl bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl text-charcoal">PAYMENT METHOD</h2>
            <div className="mt-4 space-y-3">
              {PAYMENTS.map(({ id, name, desc, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, payment: id }))}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all ${
                    form.payment === id
                      ? 'border-brand-red bg-brand-red/5'
                      : 'border-charcoal/15 hover:border-charcoal/40'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${form.payment === id ? 'text-brand-red' : 'text-charcoal/50'}`} />
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-charcoal">{name}</span>
                    <span className="text-xs text-charcoal/60">{desc}</span>
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${
                      form.payment === id ? 'border-brand-red bg-brand-red' : 'border-charcoal/30'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-brand-yellow/30 px-4 py-3 text-xs text-charcoal/70">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-brown" />
              This is a demo checkout — no real payment will be processed and no
              order will be sent to the restaurant.
            </p>
          </section>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-2xl text-charcoal">ORDER SUMMARY</h2>
          <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <li key={item.key} className="flex items-center gap-3">
                <FoodImage
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-charcoal">{item.name}</p>
                  <p className="text-xs text-charcoal/50">Qty {item.qty}</p>
                </div>
                <span className="text-sm font-bold text-charcoal">
                  {formatRM(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
            <div className="flex justify-between text-charcoal/70">
              <span>Subtotal</span>
              <span>{formatRM(subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Delivery</span>
              <span>{form.orderType === 'pickup' || delivery === 0 ? 'FREE' : formatRM(delivery)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-charcoal">
              <span>Total</span>
              <span className="text-brand-red">
                {formatRM(subtotal + (form.orderType === 'pickup' ? 0 : delivery))}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={placing}
            className="mt-5 w-full rounded-full bg-brand-red py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-charcoal disabled:cursor-wait disabled:opacity-60"
          >
            {placing ? 'Placing Order...' : `Place Order — ${formatRM(subtotal + (form.orderType === 'pickup' ? 0 : delivery))}`}
          </button>
          <Link to="/cart" className="mt-3 block text-center text-xs font-semibold text-charcoal/50 hover:text-brand-red">
            ← Back to cart
          </Link>
        </div>
      </form>
    </div>
  )
}
