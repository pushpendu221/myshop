"use client";
import { useState } from "react";

export default function ProductTabs({ description }) {
  const [tab, setTab] = useState("description");

  const tabClass = (name) =>
    `px-5 py-3 text-sm font-medium border-b-2 -mb-px cursor-pointer ${
      tab === name
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-800"
    }`;

  return (
    <div>
      <div role="tablist" className="flex border-b">
        <button
          role="tab"
          aria-selected={tab === "description"}
          onClick={() => setTab("description")}
          className={tabClass("description")}
        >
          Description
        </button>
        <button
          role="tab"
          aria-selected={tab === "reviews"}
          onClick={() => setTab("reviews")}
          className={tabClass("reviews")}
        >
          Reviews (0)
        </button>
      </div>

      <div
        role="tabpanel"
        className="py-6 max-w-3xl text-gray-700 leading-relaxed"
      >
        {tab === "description" ? (
          <p className="whitespace-pre-line">
            {description || "No description yet."}
          </p>
        ) : (
          <p className="text-gray-500">There are no reviews yet.</p>
        )}
      </div>
    </div>
  );
}
