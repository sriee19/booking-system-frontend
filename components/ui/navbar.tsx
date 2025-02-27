"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background shadow-md">
      {/* Left - Home Button */}
      <Link href="/home" className="flex items-center space-x-2 text-primary">
        <Home className="w-6 h-6" />
        <span className="hidden md:inline font-semibold">Home</span>
      </Link>

      {/* Right - Profile, Logout & Theme Toggle */}
      <div className="flex items-center space-x-4">
        <ThemeToggle /> {/* Theme toggle button */}

        {/* Profile Button */}
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center space-x-2 text-primary"
        >
          <User className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Profile</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={() => router.push("/auth/logout")}
          className="flex items-center space-x-2 text-red-500"
        >
          <LogOut className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Logout</span>
        </button>
      </div>
    </nav>
  );
}
