import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import Link from "next/link";
import SortDropdown from "../components/SortDropdown";
import CheckoutButton from "../components/CheckoutButton";

export default async function ShopPage({ searchParams }) {
  // 1. AWAIT the searchParams promise (Next.js 15 requirement)
  const resolvedParams = await searchParams;
  // 1. Read the sort parameter from the URL
  const sort = resolvedParams.sort || "featured";

  // 2. Determine the Drizzle sorting logic based on the parameter
  let orderByClause;
  switch (sort) {
    case "price_asc":
      orderByClause = asc(products.price);
      break;
    case "price_desc":
      orderByClause = desc(products.price);
      break;
    case "newest":
      orderByClause = desc(products.createdAt);
      break;
    case "featured":
    default:
      orderByClause = desc(products.isFeatured);
      break;
  }
  // console.log("SORT PARAMETER:", sort);
  const activeProducts = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(orderByClause);

  //console.log("ACTIVE PRODUCTS:", activeProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-700 tracking-tight">
          All Products
        </h1>

        {/* Simple mock filter dropdown */}
        <div className="mt-4 md:mt-0">
          <SortDropdown />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {activeProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Image Container */}
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-90 transition-opacity h-64">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
              {product.compareAtPrice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Sale
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="p-5 flex flex-col flex-grow">
              <Link
                href={`/shop/${product.slug}`}
                className="block mt-1 flex-grow"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </Link>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.compareAtPrice}
                    </span>
                  )}
                </div>

                {/* Reusing your existing Checkout Button */}
                <CheckoutButton product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Fallback */}
      {activeProducts.length === 0 && (
        <div className="text-center py-20">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later for new arrivals.
          </p>
        </div>
      )}
    </div>
  );
}
