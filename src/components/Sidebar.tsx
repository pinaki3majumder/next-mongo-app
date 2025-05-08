"use client";

import { useState } from "react";
import { ArrowLeftToLine, LayoutDashboard, Menu, UserPen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleClientError } from "@/lib/errors/handleClientError";
import axios from "axios";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("🎉 Logout successful!");
      router.push("/login");
    } catch (error) {
      handleClientError(error);
    }
  };

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all ${
        collapsed ? "w-16" : "w-64"
      } duration-300`}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h1 className="text-lg font-bold">Admin</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          {collapsed ? <Menu size={20} /> : <ArrowLeftToLine size={20} />}
        </button>
      </div>
      <nav className="mt-6 space-y-2 px-4">
        {collapsed ? (
          <LayoutDashboard size={20} />
        ) : (
          <Link
            href="/dashboard"
            className="block py-2 hover:bg-gray-700 rounded hover:pl-1 transition-all duration-300"
          >
            Dashboard
          </Link>
        )}

        {collapsed ? (
          <UserPen size={20} />
        ) : (
          <Link
            href="/profile"
            className="block py-2 hover:bg-gray-700 rounded hover:pl-1 transition-all duration-300"
          >
            Profile
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer transition-all duration-300"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
