"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6 p-4 bg-gray-100">
      <div className="text-lg font-semibold"></div>
      <div className="flex space-x-4 items-center">
        <Link
          href="/reports"
          className="text-blue-600 hover:underline"
        >
          Public Reports
        </Link>
        <Link
          href="/dashboard"
          className="text-blue-600 hover:underline"
        >
          Police Dashboard
        </Link>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Login
        </button>
      </div>
    </header>
  );
}
