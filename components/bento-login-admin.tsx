// components/bento-login-admin.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { saveBlockOrder } from "@/app/actions/blocks"; // สมมติว่าสร้างไฟล์ action นี้ตามคำแนะนำก่อนหน้า

interface BentoBlock {
  id: string;
  title: string;
  description: string;
  order: number;
  color: string;
}

export function BentoLoginAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [blocks, setBlocks] = useState<BentoBlock[]>([
    {
      id: "1",
      title: "Analytics",
      description: "View your dashboard metrics and insights",
      order: 1,
      color: "bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "2",
      title: "Users",
      description: "Manage user accounts and permissions",
      order: 2,
      color: "bg-green-500/10 border-green-500/20",
    },
    {
      id: "3",
      title: "Settings",
      description: "Configure system preferences",
      order: 3,
      color: "bg-purple-500/10 border-purple-500/20",
    },
    {
      id: "4",
      title: "Content",
      description: "Manage pages and media files",
      order: 4,
      color: "bg-orange-500/10 border-orange-500/20",
    },
    {
      id: "5",
      title: "Reports",
      description: "Generate and download reports",
      order: 5,
      color: "bg-pink-500/10 border-pink-500/20",
    },
    {
      id: "6",
      title: "Security",
      description: "Audit logs and access control",
      order: 6,
      color: "bg-red-500/10 border-red-500/20",
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      setIsAdmin(true);
      setLoginOpen(false);
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSaveLayout = async () => {
    setIsSaving(true);
    const orderData = blocks.map((block, index) => ({
      id: block.id,
      order: index + 1,
    }));

    try {
      const result = await saveBlockOrder(orderData);
      if (result.success) {
        alert("Layout saved successfully!");
      } else {
        alert("Error saving layout");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to connect to the server");
    } finally {
      setIsSaving(false);
    }
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (!isAdmin) return;

    setBlocks((prev) => {
      const newBlocks = [...prev];
      const swapIndex = direction === "up" ? index - 1 : index + 1;

      if (swapIndex < 0 || swapIndex >= newBlocks.length) return prev;

      // สลับตำแหน่งใน Array
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[swapIndex];
      newBlocks[swapIndex] = temp;

      // อัปเดตค่า order ให้ตรงกับตำแหน่งใหม่
      return newBlocks.map((block, i) => ({ ...block, order: i + 1 }));
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {isAdmin
              ? "Admin Mode - You can reorder blocks and save changes"
              : "View Mode - Login to organize"}
          </p>
        </div>

        <div className="flex gap-2">
          {isAdmin && (
            <Button
              variant="default"
              onClick={handleSaveLayout}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSaving ? "Saving..." : "Save Layout"}
            </Button>
          )}

          {isAdmin ? (
            <Button variant="outline" onClick={() => setIsAdmin(false)}>
              Logout
            </Button>
          ) : (
            <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
              <DialogTrigger asChild>
                <Button>
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Login as Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Admin Login</DialogTitle>
                  <DialogDescription>
                    Sign in to organize and reorder dashboard blocks
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 pt-4">
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login to Organize
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Default: admin@example.com / admin123
                  </p>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((block, index) => (
          <Card
            key={block.id}
            className={`relative group transition-all duration-200 ${block.color} ${
              isAdmin ? "cursor-move hover:shadow-lg border-2" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{block.title}</CardTitle>
                  <CardDescription className="mt-1.5">
                    {block.description}
                  </CardDescription>
                </div>
                {isAdmin && (
                  <span className="text-xs font-mono bg-background/50 px-2 py-1 rounded">
                    Pos: {block.order}
                  </span>
                )}
              </div>
            </CardHeader>

            {isAdmin && (
              <CardFooter className="flex justify-end gap-1 pt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => moveBlock(index, "up")}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => moveBlock(index, "down")}
                  disabled={index === blocks.length - 1}
                >
                  ↓
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {!isAdmin && (
        <div className="mt-8 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
          Click &quot;Login as Admin&quot; to unlock reordering and saving
          capabilities
        </div>
      )}
    </div>
  );
}
