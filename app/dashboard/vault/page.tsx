"use client";

import { useQuery } from "@tanstack/react-query";
import { getVaultList } from "../../../features/vault/vaultApi";
import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/layout/ProtectedRoute";

export default function VaultListPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["vaultList"],
    queryFn: getVaultList,
  });

  const filteredData =
    data?.filter((item: any) =>
      item.appName.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <ProtectedRoute>
      <DashboardLayout>
       <div className="bg-white/70 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-3xl border border-gray-200 shadow-xl">
<div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">Vault</h1>
              <p className="text-gray-500 text-sm mt-1">
                Search and manage your saved passwords
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard/vault/add")}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold shadow-md"
            >
              + Add New
            </button>
          </div>

          <input
            placeholder="Search by app name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6"
          />

          {isLoading && (
            <p className="text-gray-600 font-medium">Loading vault...</p>
          )}

          {error && (
            <p className="text-red-500 font-medium">Failed to load vault</p>
          )}

          {!isLoading && filteredData.length === 0 && (
            <p className="text-gray-500 text-center py-10">
              No passwords found.
            </p>
          )}

          {!isLoading && filteredData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 text-left">
                    <th className="p-4 font-semibold rounded-tl-2xl">App</th>
                    <th className="p-4 font-semibold">Username</th>
                    <th className="p-4 font-semibold rounded-tr-2xl">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((item: any) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-indigo-50/40 transition"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {item.appName}
                      </td>

                      <td className="p-4 text-gray-600">{item.loginUsername}</td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            router.push(`/dashboard/vault/${item.id}`)
                          }
                          className="px-4 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}