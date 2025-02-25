"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { FiSearch, FiFilter, FiTrash2, FiUser, FiHome, FiLogOut, FiGrid } from "react-icons/fi";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useAuth } from "@/hooks/use-toast";
import FloatingNav from "@/components/ui/floating-navbar";

const navItems = [
  {
    name: "Home",
    alternateText: "Home",
    link: "/",
    icon: <FiHome className="h-4 w-4" />,
  },
  {
    name: "Profile",
    alternateText: "Profile",
    link: "/profile",
    icon: <FiUser className="h-4 w-4" />,
  },
  {
    name: "Book Now",
    alternateText: "Book Now",
    link: "/booking",
    icon: <FiUser className="h-4 w-4" />,
  },    
  {
    name: "Dashboard",
    alternateText: "Dashboard",
    link: "/dashboard",
    icon: <FiGrid className="h-4 w-4" />,
  },
  {
    name: "Logout",
    alternateText: "Logout",
    link: "/",
    icon: <FiLogOut className="h-4 w-4" />,
  },
];

interface Booking {
  id: number;
  date: string;
  time: string;
  type: string;
  status: "Completed" | "Upcoming" | "Cancelled";
}

const ITEMS_PER_PAGE = 10;

// Mock data for development
const mockBookings: Booking[] = [
  {
    id: 1,
    date: "2024-03-20",
    time: "10:00 AM",
    type: "General Consultation",
    status: "Upcoming"
  },
  {
    id: 2,
    date: "2024-03-19",
    time: "2:30 PM",
    type: "Follow-up",
    status: "Completed"
  },
  {
    id: 3,
    date: "2024-03-18",
    time: "11:00 AM",
    type: "Emergency",
    status: "Cancelled"
  },
  {
    id: 4,
    date: "2024-03-17",
    time: "9:00 AM",
    type: "Follow-up",
    status: "Upcoming"
  },
  {
    id: 5,
    date: "2024-03-16",
    time: "10:00 AM",
    type: "General Consultation",
    status: "Upcoming"
  },
  {
    id: 6,
    date: "2024-03-15",
    time: "11:00 AM",
    type: "Emergency",
    status: "Cancelled"
  }

];

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<"date" | "type">("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings(mockBookings);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  // Filter and sort bookings
  const filteredAndSortedBookings = React.useMemo(() => {
    return bookings
      .filter((booking: Booking) => 
        (statusFilter === "all" || booking.status === statusFilter) &&
        (booking.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
         booking.date.includes(searchTerm))
      )
      .sort((a: Booking, b: Booking) => {
        if (sortField === "date") {
          return isAscending 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return isAscending
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      });
  }, [bookings, statusFilter, searchTerm, sortField, isAscending]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredAndSortedBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev: Booking[]) => prev.filter(booking => booking.id !== id));
    }
  };

  const handleStatusChange = async (id: number, newStatus: "Cancelled") => {
    setBookings((prev: Booking[]) => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 px-6 py-10 text-gray-800">
      <div className="container mx-auto space-y-6">
 
       <Card className="bg-white border border-purple-300 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-purple-200 flex items-center justify-center">
                <FiUser className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">{user?.name || 'User'}</CardTitle>
                <CardDescription className="text-gray-500">{user?.email || 'user@example.com'}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400">Total Bookings</h3>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400">Upcoming</h3>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === "Upcoming").length}</p>
              </div>
              <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                <h3 className="text-sm font-medium text-gray-400">Completed</h3>
                <p className="text-2xl font-bold">{bookings.filter(b => b.status === "Completed").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="bg-white border border-purple-300 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking History</CardTitle>
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-300"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.time}</TableCell>
                      <TableCell>{booking.type}</TableCell>
                      <TableCell>
                        <Badge className={
                          booking.status === "Completed" ? "bg-green-200 text-green-700" : 
                          booking.status === "Upcoming" ? "bg-blue-200 text-blue-700" : 
                          "bg-red-200 text-red-700"
                        }>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {booking.status === "Upcoming" && (
                          <Button size="sm" variant="outline" className="text-red-500 border-red-300">
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 