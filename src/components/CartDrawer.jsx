import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { DELIVERY_FEE, FREE_DELIVERY_ABOVE, formatRM } from '../data/products'

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, count, updateQty, removeItem } = useCart()
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-charcoal/50 animate-fade-in" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-2xl text-charcoal">
            <ShoppingBag className="h-5 w-5 text-brand-red" />
            YOUR CART ({count})
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-yellow/30">
              <ShoppingBag className="h-12 w-12 text-brand-brown" strokeWidth={1.5} />
            </div>
            <p className="font-display text-xl text-charcoal">Your cart is empty</p>
            <p className="text-sm text-charcoal/60">Looks like you haven't ordered yet.</p>
            <Link
              to="/menu"
              onClick={onClose}
              className="mt-2 rounded-full bg-brand-red px-6 py-2.5 text-sm font-bold text-white hover:bg-charcoal"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-charcoal/5 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-charcoal">{item.name}</p>
                        {item.option && (
                          <p className="text-xs text-brand-brown">{item.option}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 rounded-full p-1.5 text-charcoal/40 hover:bg-red-50 hover:text-brand-red"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full border border-charcoal/15">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-stone-100"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-stone-100"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-brand-red">
                        {formatRM(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-charcoal/10 bg-stone-50 px-5 py-4">
              {subtotal < FREE_DELIVERY_ABOVE && subtotal > 0 && (
                <p className="mb-2 rounded-lg bg-brand-yellow/40 px-3 py-2 text-xs font-semibold text-charcoal">
                  Add {formatRM(FREE_DELIVERY_ABOVE - subtotal)} more for FREE delivery!
                </p>
              )}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatRM(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'FREE' : formatRM(delivery)}</span>
                </div>
                <div className="flex justify-between border-t border-charcoal/10 pt-2 text-base font-bold text-charcoal">
                  <span>Total</span>
                  <span className="text-brand-red">{formatRM(subtotal + delivery)}</span>
                </div>
              </div>
              <Link
                to="/cart"
                onClick={onClose}
                className="mt-4 block rounded-full bg-brand-red py-3 text-center text-sm font-bold text-white transition-colors hover:bg-charcoal"
              >
                View Cart & Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
