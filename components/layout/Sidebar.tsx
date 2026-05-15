"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-xl font-medium transition ${
      pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-indigo-50"
    }`;

  return (
    <div className="w-64 bg-white/70 backdrop-blur-xl border-r border-gray-200 p-5 min-h-screen">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="space-y-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Home
        </Link>

        <Link href="/dashboard/vault" className={linkClass("/dashboard/vault")}>
          Vault
        </Link>

        <Link
          href="/dashboard/vault/add"
          className={linkClass("/dashboard/vault/add")}
        >
          Add Password
        </Link>
      </div>
    </div>
  );
}