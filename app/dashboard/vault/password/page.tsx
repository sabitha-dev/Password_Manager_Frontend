"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVault, getVaultById } from "../../../../features/vault/vaultApi";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import Modal from "../../../../components/ui/Modal";
import CopyButton from "../../../../components/ui/CopyButton";
import ProtectedRoute from "@/app/layout/ProtectedRoute";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../features/toast/toastSlice";

export default function VaultDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
const dispatch = useDispatch();
  const id = params.id as string;

  const [showModal, setShowModal] = useState(false);


  const { data, isLoading } = useQuery({
    queryKey: ["vaultDetails", id],
    queryFn: () => getVaultById(id),
  });

 const mutation = useMutation({
  mutationFn: () => deleteVault(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vaultList"] });

    dispatch(
      showToast({ message: "Password deleted successfully!", type: "success" })
    );

    setTimeout(() => {
      router.push("/dashboard/vault");
    }, 1000);
  },
  onError: () => {
    dispatch(showToast({ message: "Delete failed!", type: "error" }));
  },
});

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <p className="text-gray-600 font-medium">Loading password...</p>
      </div>
    );

  return (
    <ProtectedRoute>
      <DashboardLayout>

        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              {data.appName}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage saved password details
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
            <p className="text-sm text-indigo-700 font-semibold">Username</p>
            <p className="text-gray-800 font-medium mt-1">
              {data.loginUsername}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 p-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold shadow-md"
            >
              View Password
            </button>

            <button
              onClick={() => mutation.mutate()}
              className="flex-1 p-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition font-semibold shadow-md"
            >
              Delete
            </button>
          </div>

          <button
            onClick={() => router.push("/dashboard/vault")}
            className="w-full p-3 rounded-2xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-semibold"
          >
            Back to Vault
          </button>
        </div>

        {showModal && (
          <Modal title="Saved Password" onClose={() => setShowModal(false)}>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <p className="text-sm font-semibold text-blue-700">Password</p>
                <p className="text-gray-800 font-bold mt-1 tracking-wide">
                  {data.password}
                </p>
              </div>

              <div className="flex justify-end">
                <CopyButton text={data.password} />
              </div>
            </div>
          </Modal>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
