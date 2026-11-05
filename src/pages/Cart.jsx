import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { DELIVERY_FEE, FREE_DELIVERY_ABOVE, formatRM } from '../data/products'
import FoodImage from '../components/FoodImage'

export default function Cart() {
  const { items, subtotal, updateQty, removeItem } = useCart()
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
  const total = subtotal + delivery

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-yellow/30">
          <ShoppingBag className="h-14 w-14 text-brand-brown" strokeWidth={1.5} />
        </div>
        <h1 className="font-display mt-6 text-4xl text-charcoal">YOUR CART IS EMPTY</h1>
        <p className="mt-2 max-w-sm text-charcoal/60">
          Your cart is feeling a little lonely. Go grab something crispy!
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-charcoal"
        >
          Browse Menu <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display mb-8 text-5xl text-charcoal sm:text-6xl">YOUR CART</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-charcoal/10 rounded-2xl bg-white shadow-card">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4 p-4 sm:p-5">
                <Link to={`/menu/${item.id}`} className="shrink-0">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/menu/${item.id}`}
                        className="font-semibold text-charcoal hover:text-brand-red"
                      >
                        {item.name}
                      </Link>
                      {item.option && (
                        <p className="text-xs font-semibold text-brand-brown">{item.option}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className="rounded-full p-2 text-charcoal/40 transition-colors hover:bg-red-50 hover:text-brand-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3 rounded-full border border-charcoal/15 px-2 py-1">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        aria-label="Decrease quantity"
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-stone-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center font-bold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        aria-label="Increase quantity"
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-stone-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-brand-red">
                      {formatRM(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/menu"
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-red hover:underline"
          >
            <ArrowRight className="h-4 w-4 rotate-180" /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-2xl text-charcoal">ORDER SUMMARY</h2>
          {subtotal < FREE_DELIVERY_ABOVE && (
            <div className="mt-3 rounded-xl bg-brand-yellow/40 px-4 py-3 text-sm font-semibold text-charcoal">
              Add {formatRM(FREE_DELIVERY_ABOVE - subtotal)} more for FREE delivery!
            </div>
          )}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-charcoal/70">
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>{formatRM(subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Delivery fee</span>
              <span>{delivery === 0 ? 'FREE' : formatRM(delivery)}</span>
            </div>
            <div className="flex justify-between border-t border-charcoal/10 pt-3 text-lg font-bold text-charcoal">
              <span>Total</span>
              <span className="text-brand-red">{formatRM(total)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-5 block rounded-full bg-brand-red py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-charcoal"
          >
            Proceed to Checkout
          </Link>
          <p className="mt-3 text-center text-xs text-charcoal/50">
            Secure checkout • Pay on delivery or online
          </p>
        </div>
      </div>
    </div>
  )
}
