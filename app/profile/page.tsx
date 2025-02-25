"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Lock } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // Mock user data - replace with actual user data
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "March 2024",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary" />
                </div>
              </div>
              
              <div className="flex-grow space-y-6">
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-lg font-medium">{user.name}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-lg">{user.email}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Member Since</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-lg">{user.joinedDate}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="/profile/update">
                    <Button className="w-full sm:w-auto">
                      Update Profile
                    </Button>
                  </Link>
                  <Link href="/profile/change-password">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}