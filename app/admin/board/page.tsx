"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/ui/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Calendar, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Booking = {
  uid: string;
  userid: string;
  name: string;
  email: string;
  calendarDate: string;
  fileurl: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";
      
      const res = await fetch(`${API_URL}/bookings/book`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data: { bookings: Booking[] } = await res.json();
      setBookings(data.bookings);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching bookings");
    }
    setLoading(false);
  };

  const openEditDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setIsEditDialogOpen(true);
  };

  const updateBooking = async () => {
    if (!selectedBooking) return;
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";
      
      const res = await fetch(`${API_URL}/admin/book/${selectedBooking.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update booking");

      toast.success("Booking updated!");
      setIsEditDialogOpen(false);
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Error updating booking");
    }
  };

  const openDeleteDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  const deleteBooking = async () => {
    if (!selectedBooking) return;
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";
      
      const res = await fetch(`${API_URL}/bookings/${selectedBooking.uid}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete booking");

      toast.success("Booking canceled!");
      setIsDeleteDialogOpen(false);
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Error canceling booking");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#E6E6FA] to-[#D8BFD8] p-4">
      {/* Sidebar with fixed width */}
      <div className="w-64">
        <AdminSidebar />
      </div>
  
      {/* Main Content */}
      <div className="flex-1 container mx-auto max-w-6xl">
        <Card className="mt-8 bg-[#F4E1FF] shadow-lg border border-[#D8BFD8]">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-[#4B0082]">My Bookings</CardTitle>
                <CardDescription className="text-[#6A5ACD]">Manage your consultation bookings</CardDescription>
              </div>
              <div className="relative flex-1 md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B0082]" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-[#D8BFD8] text-[#4B0082]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Table>
              <TableHeader className="bg-[#E6E6FA]">
                <TableRow>
                  <TableHead className="text-[#4B0082]">Name</TableHead>
                  <TableHead className="text-[#4B0082]">Date</TableHead>
                  <TableHead className="text-[#4B0082]">Meeting Link</TableHead>
                  <TableHead className="text-[#4B0082]">Status</TableHead>
                  <TableHead className="text-[#4B0082]">Payment</TableHead>
                  <TableHead className="text-[#4B0082]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-[100px] bg-[#D8BFD8]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[100px] bg-[#D8BFD8]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[150px] bg-[#D8BFD8]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[80px] bg-[#D8BFD8]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[80px] bg-[#D8BFD8]" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-[100px] bg-[#D8BFD8]" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  bookings.map((booking) => (
                    <TableRow key={booking.uid}>
                      <TableCell>{booking.name}</TableCell>
                      <TableCell>{booking.calendarDate}</TableCell>
                      <TableCell>
                        <a href={booking.fileurl} target="_blank" rel="noopener noreferrer" className="text-[#4B0082] hover:underline">
                          <FileText className="mr-1 h-4 w-4" />
                          Join Meeting
                        </a>
                      </TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>{booking.paymentStatus}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-[#6A5ACD] text-[#4B0082] hover:bg-[#D8BFD8]" onClick={() => openEditDialog(booking)}>Edit</Button>
                        <Button size="sm" variant="destructive" className="bg-[#D8BFD8] text-white hover:bg-[#C9A9D8]" onClick={() => openDeleteDialog(booking)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  
      {/* Edit Dialog */}
      {selectedBooking && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#F4E1FF] border-[#D8BFD8]">
            <DialogHeader>
              <DialogTitle className="text-[#4B0082]">Edit Booking</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4B0082]">Name</label>
                <Input 
                  type="text" 
                  value={selectedBooking.name} 
                  disabled 
                  className="mt-1 border-[#D8BFD8] text-[#4B0082]"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-[#4B0082]">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="mt-1 block w-full border-[#D8BFD8] rounded-md shadow-sm text-[#4B0082]"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-[#6A5ACD] text-[#4B0082]" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button className="bg-[#6A5ACD] text-white hover:bg-[#4B0082]" onClick={updateBooking}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
  
      {/* Delete Dialog */}
      {selectedBooking && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-[#F4E1FF] border-[#D8BFD8]">
            <DialogHeader><DialogTitle className="text-[#4B0082]">Cancel Booking?</DialogTitle></DialogHeader>
            <DialogFooter>
              <Button className="bg-[#6A5ACD] text-white hover:bg-[#4B0082]" onClick={deleteBooking}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}  
