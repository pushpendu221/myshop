"use client";
import { useRouter } from "next/navigation";
export default function CheckoutButton({ product }) {
  const router = useRouter();
  const handleCheckout = () => {
    console.log("Proceeding to checkout...", product);
    router.push(`/shop/${product.slug}`);
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="rounded-lg bg-black px-6 py-3 font-medium text-white cursor-pointer hover:bg-gray-800"
    >
      View Details
    </button>
  );
}
