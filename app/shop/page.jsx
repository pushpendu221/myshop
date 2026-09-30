import { Suspense } from "react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import Link from "next/link";
import SortDropdown from "../components/SortDropdown";
import AddToCartButton from "../components/AddToCartButton";
import Image from "next/image";

export const metadata = { title: "Shop | My E-Commerce" };

// Each sort option -> the database ordering. The 2nd item breaks ties,
// so products with the same price/"featured" value never jump around.
const SORTS = {
  featured: [desc(products.isFeatured), desc(products.createdAt)],
  newest: [desc(products.createdAt)],
  price_asc: [asc(products.price), desc(products.createdAt)],
  price_desc: [desc(products.price), desc(products.createdAt)],
};

export default async function ShopPage({ searchParams }) {
  const { sort } = await searchParams; // Next.js 15: searchParams is a promise
  const orderBy = SORTS[sort] ?? SORTS.featured; // unknown ?sort=... falls back safely
  const activeProducts = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(...orderBy);

  return (
    <main className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              All Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Showing {activeProducts.length}{" "}
              {activeProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
          <Suspense fallback={null}>
            <SortDropdown />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeProducts.map((product) => {
            const price = parseFloat(product.price);
            const compare = product.compareAtPrice
              ? parseFloat(product.compareAtPrice)
              : null;
            const onSale = compare && compare > price; // real discount only
            const percentOff = onSale
              ? Math.round(((compare - price) / compare) * 100)
              : 0;

            // Send only what the cart needs (not the whole database row)
            const cartProduct = {
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              imageUrl: product.imageUrl,
            };

            return (
              <article
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image (also a link now) */}
                <Link
                  href={`/shop/${product.slug}`}
                  className="relative block aspect-4/3 overflow-hidden bg-gray-100"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={120}
                      height={120}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                  {onSale && (
                    <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                      -{percentOff}%
                    </span>
                  )}
                </Link>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/shop/${product.slug}`} className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </Link>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${price.toFixed(2)}
                    </span>
                    {onSale && (
                      <span className="text-sm text-gray-400 line-through">
                        ${compare.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <AddToCartButton
                    product={cartProduct}
                    className="mt-4 w-full"
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {activeProducts.length === 0 && (
          <div className="text-center py-24">
            <h2 className="text-lg font-semibold text-gray-900">
              No products found
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Check back later for new arrivals.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
