import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SearchX } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Menu() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const [query, setQuery] = useState(params.get('q') || '')
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => category === 'all' || p.category === category)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }, [category, query, sort])

  const selectCategory = (id) => {
    if (id === 'all') params.delete('category')
    else params.set('category', id)
    setParams(params, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Our Menu</p>
        <h1 className="font-display mt-1 text-5xl text-charcoal sm:text-6xl">CHOOSE YOUR FAVOURITE</h1>
        <p className="mt-2 text-charcoal/60">Everything fried to order. Prices in Malaysian Ringgit.</p>
      </div>

      {/* Category pills */}
      <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          onClick={() => selectCategory('all')}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
            category === 'all'
              ? 'bg-brand-red text-white shadow'
              : 'bg-white text-charcoal/70 shadow-sm hover:bg-brand-yellow/40'
          }`}
        >
          All Items
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCategory(c.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              category === c.id
                ? 'bg-brand-red text-white shadow'
                : 'bg-white text-charcoal/70 shadow-sm hover:bg-brand-yellow/40'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            aria-label="Search dishes"
            className="w-full rounded-full border border-charcoal/15 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand-red"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sort" className="font-semibold text-charcoal/60">Sort:</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-charcoal/15 bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-brand-red"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white py-20 text-center shadow-sm">
          <SearchX className="h-12 w-12 text-charcoal/20" />
          <p className="font-display text-2xl text-charcoal">No dishes found</p>
          <p className="text-sm text-charcoal/60">Try a different search or category.</p>
          <button
            onClick={() => { setQuery(''); selectCategory('all') }}
            className="mt-2 rounded-full bg-brand-red px-6 py-2 text-sm font-bold text-white hover:bg-charcoal"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
