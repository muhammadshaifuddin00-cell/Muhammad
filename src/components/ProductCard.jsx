import { Link } from 'react-router-dom'
import { Plus, Star } from 'lucide-react'
import FoodImage from './FoodImage'
import { useCart } from '../context/CartContext'
import { formatRM } from '../data/products'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={`/menu/${product.id}`} className="relative block overflow-hidden">
        <FoodImage
          src={product.image}
          alt={product.name}
          className="group-hover-zoom aspect-[4/3] w-full object-cover"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
            {product.badge}
          </span>
        )}
        {product.compareAt && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-charcoal shadow">
            SAVE {formatRM(product.compareAt - product.price)}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/menu/${product.id}`}
            className="font-display text-lg leading-tight text-charcoal transition-colors hover:text-brand-red"
          >
            {product.name}
          </Link>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-brown">
            <Star className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
            {product.rating}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-charcoal/60">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-brand-red">{formatRM(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-charcoal/40 line-through">
                {formatRM(product.compareAt)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-white shadow transition-all hover:scale-110 hover:bg-charcoal active:scale-95"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
