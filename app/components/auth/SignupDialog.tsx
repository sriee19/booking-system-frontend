'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SignupDialogProps {
  className?: string;
}

export default function SignupDialog({ className }: SignupDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      router.push('/dashboard');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lavender-600 text-white px-4 py-2 rounded-md hover:bg-lavender-700">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-lavender-100 border border-lavender-300 p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lavender-900 text-lg font-bold">Sign Up</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-lavender-800">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your full name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="border border-lavender-300 bg-white text-lavender-900 p-2 rounded-md"
            />
          </div>
          <div>
            <Label className="text-lavender-800">Email</Label>
            <Input 
              id="email" 
              placeholder="Enter your email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="border border-lavender-300 bg-white text-lavender-900 p-2 rounded-md"
            />
          </div>
          <div>
            <Label className="text-lavender-800">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-lavender-300 bg-white text-lavender-900 p-2 rounded-md"
            />
          </div>
          
          {error && <div className="text-red-500 text-center">{error}</div>}
          
          <Button type="submit" className="w-full bg-lavender-600 text-white px-4 py-2 rounded-md hover:bg-lavender-700">
            Sign Up
          </Button>
          
          <p className="text-center text-sm text-lavender-700">
            Already have an account? <a className="text-lavender-900 underline" href="/login">Login</a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}