// app/actions.ts
"use server";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  // Authentication logic here (e.g., verifying with DB using Prisma)
  // return redirect('/dashboard')
}
