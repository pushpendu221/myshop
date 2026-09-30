"use client";
import { useState } from "react";
import { useCartStore } from "@/app/shop/cartStore";
export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    // go back to normal after 1.5 seconds
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer px-4 py-2 rounded-lg font-medium text-white transition-colors ${
        added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
