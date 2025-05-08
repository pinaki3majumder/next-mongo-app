"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    pwd: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const trimmedUserData = {
      userName: formData.userName.trim(),
      email: formData.email.trim(),
      pwd: formData.pwd.trim(),
    };

    try {
      // Simulate API call
      await axios.post("/api/users/signup", trimmedUserData);
      setMessage("🎉 Signup successful!");
      router.push("/login");
    } catch (error) {
      console.log("Signup error", error);
      setMessage("❌ Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="pwd"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full !mb-0 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Divider with OR */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-500 font-medium">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Go to Login Link */}
          <div className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </form>

        {message && (
          <div className="mt-6 text-center text-md font-medium text-green-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
