"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--chart-1)_0%,_transparent_40%),radial-gradient(circle_at_bottom_left,_var(--chart-2)_0%,_transparent_40%)] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-6 p-8 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
            Team Expense Tracker
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            A modern expense tracking application built with Next.js 14, focusing on team collaboration and real-time updates.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/expenses">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90 transition-opacity"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}