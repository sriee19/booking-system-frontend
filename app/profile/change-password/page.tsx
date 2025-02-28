"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_DEPLOY_API_URL || "https://booking-system.srisanjanaarunkumar.workers.dev";

      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error || "Failed to update password");

      toast.success("Password updated successfully!");
      router.push("/profile");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-light to-lavender-dark dark:from-lavender-dark dark:to-gray-900 p-4">
      <Toaster />
      <div className="container mx-auto max-w-2xl">
        <Link href="/profile" className="inline-flex items-center text-lavender-dark hover:text-lavender-light dark:text-lavender-light dark:hover:text-lavender-muted mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-lavender-dark dark:text-lavender-light">Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-lavender-dark dark:text-lavender-light">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter your current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-800 border-lavender-light dark:border-lavender-muted"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-muted" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-lavender-dark dark:text-lavender-light">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-800 border-lavender-light dark:border-lavender-muted"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-muted" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-lavender-dark dark:text-lavender-light">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-800 border-lavender-light dark:border-lavender-muted"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-muted" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-lavender-dark hover:bg-lavender/90 dark:bg-lavender-light dark:hover:bg-lavender text-white dark:text-gray-900" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}