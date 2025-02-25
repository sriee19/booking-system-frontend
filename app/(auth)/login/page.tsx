'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-lavender-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-purple-700">Login to CBS</h1>
        <p className="text-sm text-center text-gray-500 mb-6">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-700">Email</Label>
            <Input 
              id="email" 
              placeholder="Enter your email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full p-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label className="text-gray-700">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
          
          <Button type="submit" className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700">
            Login
          </Button>
          
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
