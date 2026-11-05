import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import { getProduct, getCategoryName, formatRM } from '../data/products'
import { useCart } from '../context/CartContext'
import FoodImage from '../components/FoodImage'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [option, setOption] = useState(product?.options?.[0]?.name || null)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="font-display text-4xl text-charcoal">Dish not found</p>
        <Link to="/menu" className="mt-4 inline-block text-brand-red font-bold hover:underline">
          Back to Menu
        </Link>
      </div>
    )
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  const handleAdd = () => {
    addItem(product, qty, option)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/menu"
        className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-charcoal/60 hover:text-brand-red"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Menu
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-3xl shadow-card">
          <FoodImage
            src={product.image}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-brand-yellow/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-charcoal">
            {getCategoryName(product.category)}
          </span>
          <h1 className="font-display mt-3 text-4xl leading-tight text-charcoal sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 font-semibold text-brand-brown">
              <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
              {product.rating}
            </span>
            <span className="text-charcoal/40">•</span>
            <span className="text-charcoal/60">Fried fresh to order</span>
          </div>
          <p className="mt-4 leading-relaxed text-charcoal/70">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl text-brand-red">{formatRM(product.price)}</span>
            {product.compareAt && (
              <span className="text-xl text-charcoal/40 line-through">
                {formatRM(product.compareAt)}
              </span>
            )}
          </div>

          {/* Options */}
          {product.options && (
            <div className="mt-6">
              <p className="text-sm font-bold uppercase tracking-wide text-charcoal/70">Choose flavour</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.options.map((o) => (
                  <button
                    key={o.name}
                    onClick={() => setOption(o.name)}
                    className={`rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all ${
                      option === o.name
                        ? 'border-brand-red bg-brand-red/10 text-brand-red'
                        : 'border-charcoal/15 text-charcoal/70 hover:border-charcoal/40'
                    }`}
                  >
                    {o.name}
                    {o.price > 0 && ` (+${formatRM(o.price)})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-3 rounded-full border-2 border-charcoal/15 px-2 py-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-stone-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all ${
                added ? 'bg-emerald-600' : 'bg-brand-red hover:bg-charcoal'
              }`}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" /> Add to Cart — {formatRM((product.price + (product.options?.find(o => o.name === option)?.price || 0)) * qty)}
                </>
              )}
            </button>
            <button
              onClick={() => { addItem(product, qty, option); navigate('/cart') }}
              className="rounded-full border-2 border-charcoal/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-charcoal transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-charcoal/50">
            <span>• Halal certified</span>
            <span>• No MSG added</span>
            <span>• Available for delivery & pickup</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl text-charcoal sm:text-4xl">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
