"use client";

import React, { useState, useEffect } from 'react';
import { FiHome, FiUser, FiLogOut, FiEdit2, FiSearch, FiFilter, FiTrash2, FiGrid } from "react-icons/fi";
import FloatingNav from "@/components/ui/floating-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


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

const ITEMS_PER_PAGE = 5;

interface Booking {
  id: number;
  date: string;
  time: string;
  status: "Completed" | "Upcoming" | "Cancelled";
  type: string;
}



const ProfilePage = () => {
  
  return (
    <section className="min-h-screen bg-lavender-100 text-gray-900 px-6 py-16">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* User Profile Card */}
        <Card className="bg-white border border-lavender-300 shadow-md">
          <CardHeader className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">Dhinesh M</CardTitle>
              <CardDescription className="text-gray-500">dhinesh@gmail.com</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-lavender-400 text-lavender-600 hover:bg-lavender-200">
              <FiEdit2 className="mr-2" /> Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="bg-white border border-lavender-300 shadow-md">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription className="text-gray-500">Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Current Password</Label>
              <Input type="password" placeholder="Enter current password" className="border-lavender-300" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">New Password</Label>
              <Input type="password" placeholder="Enter new password" className="border-lavender-300" />
            </div>
            <Button className="bg-lavender-500 text-white hover:bg-lavender-600">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfilePage;