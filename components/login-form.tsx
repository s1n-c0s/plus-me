"use client";

import * as React from "react"; // Import React for useActionState
import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { login, ActionState } from "@/app/actions/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, LockIcon } from "@hugeicons/core-free-icons";

export function LoginForm() {
  // useActionState takes the action and an initial state
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    login,
    null,
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* formAction now matches the expected (formData: FormData) => void type */}
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="pl-10"
                  disabled={isPending}
                />
                <HugeiconsIcon
                  icon={Mail01Icon}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4"
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10"
                  disabled={isPending}
                />
                <HugeiconsIcon
                  icon={LockIcon}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4"
                />
              </div>
            </Field>

            {/* Display the error if it exists */}
            {state?.error && (
              <p className="text-sm font-medium text-destructive">
                {state.error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
