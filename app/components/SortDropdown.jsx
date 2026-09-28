"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the current sort value from the URL, default to 'featured'
  const currentSort = searchParams.get("sort") || "featured";

  const handleSortChange = (e) => {
    // 1. Grab current URL parameters
    const params = new URLSearchParams(searchParams);

    // 2. Update the 'sort' parameter with the new dropdown value
    params.set("sort", e.target.value);

    // 3. Push the new URL to the browser (triggers a server re-render)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={handleSortChange}
      className="border-gray-300 rounded-md text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500 py-2 pl-3 pr-10 shadow-sm cursor-pointer bg-white"
    >
      <option value="featured">Sort by: Featured</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
    </select>
  );
}
