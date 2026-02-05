// components/login-form-reordered.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Mail } from "lucide-react";
import { useState } from "react";

export function LoginFormReordered() {
  const [loginMethod, setLoginMethod] = useState<"password" | "magic-link">(
    "password",
  );

  return (
    <Card className="w-full max-w-md">
      {/* Header with Toggle Buttons - REORDERED: Actions first */}
      <CardHeader className="space-y-4">
        <div className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Choose your sign-in method</CardDescription>
        </div>

        {/* Method Toggle Buttons - NEW ADDITION */}
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={loginMethod === "password" ? "default" : "ghost"}
            className="flex-1"
            onClick={() => setLoginMethod("password")}
          >
            <Fingerprint className="w-4 h-4 mr-2" />
            Password
          </Button>
          <Button
            variant={loginMethod === "magic-link" ? "default" : "ghost"}
            className="flex-1"
            onClick={() => setLoginMethod("magic-link")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Magic Link
          </Button>
        </div>
      </CardHeader>

      {/* Dynamic Content Based on Selection */}
      <CardContent className="space-y-4">
        {loginMethod === "password" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full">Sign In</Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="magic-email">Email</Label>
              <Input
                id="magic-email"
                type="email"
                placeholder="Enter for magic link"
              />
            </div>
            <Button className="w-full" variant="secondary">
              Send Magic Link
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
