"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary">
      <div className="text-center space-y-6">
        <div className="inline-block p-2 bg-primary/10 rounded-full">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
          Expert Consultation Booking
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Schedule your personalized consultation session with our experts. Sign up to get started.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/auth/signup">
            <Button className="bg-primary/90 hover:bg-primary px-6">Sign Up</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" className="border-primary/20 hover:border-primary/40 px-6">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
