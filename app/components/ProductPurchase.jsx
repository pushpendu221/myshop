"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/app/shop/cartStore";

export default function ProductPurchase({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const clamp = (n) => Math.min(99, Math.max(1, n || 1));

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
  };

  return (
    <div>
      {added && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <span>“{product.name}” has been added to your cart.</span>
          <Link href="/cart" className="font-semibold underline">
            View cart
          </Link>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center border border-gray-300 rounded-lg">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty(clamp(qty - 1))}
            className="px-3 py-3 hover:bg-gray-100 cursor-pointer"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={qty}
            onChange={(e) => setQty(clamp(parseInt(e.target.value, 10)))}
            aria-label="Quantity"
            className="w-14 text-center py-3 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty(clamp(qty + 1))}
            className="px-3 py-3 hover:bg-gray-100 cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 sm:flex-none rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700 cursor-pointer"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
