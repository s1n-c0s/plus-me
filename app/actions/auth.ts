"use server";

import { redirect } from "next/navigation";

// Define a type for the state
export type ActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function login(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Please fill in all fields" };
  }

  // Authentication logic here...

  // If successful, redirect
  redirect("/");

  // Return null or success state if redirect doesn't happen
  return { success: true };
}
