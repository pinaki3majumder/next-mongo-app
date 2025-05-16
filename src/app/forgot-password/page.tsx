"use client";

import { handleClientError } from "@/lib/errors/handleClientError";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type EmailFormData = {
  email: string;
};

type PasswordFormData = {
  password: string;
  confirmPassword: string;
};

const ForgotPassword = () => {
  const router = useRouter();

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    console.log("useEffect 1");

    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // Form 1: Forgot Password (Email input)
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
    trigger: triggerEmail,
  } = useForm<EmailFormData>({ mode: "onTouched" });

  const onSubmitEmail = async (data: EmailFormData) => {
    try {
      // Simulate login API call
      const res = await axios.post("/api/users/forgot-password", {
        email: data.email.trim(),
      });
      setSubmitted(false);

      const resData = await res;
      console.log("data-", resData);
      toast.success(`🎉 ${resData.data.message}`);
      router.push("/login");
    } catch (error) {
      handleClientError(error);
    }
  };

  // Form 2: Reset Password (Password + Confirm Password)
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    trigger: triggerPassword,
    watch,
  } = useForm<PasswordFormData>({ mode: "onTouched" });

  const onSubmitPassword = async (data: PasswordFormData) => {
    console.log("Password submitted:", data);
    // Trigger password reset API here

    try {
      const res = await axios.post("/api/users/forgot-password", {
        confirmPassword: data.confirmPassword.trim(),
        token,
      });
      const resData = await res;
      console.log("pwd res data-", resData);
      toast.success(`🎉 ${resData.data.message}`);
      router.push("/login");
    } catch (error) {
      handleClientError(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {token ? (
        <form
          onSubmit={handleSubmitPassword(onSubmitPassword)}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
          noValidate
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Reset Password
          </h2>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-gray-700">
              New Password
            </label>
            <input
              id="password"
              type="password"
              {...registerPassword("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
              onBlur={() => triggerPassword("password")}
              className={`w-full px-4 py-2 border ${
                passwordErrors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {passwordErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...registerPassword("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              onBlur={() => triggerPassword("confirmPassword")}
              className={`w-full px-4 py-2 border ${
                passwordErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmittingPassword}
            className={`w-full py-2 px-4 rounded text-white ${
              isSubmittingPassword
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmittingPassword ? "Submitting..." : "Reset Password"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmitEmail(onSubmitEmail)}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
          noValidate
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Forgot Password
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...registerEmail("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full px-4 py-2 border ${
                emailErrors.email ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="you@example.com"
              onBlur={() => triggerEmail("email")} // trigger validation on blur
            />
            {emailErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {emailErrors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmittingEmail || submitted}
            className={`w-full py-2 px-4 rounded text-white ${
              isSubmittingEmail || submitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmittingEmail ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
