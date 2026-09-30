"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];
export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the current sort value from the URL, default to 'featured'
  const currentSort = searchParams.get("sort") || "featured";

  const handleSortChange = (e) => {
    // 1. Grab current URL parameters
    const params = new URLSearchParams(searchParams.toString());

    // 2. Update the 'sort' parameter with the new dropdown value
    params.set("sort", e.target.value);

    // 3. Push the new URL to the browser (triggers a server re-render)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600">
      Sort by
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
