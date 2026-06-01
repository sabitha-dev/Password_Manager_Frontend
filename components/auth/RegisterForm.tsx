"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import api from "../../lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showToast } from "@/features/toast/toastSlice";
import { useDispatch } from "react-redux";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const dispatch = useDispatch();
const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await api.post("/register", {
      name,
      email,
      password,
    });

    const responseData = res.data;

    if (responseData?.message === "User created successfully!") {
      dispatch(
        showToast({
          message: responseData.message,
          type: "success",
        })
      );

      setTimeout(() => {
        router.push("/login");
      }, 1000);

      return;
    }
console.log(responseData,res);

    dispatch(
      showToast({
        message: responseData?.message || "Registration failed",
        type: "error",
      })
    );

  } catch (err: any)
   { 
    const backendData = err?.response?.data; const errorMessage = backendData?.data?.password || backendData?.message || "Registration failed";
     dispatch( showToast({ message: errorMessage, type: "error", }) );
     } 
     finally { setLoading(false); }
    
};
  return (
    <div className="w-full max-w-md">
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl border border-gray-200 p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Register to start saving passwords securely
          </p>
        </div>

      

        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"

          />

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
    className="absolute right-3 top-10 text-gray-500"
  >
    {showPassword ? "🙈" : "👁️"}
  </button>
</div>

          <Button text={loading ? "Registering..." : "Register"} type="submit" />
         <div className="pt-2">

         <p className="text-sm text-center text-gray-500">
  Already have an account?{" "}
  <Link
    href="/login"
    className="text-indigo-600 font-medium hover:underline"
  >
    Login
  </Link>
</p>
</div>
        </form>
      </div>
    </div>
  );
}