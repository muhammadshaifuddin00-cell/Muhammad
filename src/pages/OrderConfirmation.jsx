import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, Clock, MapPin, Package } from 'lucide-react'
import { formatRM } from '../data/products'
import FoodImage from '../components/FoodImage'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const order = state?.order || JSON.parse(sessionStorage.getItem('hfc-last-order') || 'null')

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-charcoal">NO ORDER FOUND</h1>
        <Link to="/menu" className="mt-4 inline-block font-bold text-brand-red hover:underline">
          Back to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl bg-white p-8 text-center shadow-card sm:p-12">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </span>
        <h1 className="font-display mt-6 text-5xl text-charcoal">ORDER CONFIRMED!</h1>
        <p className="mt-2 text-charcoal/60">
          Terima kasih! Your order has been received (demo — no payment was processed).
        </p>
        <div className="mx-auto mt-6 w-fit rounded-2xl bg-brand-yellow/40 px-6 py-3">
          <p className="text-xs font-bold uppercase tracking-widest text-charcoal/60">Order ID</p>
          <p className="font-display text-2xl text-charcoal">{order.orderId}</p>
        </div>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
          <div className="rounded-xl bg-stone-50 p-4">
            <Clock className="h-5 w-5 text-brand-red" />
            <p className="mt-2 text-xs font-bold uppercase text-charcoal/50">Estimated Time</p>
            <p className="text-sm font-semibold text-charcoal">30–45 minutes</p>
          </div>
          <div className="rounded-xl bg-stone-50 p-4">
            <MapPin className="h-5 w-5 text-brand-red" />
            <p className="mt-2 text-xs font-bold uppercase text-charcoal/50">Fulfilment</p>
            <p className="text-sm font-semibold text-charcoal">
              {order.orderType === 'pickup' ? 'Self Pickup — Bangsar' : 'Home Delivery'}
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 p-4">
            <Package className="h-5 w-5 text-brand-red" />
            <p className="mt-2 text-xs font-bold uppercase text-charcoal/50">Payment</p>
            <p className="text-sm font-semibold text-charcoal">
              {order.payment === 'cod' ? 'Cash on Delivery' : order.payment === 'online-banking' ? 'Online Banking' : 'E-Wallet'}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mt-8 rounded-2xl border border-charcoal/10 p-5 text-left">
          <h2 className="font-display text-xl text-charcoal">YOUR ORDER</h2>
          <ul className="mt-3 divide-y divide-charcoal/10">
            {order.items.map((item) => (
              <li key={item.key} className="flex items-center gap-3 py-2.5">
                <FoodImage
                  src={item.image}
                  alt={item.name}
                  className="h-11 w-11 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-charcoal">{item.name}</p>
                  {item.option && <p className="text-xs text-brand-brown">{item.option}</p>}
                </div>
                <span className="text-xs text-charcoal/50">×{item.qty}</span>
                <span className="text-sm font-bold text-charcoal">{formatRM(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1 border-t border-charcoal/10 pt-3 text-sm">
            <div className="flex justify-between text-charcoal/70">
              <span>Subtotal</span><span>{formatRM(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Delivery</span><span>{order.orderType === 'pickup' ? 'FREE' : formatRM(order.delivery)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-charcoal">
              <span>Total</span><span className="text-brand-red">{formatRM(order.total)}</span>
            </div>
          </div>
        </div>

        {order.orderType === 'delivery' && (
          <p className="mt-6 text-sm text-charcoal/60">
            Delivering to: <span className="font-semibold text-charcoal">{order.address}</span>
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/menu"
            className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-charcoal"
          >
            Order Again
          </Link>
          <Link
            to="/"
            className="rounded-full border-2 border-charcoal/20 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-charcoal transition-colors hover:border-brand-red hover:text-brand-red"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
