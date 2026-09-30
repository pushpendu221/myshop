"use client";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/app/shop/cartStore";
import { getShipping } from "../shop/shopping";
import { useIsClient } from "../hooks/useIsClient";

const PAYMENT_METHODS = [
  {
    id: "bank",
    label: "Direct bank transfer",
    info: "Pay straight into our bank account. Your order ships once the money arrives.",
  },
  {
    id: "cod",
    label: "Cash on delivery",
    info: "Pay in cash when your order arrives.",
  },
  {
    id: "card",
    label: "Credit / debit card or UPI",
    info: "You'll pay securely online. (Connect Razorpay or Stripe here later.)",
  },
];

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
  ...rest
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={inputClass}
        {...rest}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const cart = useCartStore((s) => s.cart);
  const subtotal = useCartStore((s) => s.cartTotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const isClient = useIsClient();

  const [payment, setPayment] = useState("bank");
  const [order, setOrder] = useState(null); // filled after "Place order"

  if (!isClient) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-500">
        Loading checkout…
      </div>
    );
  }

  /* ---------- Thank-you screen ---------- */
  if (order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-green-800 font-medium">
          Thank you. Your order has been received.
        </div>

        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm bg-white rounded-2xl shadow-sm p-5">
          <div>
            <dt className="text-gray-500">Order number</dt>
            <dd className="font-bold">#{order.number}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Date</dt>
            <dd className="font-bold">{order.date}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Total</dt>
            <dd className="font-bold">${order.total.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Payment</dt>
            <dd className="font-bold">{order.paymentLabel}</dd>
          </div>
        </dl>

        <div className="mt-6 bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-3">Order details</h2>
          <ul className="divide-y text-sm">
            {order.items.map((i) => (
              <li key={i.id} className="flex justify-between py-2">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span>${(parseFloat(i.price) * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            We&apos;ll send a confirmation to <strong>{order.email}</strong> and
            ship to {order.address}.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-block mt-8 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  /* ---------- Empty cart ---------- */
  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Checkout is not available while your cart is empty.
        </h1>
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
  const selected = PAYMENT_METHODS.find((m) => m.id === payment);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));

    // TODO later: send `f`, `cart`, `payment` to your API / database here
    setOrder({
      number: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString(),
      total,
      paymentLabel: selected.label,
      items: cart,
      email: f.email,
      address: `${f.address}, ${f.city}, ${f.state} ${f.pin}`,
    });
    clearCart();
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-700 tracking-tight mb-8">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-5">
        {/* Billing details */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-5">
            Billing details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="First name"
              name="firstName"
              required
              autoComplete="given-name"
            />
            <Field
              label="Last name"
              name="lastName"
              required
              autoComplete="family-name"
            />
            <Field
              label="Company name (optional)"
              name="company"
              className="sm:col-span-2"
              autoComplete="organization"
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Country / Region <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                defaultValue="India"
                required
                className={inputClass}
              >
                <option>India</option>
                <option>Bangladesh</option>
                <option>Nepal</option>
                <option>United Kingdom</option>
                <option>United States</option>
              </select>
            </div>

            <Field
              label="Street address"
              name="address"
              required
              placeholder="House number and street name"
              className="sm:col-span-2"
              autoComplete="street-address"
            />
            <Field
              label="Town / City"
              name="city"
              required
              autoComplete="address-level2"
            />
            <Field
              label="State"
              name="state"
              required
              autoComplete="address-level1"
            />
            <Field
              label="PIN code"
              name="pin"
              required
              inputMode="numeric"
              autoComplete="postal-code"
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              required
              className="sm:col-span-2"
              autoComplete="email"
            />
          </div>

          <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">
            Additional information
          </h2>
          <label
            htmlFor="notes"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Order notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Notes about your order, e.g. special delivery instructions."
            className={inputClass}
          />
        </div>

        {/* Your order */}
        <aside className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your order</h2>

          <ul className="divide-y text-sm">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-12 w-12 rounded-md object-cover bg-gray-200 shrink-0"
                />
                <span className="flex-1 min-w-0 text-gray-800">
                  <span className="line-clamp-1">{item.name}</span>
                  <span className="text-gray-500">× {item.quantity}</span>
                </span>
                <span className="font-medium">
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="space-y-3 text-sm border-t pt-4 mt-1">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium">
                {shipping === 0 ? "Free" : `Flat rate: $${shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">${total.toFixed(2)}</dd>
            </div>
          </dl>

          {/* Payment methods */}
          <fieldset className="mt-6 space-y-2">
            <legend className="sr-only">Payment method</legend>
            {PAYMENT_METHODS.map((m) => (
              <label
                key={m.id}
                className={`block rounded-lg border p-3 cursor-pointer text-sm ${payment === m.id ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={payment === m.id}
                  onChange={() => setPayment(m.id)}
                  className="mr-2 accent-blue-600"
                />
                <span className="font-medium text-gray-800">{m.label}</span>
                {payment === m.id && (
                  <p className="mt-2 ml-6 text-gray-600">{m.info}</p>
                )}
              </label>
            ))}
          </fieldset>

          <p className="mt-4 text-xs text-gray-500">
            Your personal data will be used to process your order and for the
            purposes described in our privacy policy.
          </p>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 cursor-pointer"
          >
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}
