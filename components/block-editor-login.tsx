// components/block-editor-login.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContentBlock {
  id: string;
  type: "text" | "image" | "button";
  content: string;
  order: number;
}

export function BlockEditorWithLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: "1", type: "text", content: "Welcome to our site", order: 1 },
    { id: "2", type: "button", content: "Get Started", order: 2 },
    { id: "3", type: "text", content: "Contact us for more info", order: 3 },
  ]);

  const moveBlock = (id: string, direction: "up" | "down") => {
    if (!isAuthenticated) return;

    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      const swapIndex = direction === "up" ? index - 1 : index + 1;

      if (swapIndex < 0 || swapIndex >= prev.length) return prev;

      const newBlocks = [...prev];
      const temp = newBlocks[index].order;
      newBlocks[index].order = newBlocks[swapIndex].order;
      newBlocks[swapIndex].order = temp;

      return newBlocks.sort((a, b) => a.order - b.order);
    });
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>🔒 Admin Login Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Admin Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input id="login-password" type="password" />
          </div>
          <Button className="w-full" onClick={() => setIsAuthenticated(true)}>
            Login to Edit Blocks
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Block Editor</h2>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Logout
        </Button>
      </div>

      <div className="space-y-2">
        {blocks.map((block, index) => (
          <Card key={block.id} className="relative group">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-mono">
                  {String(block.order).padStart(2, "0")}
                </span>
                <div>
                  <span className="text-xs uppercase text-muted-foreground">
                    {block.type}
                  </span>
                  <p>{block.content}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => moveBlock(block.id, "up")}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => moveBlock(block.id, "down")}
                  disabled={index === blocks.length - 1}
                >
                  ↓
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
