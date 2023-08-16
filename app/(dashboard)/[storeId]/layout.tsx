import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default  async  function DashBooardLayout ({
    children,params
}:{
    children:React.ReactNode, 
    params:{storeId: string}}) {

    const {userId} = auth()
    if(!userId) redirect("/sign-in")

    const store = prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })

    if(!store) redirect("/")

    return(
        <>
        <div>Nav Bar</div>
        {children}
        </>
    )
}