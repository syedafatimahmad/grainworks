import { useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import OrderForm from './components/OrderForm'

import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'


function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [orderTotal, setOrderTotal] = useState(0)

  // Total items in cart for header badge
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Add to cart or increase quantity if item exists
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === product.size)
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === product.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Increase quantity
  const increaseQty = (id, size) => {
    setCart(prev =>
      prev.map(i =>
        i.id === id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
      )
    )
  }

  // Decrease quantity
  const decreaseQty = (id, size) => {
    setCart(prev =>
      prev
        .map(i =>
          i.id === id && i.size === size ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
    )
  }

  // Navigate pages
  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle clicking "Place order" in checkout
  const handlePlaceOrder = (form, grandTotal) => {
    setOrderTotal(grandTotal)
    setCurrentPage('orderForm')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />
      case 'products':
        return (
          <Products
            cart={cart}
            onAddToCart={handleAddToCart}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
          />
        )
      case 'contact':
        return <Contact />
      case 'cart':
        return (
          <Checkout
            cart={cart}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onPlaceOrder={handlePlaceOrder}
          />
        )
      case 'orderForm':
        return <OrderForm cart={cart} total={orderTotal} onNavigate={handleNavigate} />
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  return (
    <>
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
      />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </>
  )
}

export default App
