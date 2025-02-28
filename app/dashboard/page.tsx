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
import { Search,Calendar, FileText } from "lucide-react";
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

const lavenderBg = "bg-[#E6E6FA] dark:bg-[#2D1B5A]";
const lavenderText = "text-[#5D3FD3] dark:text-[#D8BFD8]";
const lavenderBorder = "border-[#B19CD9] dark:border-[#4B0082]";
const lavenderHover = "hover:bg-[#D8BFD8] dark:hover:bg-[#3E1C72]";

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

      const data = await res.json();
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
    <div className={`min-h-screen flex ${lavenderBg} text-gray-900 dark:text-gray-100`}>
      <aside className={`w-64 p-4 ${lavenderBg}`}> <UserSidebar /> </aside>
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-6xl">
          <Card className={`mt-8 ${lavenderBorder} border`}> 
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className={`text-2xl font-bold ${lavenderText}`}>My Bookings</CardTitle>
                  <CardDescription>Manage your consultation bookings</CardDescription>
                </div>
                <div className="relative flex-1 md:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search bookings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className={`${lavenderBg} ${lavenderText}`}>
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
                      <TableRow key={booking.uid} className={`${lavenderHover}`}>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.calendarDate}</TableCell>
                        <TableCell>
                          <a href={booking.fileurl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            <FileText className="mr-1 h-4 w-4" /> Join Meeting
                          </a>
                        </TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>{booking.paymentStatus}</TableCell>
                        <TableCell>
                          <Button size="sm" className={lavenderHover} variant="outline" onClick={() => openEditDialog(booking)}>Edit</Button>
                          <Button size="sm" className="bg-red-500 hover:bg-red-700 text-white" variant="destructive" onClick={() => openDeleteDialog(booking)}>Delete</Button>
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
    <DialogContent className="bg-lavender-900 dark:bg-lavender-900 text-gray-900 dark:text-gray-100">
      <DialogHeader>
        <DialogTitle className="text-lavender-700 dark:text-lavender-300">Edit Booking</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-lavender-700 dark:text-lavender-300">Name</label>
          <Input 
            type="text" 
            value={selectedBooking.name} 
            onChange={(e) => setSelectedBooking({ ...selectedBooking, name: e.target.value })} 
            placeholder="Enter name"
            className="mt-1 bg-lavender-50 dark:bg-lavender-800 text-gray-900 dark:text-gray-100 border-lavender-300 dark:border-lavender-600"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-lavender-700 dark:text-lavender-300">Email</label>
          <Input 
            type="email" 
            value={selectedBooking.email} 
            onChange={(e) => setSelectedBooking({ ...selectedBooking, email: e.target.value })} 
            placeholder="Enter email"
            className="mt-1 bg-lavender-50 dark:bg-lavender-800 text-gray-900 dark:text-gray-100 border-lavender-300 dark:border-lavender-600"
          />
        </div>

        {/* Calendar Date Input */}
        <div>
          <label className="block text-sm font-medium text-lavender-700 dark:text-lavender-300">Booking Date</label>
          <Input 
            type="date" 
            value={selectedBooking.calendarDate} 
            onChange={(e) => setSelectedBooking({ ...selectedBooking, calendarDate: e.target.value })} 
            className="mt-1 bg-lavender-50 dark:bg-lavender-800 text-gray-900 dark:text-gray-100 border-lavender-300 dark:border-lavender-600"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-lavender-500 text-lavender-700 dark:border-lavender-400 dark:text-lavender-300">Cancel</Button>
        <Button onClick={updateBooking} className="bg-lavender-500 dark:bg-lavender-700 text-white">Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}

{/* Delete Dialog */}
{selectedBooking && (
  <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
    <DialogContent className="bg-lavender-200 dark:bg-lavender-900 text-gray-900 dark:text-gray-100">
      <DialogHeader>
        <DialogTitle className="text-lavender-700 dark:text-lavender-300">Cancel Booking?</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={deleteBooking} className="bg-red-500 dark:bg-red-700 text-white">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}

      </main>
    </div>
  );
}
