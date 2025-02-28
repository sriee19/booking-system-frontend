import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";
import { useTheme } from "next-themes";

export default function UserSidebar() {
  const { theme } = useTheme();

  return (
    <aside
      className={`w-64 h-screen shadow-lg p-4 transition-colors ${
        theme === "dark" ? "bg-[#2D1B55] border-r border-[#4B0082] text-white" : "bg-[#E6E6FA] border-r border-[#D8BFD8] text-[#4B0082]"
      }`}
    >
      <nav className="flex flex-col space-y-4">
        <Link
          href="/book"
          className={`flex items-center space-x-2 p-2 rounded transition ${
            theme === "dark" ? "hover:bg-[#4B0082]" : "hover:bg-[#D8BFD8]"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Book</span>
        </Link>
        <Link
          href="/dashboard"
          className={`flex items-center space-x-2 p-2 rounded transition ${
            theme === "dark" ? "hover:bg-[#4B0082]" : "hover:bg-[#D8BFD8]"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </nav>
    </aside>
  );
}
