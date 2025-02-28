"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Users, BookOpen, Sparkles, ClipboardList } from "lucide-react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "react-hot-toast";

const lavenderBg = "bg-[#E6E6FA] dark:bg-[#2D1B5A]";
const lavenderText = "text-[#5D3FD3] dark:text-[#D8BFD8]";
const lavenderBorder = "border-[#B19CD9] dark:border-[#4B0082]";
const lavenderHover = "hover:bg-[#D8BFD8] dark:hover:bg-[#3E1C72]";

interface User {
  uuid: string;
  email: string;
  role: "admin" | "user";
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser: User = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        toast.error("Invalid token, please log in again!", { position: "top-right" });
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    } else {
      toast.error("You need to log in first!", { position: "top-right" });
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <main className={`min-h-screen ${lavenderBg}`}>
      <Toaster /> {/* Toast messages appear here */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4 p-2">
          <div className={`inline-block p-2 ${lavenderBg} rounded-full mb-4`}>
            <Sparkles className={`w-8 h-8 ${lavenderText}`} />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#5D3FD3] to-[#B19CD9] dark:from-[#D8BFD8] dark:to-[#4B0082] text-transparent bg-clip-text`}>
            Consultation Booking
          </h1>
        </div>

        {user && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {user.role === "user" && (
              <>
                <Card className={`group hover:shadow-xl transition-all duration-300 hover:scale-105 ${lavenderBg} backdrop-blur-sm`}>
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 ${lavenderBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <CalendarIcon className={`w-6 h-6 ${lavenderText}`} />
                    </div>
                    <CardTitle>Book Consultation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Schedule a new consultation session with our experts.
                    </p>
                    <Link href="/book">
                      <Button className={`w-full ${lavenderText} ${lavenderHover}`}>Book Now</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className={`group hover:shadow-xl transition-all duration-300 hover:scale-105 ${lavenderBg} backdrop-blur-sm`}>
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 ${lavenderBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <BookOpen className={`w-6 h-6 ${lavenderText}`} />
                    </div>
                    <CardTitle>My Bookings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      View and manage your consultation bookings.
                    </p>
                    <Link href="/dashboard">
                      <Button variant="outline" className={`w-full ${lavenderBorder} ${lavenderHover}`}>View Bookings</Button>
                    </Link>
                  </CardContent>
                </Card>
              </>
            )}

            {user.role === "admin" && (
              <>
                <Card className={`group hover:shadow-xl transition-all duration-300 hover:scale-105 ${lavenderBg} backdrop-blur-sm`}>
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 ${lavenderBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Users className={`w-6 h-6 ${lavenderText}`} />
                    </div>
                    <CardTitle>View Users</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Browse and manage registered users.
                    </p>
                    <Link href="/admin/users">
                      <Button variant="outline" className={`w-full ${lavenderBorder} ${lavenderHover}`}>View Users</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className={`group hover:shadow-xl transition-all duration-300 hover:scale-105 ${lavenderBg} backdrop-blur-sm`}>
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 ${lavenderBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <ClipboardList className={`w-6 h-6 ${lavenderText}`} />
                    </div>
                    <CardTitle>View All Bookings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Admin access to all user bookings.
                    </p>
                    <Link href="/admin/board">
                      <Button variant="outline" className={`w-full ${lavenderBorder} ${lavenderHover}`}>View All Bookings</Button>
                    </Link>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
