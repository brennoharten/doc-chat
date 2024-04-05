"use client";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function SignoutButton() {
    return (
        <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
                buttonVariants({ size: "sm" })
            )}
        >
            Sign Out
        </Button>
    );
}