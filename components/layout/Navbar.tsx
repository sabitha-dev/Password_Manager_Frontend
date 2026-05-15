"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-700">Password Manager</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-semibold"
      >
        Logout
      </button>
    </div>
  );
}