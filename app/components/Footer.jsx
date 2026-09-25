import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Sohaang
          </span>
          <p className="mt-4 text-sm text-gray-400">
            Premium products for your modern lifestyle. Quality guaranteed.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/shop" className="hover:text-white transition-colors">
                Shop All
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
            Legal
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Sohaang. All rights reserved.
      </div>
    </footer>
  );
}
