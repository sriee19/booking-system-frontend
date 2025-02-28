"use client";

import { useState, useEffect } from "react";
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
import UserSidebar from "@/components/ui/user-sidebar";

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
      
      const res = await fetch(`${API_URL}/bookings/user`, {
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
  
      const res = await fetch(`${API_URL}/bookings/${selectedBooking.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: selectedBooking.name,
          email: selectedBooking.email,
          calendarDate: selectedBooking.calendarDate,
        }),
      });
  
      if (!res.ok) throw new Error("Failed to update booking");
  
      toast.success("Booking updated successfully!");
      setIsEditDialogOpen(false);
      fetchBookings(); // Refresh the bookings list
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
    <div className="min-h-screen flex">
      {/* Sidebar with fixed width */}
      <aside className="w-64 bg-background p-4">
        <UserSidebar />
      </aside>
  
      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="mt-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">My Bookings</CardTitle>
                  <CardDescription>Manage your consultation bookings</CardDescription>
                </div>
                <div className="relative flex-1 md:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Meeting Link</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    bookings.map((booking) => (
                      <TableRow key={booking.uid}>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.calendarDate}</TableCell>
                        <TableCell>
                          <a href={booking.fileurl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            <FileText className="mr-1 h-4 w-4" />
                            Join Meeting
                          </a>
                        </TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{booking.paymentStatus}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => openEditDialog(booking)}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(booking)}>Delete</Button>
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Booking</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input 
            type="text" 
            value={selectedBooking.name} 
            onChange={(e) => setSelectedBooking({ ...selectedBooking, name: e.target.value })} 
            placeholder="Enter name"
            className="mt-1"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input 
            type="email" 
            value={selectedBooking.email} 
            onChange={(e) => setSelectedBooking({ ...selectedBooking, email: e.target.value })} 
            placeholder="Enter email"
            className="mt-1"
          />
        </div>

        {/* Calendar Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Booking Date</label>
          <Input 
            type="date" 
            value={selectedBooking.calendarDate} 
            onChange={(e) => setSelectedBooking({ ...selectedBooking, calendarDate: e.target.value })} 
            className="mt-1"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
        <Button onClick={updateBooking}>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}

  
        {/* Delete Dialog */}
        {selectedBooking && (
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader><DialogTitle>Cancel Booking?</DialogTitle></DialogHeader>
              <DialogFooter>
                <Button onClick={deleteBooking}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
  
}
