"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulate login
    login({ name: "John Doe", email });
    router.push("/dashboard"); // Updated path
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-lavender-100 text-gray-900 px-6 py-16">
      <div className="bg-white border border-lavender-300 shadow-md p-6 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-lavender-300 w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-lavender-300 w-full"
          />
          <Button onClick={handleLogin} className="w-full bg-lavender-500 text-white hover:bg-lavender-600">
            Login
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LoginPage; 