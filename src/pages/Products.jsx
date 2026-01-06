import ProductCard from "../components/ProductCard"
import { PRODUCTS } from "../data/products"

export default function Products({ cart, onAddToCart, onIncrease, onDecrease }) {
  return (
    <section id="products" className="text-[#2B2B2B]">
      {/* Hero Section */}
      <section className="pt-48 pb-24 text-center px-6 bg-[#f4efe3]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Our Prestigious Staples
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Four essential products, prepared with meticulous attention to purity and quality.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 py-24 pb-24 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {Object.values(PRODUCTS).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              onAddToCart={onAddToCart}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
        </div>
      </section>
    </section>
  )
}
