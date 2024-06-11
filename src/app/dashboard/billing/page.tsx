import BillingForm from "@/components/BillingForm"
import Navbar from "@/components/Navbar"
import { getUserSubscriptionPlan } from "@/lib/stripe"

const Page = async () => {
    const subscriptionPlan = await getUserSubscriptionPlan()

    return (
        <>
            <Navbar page={"/dashboard"} />
            <BillingForm subscriptionPlan={subscriptionPlan} />
        </>
    )
}

export default Page