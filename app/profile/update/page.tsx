"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log("Profile update:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-light to-lavender-dark dark:from-lavender-dark dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-2xl">
        <Link href="/profile" className="inline-flex items-center text-lavender-dark dark:text-lavender-light hover:text-lavender/80 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        
        <Card className="bg-lavender/10 dark:bg-lavender/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-lavender-dark dark:text-lavender-light">Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  className="bg-lavender-light/30 dark:bg-lavender-dark/30 text-gray-900 dark:text-white"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-lavender-light/30 dark:bg-lavender-dark/30 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  className="bg-lavender-light/30 dark:bg-lavender-dark/30 text-gray-900 dark:text-white"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-lavender-dark hover:bg-lavender/90 dark:bg-lavender-light dark:hover:bg-lavender text-white dark:text-gray-900">
                  Save Changes
                </Button>
                <Link href="/profile" className="flex-1">
                  <Button variant="outline" className="w-full border-lavender/40 hover:border-lavender/60 text-lavender-dark dark:text-lavender-light dark:border-lavender/30 dark:hover:border-lavender/50">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}