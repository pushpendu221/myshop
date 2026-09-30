import ProductPurchase from "@/app/components/ProductPurchase";
import ProductTabs from "@/app/components/ProductTabs";
import { db } from "@/db";
import { products } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product] = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);

  if (!product) notFound();

  const related = await db
    .select()
    .from(products)
    .where(and(eq(products.isActive, true), ne(products.id, product.id)))
    .limit(4);

  const price = parseFloat(product.price);
  const compare = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const onSale = compare && compare > price;
  const percentOff = onSale
    ? Math.round(((compare - price) / compare) * 100)
    : 0;

  // Only send what the cart needs to the client component
  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    imageUrl: product.imageUrl,
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-blue-600">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          {onSale && (
            <span className="absolute top-4 left-4 rounded bg-red-500 px-3 py-1 text-sm font-bold text-white">
              Sale!
            </span>
          )}
        </div>

        {/* Summary */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            {onSale && (
              <span className="text-xl text-gray-400 line-through">
                ${compare.toFixed(2)}
              </span>
            )}
            <span className="text-3xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {onSale && (
              <span className="rounded bg-red-50 px-2 py-0.5 text-sm font-semibold text-red-600">
                Save {percentOff}%
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed line-clamp-4">
            {product.description}
          </p>

          <div className="mt-8">
            <ProductPurchase product={cartProduct} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <ProductTabs description={product.description} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related products
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="group rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover group-hover:opacity-90"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-bold text-gray-900">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
