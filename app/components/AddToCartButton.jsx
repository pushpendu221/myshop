"use client";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/app/shop/cartStore";
export default function AddToCartButton({ product, className = "" }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  // clean up the timer if the button disappears
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer rounded-lg px-4 py-2.5 font-medium text-white transition-colors ${
        added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
