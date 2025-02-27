"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/ui/admin-sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { log } from "console";

type User = {
  uuid: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";
      
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      
      if (!res.ok) throw new Error("Failed to fetch users");

      const data: { users: User[] } = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching users");
    }
    setLoading(false);
  };

  const updateRole = async (uuid: string, newRole: string) => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";

      const res = await fetch(`${API_URL}/admin/${uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      toast.success("User role updated!");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error updating role");
    }
  };

  const deleteUser = async (uuid: string) => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";

      const res = await fetch(`${API_URL}/admin/${uuid}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      toast.success("User deleted!");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.uuid}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => updateRole(user.uuid, user.role === "admin" ? "user" : "admin")}>
                      Toggle Role
                    </Button>
                    <Button variant="destructive" onClick={() => deleteUser(user.uuid)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
