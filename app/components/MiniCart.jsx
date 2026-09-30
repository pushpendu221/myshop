"use client";
import Link from "next/link";
import { useCartStore } from "@/app/shop/cartStore";
import { useIsClient } from "../hooks/useIsClient";

export default function MiniCart() {
  const cart = useCartStore((s) => s.cart);
  const totalItems = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.cartTotal());
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const isClient = useIsClient();

  const items = isClient ? cart : [];
  const count = isClient ? totalItems : 0;

  return (
    // "group" lets the dropdown react when you hover (or tab into) the icon
    <div className="relative group">
      <Link
        href="/cart"
        aria-label={`Cart, ${count} items`}
        className="relative block p-2 text-gray-500 hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {count > 0 && (
          <span className="absolute top-0 right-0 min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold text-white bg-blue-600 rounded-full translate-x-1/4 -translate-y-1/4">
            {count}
          </span>
        )}
      </Link>

      {/* pt-2 keeps the hover alive while the mouse crosses the small gap */}
      <div className="hidden md:block invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-150 absolute right-0 top-full pt-2 w-80 z-50">
        <div className="bg-white border rounded-xl shadow-xl p-4">
          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">
              No products in the cart.
            </p>
          ) : (
            <>
              <ul className="max-h-72 overflow-y-auto divide-y">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 py-3 first:pt-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-14 w-14 rounded-md object-cover bg-gray-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.slug}`}
                        className="block text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="self-start text-gray-400 hover:text-red-600 text-lg leading-none cursor-pointer"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between border-t mt-2 pt-3 text-sm">
                <span className="font-medium text-gray-700">Subtotal:</span>
                <span className="font-bold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/cart"
                  className="text-center rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  className="text-center rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
