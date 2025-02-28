"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/ui/admin-sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type User = {
  uuid: string;
  name: string;
  email: string;
  role: string;
};

const lavenderBg = "bg-[#E6E6FA] dark:bg-[#2D1B5A]";
const lavenderText = "text-[#5D3FD3] dark:text-[#D8BFD8]";
const lavenderBorder = "border-[#B19CD9] dark:border-[#4B0082]";
const lavenderHover = "hover:bg-[#D8BFD8] dark:hover:bg-[#3E1C72]";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<string>("");
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

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

      if (!res.ok) throw new Error("Failed to fetch users");

      const { users } = await res.json();
      setUsers(users);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error fetching users");
      setUsers([]);
    }
    setLoading(false);
  };

  const updateRole = async () => {
    if (!selectedUser || !newRole) return;
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";

      const res = await fetch(`${API_URL}/admin/${selectedUser.uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      toast.success("User role updated!");
      fetchUsers();
    } catch (error) {
      console.error("Update Role Error:", error);
      toast.error("Error updating role");
    }
    setSelectedUser(null);
  };

  const deleteUser = async () => {
    if (!deleteUserId) return;
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";

      const res = await fetch(`${API_URL}/admin/${deleteUserId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      toast.success("User deleted!");
      fetchUsers();
    } catch (error) {
      console.error("Delete User Error:", error);
      toast.error("Error deleting user");
    }
    setDeleteUserId(null);
  };

  return (
    <div className={`flex ${lavenderBg} min-h-screen`}>
      <AdminSidebar />
      <main className={`flex-1 p-6 shadow-lg border ${lavenderBorder}`}>
        <h2 className={`text-2xl font-bold mb-4 ${lavenderText}`}>Manage Users</h2>
        <Table>
          <TableHeader className={lavenderBg}>
            <TableRow>
              <TableHead className={lavenderText}>Name</TableHead>
              <TableHead className={lavenderText}>Email</TableHead>
              <TableHead className={lavenderText}>Role</TableHead>
              <TableHead className={lavenderText}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className={lavenderText}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className={lavenderText}>
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.uuid} className={lavenderHover}>
                  <TableCell className={lavenderText}>{user.name}</TableCell>
                  <TableCell className={lavenderText}>{user.email}</TableCell>
                  <TableCell className={lavenderText}>{user.role}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className={lavenderHover} onClick={() => setSelectedUser(user)}>
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Update Role</DialogTitle>
                        <DialogDescription>Select a new role for {selectedUser?.name}</DialogDescription>
                        <Select value={newRole} onValueChange={setNewRole}>
                          <SelectTrigger className={lavenderBorder}>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                        <DialogFooter>
                          <Button onClick={updateRole} disabled={!newRole}>Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-red-500 hover:bg-red-700 text-white" onClick={() => setDeleteUserId(user.uuid)}>
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete {user.name}? This action cannot be undone.
                        </DialogDescription>
                        <DialogFooter>
                          <Button variant="destructive" onClick={deleteUser}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
