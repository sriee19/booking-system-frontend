"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiHome, FiUser, FiGrid } from "react-icons/fi";
import FloatingNav from "@/components/ui/floating-navbar";
import SignupDialog from "@/components/SignupDialog";

const navItems = [
  { name: "Home", link: "/", icon: <FiHome className="h-4 w-4" /> },
  { name: "Book Now", link: "/booking", icon: <FiUser className="h-4 w-4" /> },
  { name: "Dashboard", link: "/dashboard", icon: <FiGrid className="h-4 w-4" /> },
];

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-lavender text-gray-900 p-6">
      <FloatingNav navItems={navItems} className="mb-6" />
      
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">
        Welcome to Consultation Booking System
      </h1>
      
      <div className="flex space-x-4">
        <SignupDialog />
        
        <Link href="/booking">
          <button className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Book Now <FiArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </section>
  );
}
