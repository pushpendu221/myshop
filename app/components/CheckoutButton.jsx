"use client";
import router from "next/router";
export default function CheckoutButton() {
  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <button
      className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
      type="button"
      onClick={handleCheckout}
    >
      Details
    </button>
  );
}
