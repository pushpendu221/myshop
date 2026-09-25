import Link from "next/link";

export default function Navbar() {
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

          {/* Cart Icon Placeholder */}
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-900 p-2 relative">
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
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
