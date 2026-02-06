// app/actions/blocks.ts
"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function saveBlockOrder(blocks: { id: string; order: number }[]) {
  try {
    // Perform updates in a single transaction for efficiency and safety
    const transactions = blocks.map((block) =>
      prisma.block.update({
        where: { id: block.id },
        data: { order: block.order },
      }),
    );

    await prisma.$transaction(transactions);

    // Refresh the page data
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to save block order:", error);
    return { success: false, error: "Database update failed" };
  }
}
