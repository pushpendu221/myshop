"use client";
import Link from "next/link";
import MiniCart from "./MiniCart";

export default function Navbar() {
  // Only re-renders when the number changes
  // const totalItems = useCartStore((state) => state.totalItems());

  // Prevent hydration errors by waiting for the component to mount on the client
  //const isMounted = useIsClient();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand Name */}
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 tracking-tight"
            >
              SAYAN
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md font-medium"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md font-medium"
            >
              Categories
            </Link>
          </div>

          <MiniCart />
        </div>
      </div>
    </nav>
  );
}
