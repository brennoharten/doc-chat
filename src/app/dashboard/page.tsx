import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
    const user = await getCurrentUser();

    if (!user || !user.email) redirect("/register")

    return (
        <>
            <Navbar page={"/"}/>
            <div>{user?.email}</div>
        </>
    );
}