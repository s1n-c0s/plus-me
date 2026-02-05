// components/login-reorderable.tsx
"use client";

import { useState, useCallback } from "react";
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
import Link from "next/link";

type ButtonConfig = {
  id: string;
  label: string;
  variant: "default" | "outline" | "secondary" | "ghost" | "link";
  action: "submit" | "reset" | "admin" | "forgot";
  className?: string;
  href?: string;
};

export function LoginReorderable() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Static config - edit this array to reorder buttons
  const buttons: ButtonConfig[] = [
    {
      id: "1",
      label: "Sign In",
      variant: "default",
      action: "submit",
      className: "w-full",
    },
    {
      id: "2",
      label: "Reset",
      variant: "outline",
      action: "reset",
      className: "flex-1",
    },
    {
      id: "3",
      label: "Admin",
      variant: "secondary",
      action: "admin",
      className: "flex-1",
      href: "/admin",
    },
    {
      id: "4",
      label: "Forgot password?",
      variant: "link",
      action: "forgot",
      className: "text-sm",
      href: "/forgot-password",
    },
  ];

  const handleReset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const primaryButton = buttons.find((b) => b.action === "submit");
  const secondaryButtons = buttons.filter(
    (b) => b.action !== "submit" && b.action !== "forgot",
  );
  const linkButton = buttons.find((b) => b.action === "forgot");

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Access your admin dashboard</CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Login:", { email, password });
        }}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          {/* Primary Button */}
          {primaryButton && (
            <Button type="submit" className={primaryButton.className}>
              {primaryButton.label}
            </Button>
          )}

          {/* Secondary Buttons Row */}
          {secondaryButtons.length > 0 && (
            <div className="flex w-full gap-2">
              {secondaryButtons.map((btn) => {
                if (btn.action === "reset") {
                  return (
                    <Button
                      key={btn.id}
                      type="button"
                      variant={btn.variant}
                      className={btn.className}
                      onClick={handleReset}
                    >
                      {btn.label}
                    </Button>
                  );
                }
                return (
                  <Button
                    key={btn.id}
                    type="button"
                    variant={btn.variant}
                    className={btn.className}
                    asChild
                  >
                    <Link href={btn.href || "/"}>{btn.label}</Link>
                  </Button>
                );
              })}
            </div>
          )}

          {/* Link Button */}
          {linkButton && (
            <Button
              type="button"
              variant={linkButton.variant}
              className={linkButton.className}
              asChild
            >
              <Link href={linkButton.href || "/"}>{linkButton.label}</Link>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
