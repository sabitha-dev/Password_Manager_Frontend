"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import api from "../../lib/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showToast } from "../../features/toast/toastSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/login", { email, password });
      const token = res.data.data;
console.log(token,res,"res");

      dispatch(
        loginSuccess({
          token: token,
          userEmail: email,
        }),
      );

      dispatch(showToast({ message: "Login successful!", type: "success" }));

      router.replace("/dashboard");
    } catch (err: any) {
      dispatch(
        showToast({
          message: err?.response?.data?.message || "Login failed",
          type: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl border border-gray-200 p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-2">
            Login to access your secure vault
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter a email"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <Button text={loading ? "Logging in..." : "Login"} type="submit" />

          <div className="pt-2">
            <p className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
