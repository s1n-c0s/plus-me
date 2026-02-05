// components/login-form.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>

      {/* Enhanced CardFooter with multiple button options */}
      <CardFooter className="flex flex-col gap-2">
        {/* Primary Action */}
        <Button className="w-full">Sign In</Button>

        {/* Secondary Actions - Added Buttons */}
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/forgot-password">Forgot?</Link>
          </Button>
          <Button variant="ghost" className="flex-1" asChild>
            <Link href="/admin">Admin</Link>
          </Button>
        </div>

        {/* Text Link Alternative */}
        <p className="text-sm text-muted-foreground text-center mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
