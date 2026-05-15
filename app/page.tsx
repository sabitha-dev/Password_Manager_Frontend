import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-xl p-12 rounded-3xl border border-gray-200 shadow-xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight">
          Password Manager
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          Securely store your passwords using encryption and access them anytime.
          Simple, fast and safe.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="px-8 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold shadow-md"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-8 py-3 rounded-2xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-semibold shadow-sm"
          >
            Register
          </Link>
        </div>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
            <h2 className="font-semibold text-indigo-700">AES Encryption</h2>
            <p className="text-sm text-gray-600 mt-2">
              Passwords are stored securely using encryption.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
            <h2 className="font-semibold text-blue-700">JWT Security</h2>
            <p className="text-sm text-gray-600 mt-2">
              Secure login system with token authentication.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-green-50 border border-green-100">
            <h2 className="font-semibold text-green-700">Fast Access</h2>
            <p className="text-sm text-gray-600 mt-2">
              Quickly search and manage your saved passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}