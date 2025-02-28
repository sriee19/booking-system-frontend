"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Users, BookOpen, Sparkles, List, ClipboardList } from "lucide-react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

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
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        router.push("/auth/login"); // Redirect to login if token is invalid
      }
    } else {
      router.push("/auth/login"); // Redirect to login if no token found
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            Expert Consultation Booking
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule your personalized consultation session with our experts. Get valuable insights and guidance tailored to your needs.
          </p>
        </div>

        {user && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* User-specific Cards */}
            {user.role === "user" && (
              <>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <CalendarIcon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Book Consultation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Schedule a new consultation session with our experts.
                    </p>
                    <Link href="/book">
                      <Button className="w-full bg-primary/90 hover:bg-primary">Book Now</Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>My Bookings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      View and manage your consultation bookings.
                    </p>
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full border-primary/20 hover:border-primary/40">
                        View Bookings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Admin-specific Cards */}
            {user.role === "admin" && (
              <>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>View Users</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Browse and manage registered users.
                    </p>
                    <Link href="/admin/users">
                      <Button variant="outline" className="w-full border-primary/20 hover:border-primary/40">
                        View Users
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <ClipboardList className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>View All Bookings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Admin access to all user bookings.
                    </p>
                    <Link href="/admin/board">
                      <Button variant="outline" className="w-full border-primary/20 hover:border-primary/40">
                        View All Bookings
                      </Button>
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
