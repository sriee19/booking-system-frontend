"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#E6E6FA] dark:bg-[#2D1B4D] shadow-md border-b border-[#D8BFD8] dark:border-[#4B0082]">
      {/* Left - Home Button */}
      <Link href="/home" className="flex items-center space-x-2 text-[#4B0082] hover:text-[#6A5ACD] dark:text-[#D8BFD8] dark:hover:text-[#C9A9D8]">
        <Home className="w-6 h-6" />
        <span className="hidden md:inline font-semibold">Home</span>
      </Link>

      {/* Right - Profile, Logout & Theme Toggle */}
      <div className="flex items-center space-x-4">
        <ThemeToggle /> {/* Theme toggle button */}

        {/* Profile Button */}
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center space-x-2 text-[#4B0082] hover:text-[#6A5ACD] dark:text-[#D8BFD8] dark:hover:text-[#C9A9D8]"
        >
          <User className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Profile</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={() => router.push("/auth/login")}
          className="flex items-center space-x-2 text-[#A020F0] hover:text-[#8A2BE2] dark:text-[#FFB6C1] dark:hover:text-[#FF69B4]"
        >
          <LogOut className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Logout</span>
        </button>
      </div>
    </nav>
  );
}
