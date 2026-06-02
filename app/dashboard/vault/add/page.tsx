"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVault } from "../../../../features/vault/vaultApi";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import ProtectedRoute from "@/app/layout/ProtectedRoute";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../features/toast/toastSlice";

export default function AddVaultPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
const dispatch = useDispatch();
  const [appName, setAppName] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");

 const mutation = useMutation({
  mutationFn: addVault,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vaultList"] });

    dispatch(
      showToast({ message: "Password saved successfully!", type: "success" })
    );

    setTimeout(() => {
      router.push("/dashboard/vault");
    }, 1000);
  },
  onError: () => {
    dispatch(showToast({ message: "Failed to save password!", type: "error" }));
  },
});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ appName, loginUsername, password, notes });
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>

      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl p-5 sm:p-8 lg:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6">
          <div>
<h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">       
              Add New Password
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Save a new password entry securely
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-600">
                App Name
              </label>
              <input
                className="w-full mt-2 p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Example: Gmail"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Login Username
              </label>
              <input
                className="w-full mt-2 p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email / Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                className="w-full mt-2 p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Notes (Optional)
              </label>
              <textarea
                className="w-full mt-2 p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Example: Office account"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              disabled={mutation.isPending}
              className="w-full p-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold shadow-md disabled:opacity-50"
            >
              {mutation.isPending ? "Saving..." : "Save Password"}
            </button>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
