"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const API_URL =
        process.env.NEXT_DEPLOY_API_URL ||
        "https://booking-system.srisanjanaarunkumar.workers.dev";
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      alert("Signup successful! Redirecting to login...");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E6E6FA] to-[#D8BFD8] dark:from-[#2E1A47] dark:to-[#1E1029] p-4">
      <Card className="w-full max-w-md bg-white dark:bg-[#3A2354] shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#4B0082] dark:text-[#D8BFD8]">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#4B0082] dark:text-[#D8BFD8]">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
                className="border border-[#9370DB] dark:border-[#C0A6E8] bg-white dark:bg-[#442B69] text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#4B0082] dark:text-[#D8BFD8]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-[#9370DB] dark:border-[#C0A6E8] bg-white dark:bg-[#442B69] text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#4B0082] dark:text-[#D8BFD8]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border border-[#9370DB] dark:border-[#C0A6E8] bg-white dark:bg-[#442B69] text-gray-900 dark:text-white"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-[#9370DB] hover:bg-[#8A2BE2] text-white dark:bg-[#6A0DAD] dark:hover:bg-[#7B1FA2]"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            <span>Already have an account? </span>
            <Link href="/auth/login" className="text-[#6A0DAD] dark:text-[#C0A6E8] hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
