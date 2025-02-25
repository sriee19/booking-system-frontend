'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LoginDialogProps {
  className?: string;
}

export default function LoginDialog({ className }: LoginDialogProps) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lavender-500 text-white px-4 py-2 rounded-md hover:bg-lavender-600">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-lavender-100 border border-lavender-300 text-gray-800 p-6 rounded-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lavender-900 font-semibold">Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-lavender-800">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="border border-lavender-400 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <Label className="text-lavender-800">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="border border-lavender-400 p-2 rounded-md w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full bg-lavender-500 text-white py-2 rounded-md hover:bg-lavender-600">
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-lavender-700">
          Don't have an account? <a href="/register" className="text-lavender-900 underline">Sign up</a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
