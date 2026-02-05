// components/reorderable-admin-list.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Block {
  id: string;
  title: string;
  order: number;
}

export function ReorderableAdminList() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "1", title: "Hero Section", order: 1 },
    { id: "2", title: "Features Grid", order: 2 },
    { id: "3", title: "Testimonials", order: 3 },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= newBlocks.length) return;

    // Swap orders
    const temp = newBlocks[index].order;
    newBlocks[index].order = newBlocks[swapIndex].order;
    newBlocks[swapIndex].order = temp;

    // Sort by order
    newBlocks.sort((a, b) => a.order - b.order);
    setBlocks(newBlocks);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Page Sections (Drag to reorder)</span>
          {!isLoggedIn ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  {/* Login Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-2"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Login to Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Admin Login</DialogTitle>
                  <DialogDescription>
                    Sign in to edit and reorder sections
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="space-y-4 pt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input id="admin-email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input id="admin-password" type="password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Login & Continue
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-3">
              {/* Drag Handle */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground cursor-grab"
              >
                <circle cx="9" cy="12" r="1" />
                <circle cx="9" cy="5" r="1" />
                <circle cx="9" cy="19" r="1" />
                <circle cx="15" cy="12" r="1" />
                <circle cx="15" cy="5" r="1" />
                <circle cx="15" cy="19" r="1" />
              </svg>
              <span className="font-medium">{block.title}</span>
              <span className="text-xs text-muted-foreground">
                Order: {block.order}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveBlock(index, "up")}
                disabled={index === 0 || !isLoggedIn}
              >
                ↑
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveBlock(index, "down")}
                disabled={index === blocks.length - 1 || !isLoggedIn}
              >
                ↓
              </Button>
              {isLoggedIn ? (
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Authentication Required</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                      Please login to edit this section
                    </p>
                    <Button
                      className="w-full mt-4"
                      onClick={() => setIsLoggedIn(true)}
                    >
                      Quick Login (Demo)
                    </Button>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
