import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import DashboardComponent from "@/components/DashboardComponent";
import { getUserSubscriptionPlan } from "@/lib/stripe";

export default async function Dashboard() {
    const user = await getCurrentUser();

    if (!user || !user.id) redirect("/login")

    const subscriptionPlan = await getUserSubscriptionPlan()

    return (
        <>
            <Navbar page={"/dashboard"} />
            <DashboardComponent subscriptionPlan={subscriptionPlan}/>
        </>
    );
}