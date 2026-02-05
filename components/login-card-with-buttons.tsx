// components/login-card-with-buttons.tsx
"use client";

import { useState } from "react";
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

export function LoginCardWithButtons() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your login logic here
    console.log("Logging in:", { email, password });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>

        {/* BUTTON SECTION - You can reorder these buttons */}
        <CardFooter className="flex flex-col gap-2">
          {/* Primary Login Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Secondary Buttons Row */}
          <div className="flex w-full gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setEmail("");
                setPassword("");
              }}
            >
              Reset
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => (window.location.href = "/admin")}
            >
              Admin
            </Button>
          </div>

          {/* Text Button */}
          <Button
            type="button"
            variant="link"
            className="text-sm text-muted-foreground"
          >
            Forgot password?
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
