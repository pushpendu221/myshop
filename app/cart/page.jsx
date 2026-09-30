"use client";
import Link from "next/link";
import { useCartStore } from "@/app/shop/cartStore";
import { getShipping } from "../shop/shopping";
import { useIsClient } from "../hooks/useIsClient";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const changeQuantity = useCartStore((s) => s.changeQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.cartTotal());
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-500">
        Loading your cart…
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Your cart is currently empty.
        </h1>
        <p className="mt-2 text-gray-500">
          Add something you like and it will show up here.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-6 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700"
        >
          Return to shop
        </Link>
      </div>
    );
  }

  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-700 tracking-tight">
          Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-600 cursor-pointer"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <ul className="lg:col-span-2 divide-y bg-white rounded-2xl shadow-sm h-fit">
          {cart.map((item) => (
            <li key={item.id} className="flex gap-4 p-4 sm:p-5 items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover bg-gray-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">
                  ${parseFloat(item.price).toFixed(2)} each
                </p>

                <div className="mt-2 inline-flex items-center border rounded-lg">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    aria-label={`Remove one ${item.name}`}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    aria-label={`Add one more ${item.name}`}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 text-sm text-gray-500 hover:text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <aside className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cart totals</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">${total.toFixed(2)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
