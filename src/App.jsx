import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { CartProvider, useCart } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import About from './pages/About'
import Promotions from './pages/Promotions'
import Contact from './pages/Contact'

function Shell() {
  const [cartOpen, setCartOpen] = useState(false)
  const { count } = useCart()

  // Simple loading state on first paint
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-charcoal">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-red shadow-lift">
          <span className="font-display text-3xl text-white">H</span>
        </div>
        <p className="font-display mt-4 text-2xl tracking-widest text-brand-yellow">
          HUSIN FRIED CHICKEN
        </p>
        <div className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-brand-red" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Floating cart button (mobile) */}
      {count > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${count} items`}
          className="fixed bottom-5 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-brand-red px-5 text-white shadow-lift transition-transform hover:scale-105 lg:hidden"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm font-bold">{count}</span>
        </button>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Shell />
      </CartProvider>
    </BrowserRouter>
  )
}
