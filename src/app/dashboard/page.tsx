import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import DashboardComponent from "@/components/DashboardComponent";

export default async function Dashboard() {
    const user = await getCurrentUser();

    if (!user || !user.id) redirect("/login")

    return (
        <>
            <Navbar page={"/dashboard"} />
            <DashboardComponent />
        </>
    );
}