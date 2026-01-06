import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({
  product,
  cart,
  onAddToCart,
  onIncrease,
  onDecrease,
}) {
  const priceEntries = Object.entries(product.prices);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSize, setSelectedSize] = useState(priceEntries[0][0]);

  const selectedPrice = product.prices[selectedSize];

  const cartItem = (cart || []).find(
    i => i.id === product.id && i.size === selectedSize
  );

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  return (
    <div
      id={product.id}
      className="perspective-[1500px] h-[500px]"
      onClick={handleFlip}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-700
          [transform-style:preserve-3d] cursor-pointer
          md:hover:[transform:rotateY(180deg)]
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden rounded-3xl bg-white/85 backdrop-blur-xl border border-white/40 shadow-lg overflow-hidden">
          <div className="h-[250px] bg-white flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.alt || product.name}
              className="max-h-[200px] transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div className="p-8">
            <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-[#628141]/10 text-[#628141] border border-[#628141]/20">
              {product.tag}
            </span>

            <h3 className="text-2xl font-serif mt-4 text-[#2B2B2B]">
              {product.name}
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              {product.description}
            </p>

            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-3xl font-semibold text-[#2B2B2B]">
                Rs {selectedPrice}
              </span>
              <span className="text-gray-400">/ kg</span>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] backface-hidden rounded-3xl bg-white/85 backdrop-blur-xl border border-white/40 shadow-lg p-10">
          <h3 className="text-2xl font-serif text-[#2B2B2B]">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="flex gap-3 mt-6">
            {priceEntries.map(([size, price]) => (
              <button
                key={size}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`
                  flex-1 p-4 rounded-xl border-2 text-center transition
                  ${
                    selectedSize === size
                      ? "border-[#628141] bg-[#628141]/5"
                      : "border-[#628141]/20 hover:border-[#628141]/50"
                  }
                `}
              >
                <p className="font-semibold">{size}</p>
                <p className="text-[#628141] font-semibold">Rs {price}/-</p>
              </button>
            ))}
          </div>

          {/* ADD / QUANTITY CONTROLS */}
          {cartItem ? (
            <div
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-between mt-6 bg-[#628141]/10 rounded-xl px-4 py-2"
            >
              <button
                onClick={() => onDecrease(product.id, selectedSize)}
                className="text-xl font-bold px-3"
              >
                −
              </button>

              <span className="font-semibold">
                {cartItem.quantity}
              </span>

              <button
                onClick={() => onIncrease(product.id, selectedSize)}
                className="text-xl font-bold px-3"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={e => {
                e.stopPropagation();
                onAddToCart({
                  id: product.id,
                  name: product.name,
                  size: selectedSize,
                  price: Number(selectedPrice),
                  image: product.image,
                });
              }}
              className="w-full mt-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#628141] to-[#8BAE66] hover:-translate-y-1 transition shadow-lg"
            >
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              Add to Cart
            </button>
          )}

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mt-6 text-sm text-gray-500">
            {product.features.map(f => (
              <div key={f} className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-[#628141]" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
