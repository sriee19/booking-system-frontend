"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import UserSidebar from "@/components/ui/user-sidebar";

export default function BookingPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const API_URL =
        process.env.NEXT_DEPLOY_API_URL ||
        "https://booking-system.srisanjanaarunkumar.workers.dev";
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          calendarDate: date?.toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      setSuccess("Booking successful!");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#E6E6FA] to-[#D8BFD8] dark:from-[#2E1A47] dark:to-[#1E1029]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#3A2354] shadow-lg p-4">
        <UserSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 flex justify-center">
        <div className="container mx-auto max-w-4xl">
          <Card className="mt-8 bg-white dark:bg-[#3A2354] shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-[#4B0082] dark:text-[#D8BFD8]">
                Book a Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#4B0082] dark:text-[#D8BFD8]">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border border-[#9370DB] dark:border-[#C0A6E8] bg-white dark:bg-[#442B69] text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#4B0082] dark:text-[#D8BFD8]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border border-[#9370DB] dark:border-[#C0A6E8] bg-white dark:bg-[#442B69] text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#4B0082] dark:text-[#D8BFD8]">Select Date and Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-[#9370DB] dark:border-[#C0A6E8] text-gray-900 dark:text-white bg-white dark:bg-[#442B69]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white dark:bg-[#442B69] border-[#9370DB] dark:border-[#C0A6E8]" align="start">
                      <Calendar
                        mode="single"
                        selected={date || undefined}
                        onSelect={(day) => setDate(day ?? null)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <Button
                  type="submit"
                  className="w-full bg-[#9370DB] hover:bg-[#8A2BE2] text-white dark:bg-[#6A0DAD] dark:hover:bg-[#7B1FA2]"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Consultation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
