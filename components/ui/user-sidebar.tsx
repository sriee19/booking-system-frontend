import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";

export default function UserSidebar() {
  return (
    <aside className="w-64 h-screen bg-background shadow-lg p-4">
      <nav className="flex flex-col space-y-4">
        <Link href="/book" className="flex items-center space-x-2 p-2 text-primary hover:bg-gray-200 rounded">
          <LayoutDashboard className="w-5 h-5" />
          <span>Book</span>
        </Link>
        <Link href="/dashboard" className="flex items-center space-x-2 p-2 text-primary hover:bg-gray-200 rounded">
          <Users className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </nav>
    </aside>
  );
}
