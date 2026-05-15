"use client";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Link from "next/link";
import ProtectedRoute from "../layout/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl border border-gray-200 shadow-xl">
          <h1 className="text-3xl font-bold text-indigo-700">
            Welcome to Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your saved passwords securely.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <Link
              href="/dashboard/vault"
              className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold text-indigo-700">Vault</h2>
              <p className="text-gray-600 text-sm mt-2">
                View all saved passwords
              </p>
            </Link>

            <Link
              href="/dashboard/vault/add"
              className="p-6 rounded-2xl bg-blue-50 border border-blue-100 hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold text-blue-700">Add Password</h2>
              <p className="text-gray-600 text-sm mt-2">
                Save a new password entry
              </p>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}