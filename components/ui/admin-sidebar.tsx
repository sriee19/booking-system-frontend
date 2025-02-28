import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";
import { useTheme } from "next-themes";

export default function AdminSidebar() {
  const { theme } = useTheme();

  return (
    <aside
      className={`w-64 h-screen shadow-lg p-4 border-r ${
        theme === "dark" ? "bg-[#2D1B55] border-[#4B0082] text-white" : "bg-[#E6E6FA] border-[#D8BFD8] text-[#4B0082]"
      }`}
    >
      <nav className="flex flex-col space-y-4">
        <Link
          href="/admin/board"
          className={`flex items-center space-x-2 p-2 rounded ${
            theme === "dark" ? "hover:bg-[#4B0082]" : "hover:bg-[#D8BFD8]"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/users"
          className={`flex items-center space-x-2 p-2 rounded ${
            theme === "dark" ? "hover:bg-[#4B0082]" : "hover:bg-[#D8BFD8]"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Users</span>
        </Link>
      </nav>
    </aside>
  );
}
