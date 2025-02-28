"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const API_URL =
        process.env.NEXT_DEPLOY_API_URL ||
        "https://booking-system.srisanjanaarunkumar.workers.dev";
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);

      alert("Login successful! Redirecting...");
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E6E6FA] to-[#D8BFD8] dark:from-[#2E1A47] dark:to-[#1E1029] p-4">
      <Card className="w-full max-w-md bg-white dark:bg-[#3A2354] shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#4B0082] dark:text-[#D8BFD8]">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#4B0082] dark:text-[#D8BFD8]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            <span>Don't have an account? </span>
            <Link href="/auth/signup" className="text-[#6A0DAD] dark:text-[#C0A6E8] hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
