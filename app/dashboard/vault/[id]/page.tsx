"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteVault,
  getVaultById,
  updateVault,
} from "../../../../features/vault/vaultApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import ProtectedRoute from "@/app/layout/ProtectedRoute";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../features/toast/toastSlice";
import CopyButton from "../../../../components/ui/CopyButton";
import { Eye, EyeOff } from "lucide-react";

export default function VaultDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const id = params.id as string;

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editAppName, setEditAppName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["vaultDetails", id],
    queryFn: () => getVaultById(id),
  });

  // Set default values when data loads
  useEffect(() => {
    if (data) {
      setEditAppName(data.appName);
      setEditUsername(data.loginUsername);
      setEditPassword(data.password);
      setEditNotes(data.notes || "");
    }
  }, [data]);

  const deleteMutation = useMutation({
    mutationFn: () => deleteVault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaultList"] });

      dispatch(showToast({ message: "Password deleted!", type: "success" }));

      setTimeout(() => {
        router.push("/dashboard/vault");
      }, 1000);
    },
    onError: () => {
      dispatch(showToast({ message: "Delete failed!", type: "error" }));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => updateVault(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaultDetails", id] });
      queryClient.invalidateQueries({ queryKey: ["vaultList"] });

      dispatch(showToast({ message: "Updated successfully!", type: "success" }));
      setIsEditing(false);
    },
    onError: () => {
      dispatch(showToast({ message: "Update failed!", type: "error" }));
    },
  });

  const handleSave = () => {
    if (
      editAppName === data.appName &&
      editUsername === data.loginUsername &&
      editPassword === data.password &&
      editNotes === (data.notes || "")
    ) {
      dispatch(showToast({ message: "No changes made!", type: "error" }));
      return;
    }

    updateMutation.mutate({
      appName: editAppName,
      loginUsername: editUsername,
      password: editPassword,
      notes: editNotes,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditAppName(data.appName);
    setEditUsername(data.loginUsername);
    setEditPassword(data.password);
    setEditNotes(data.notes || "");
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <p className="text-gray-600 font-medium">Loading password...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">Failed to load vault details</p>
      </div>
    );

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6 max-w-3xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              {isEditing ? "Edit Vault" : data.appName}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isEditing
                ? "Edit your password details and save changes"
                : "Manage saved password details"}
            </p>
          </div>

          {/* App Name */}
          <div className="p-5 rounded-2xl bg-green-50 border border-green-100">
            <p className="text-sm text-green-700 font-semibold">App Name</p>

            {isEditing ? (
              <input
                value={editAppName}
                onChange={(e) => setEditAppName(e.target.value)}
                className="w-full mt-2 p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-800 font-medium mt-1">{data.appName}</p>
            )}
          </div>

          {/* Username */}
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
            <p className="text-sm text-indigo-700 font-semibold">Username</p>

            {isEditing ? (
              <input
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="w-full mt-2 p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-800 font-medium mt-1">
                {data.loginUsername}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 space-y-3">
            <p className="text-sm text-blue-700 font-semibold">Password</p>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <input
                  type={showPassword ? "text" : "password"}
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              ) : (
                <p className="text-gray-800 font-bold tracking-wider flex-1">
                  {showPassword ? data.password : "••••••••••••••"}
                </p>
              )}

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-700" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <CopyButton text={isEditing ? editPassword : data.password} />
            </div>
          </div>

          {/* Notes */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-700 font-semibold">Notes</p>

            {isEditing ? (
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full mt-2 p-3 rounded-2xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ) : (
              <p className="text-gray-800 font-medium mt-1">
                {data.notes || "No notes"}
              </p>
            )}
          </div>

          {/* Buttons */}
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="flex-1 p-3 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition font-semibold shadow-md disabled:opacity-50"
              >
                {updateMutation.isPending ? "Saving..." : "Save"}
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 p-3 rounded-2xl bg-gray-500 text-white hover:bg-gray-600 transition font-semibold shadow-md"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 p-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold shadow-md"
              >
                Update
              </button>

              <button
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="flex-1 p-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition font-semibold shadow-md disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}

          <button
            onClick={() => router.push("/dashboard/vault")}
            className="w-full p-3 rounded-2xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-semibold"
          >
            Back to Vault
          </button>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}