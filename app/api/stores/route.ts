import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req:Request){
    try {
        const body = await req.json()
        
        const {name} = body
        if(!name){
            return new NextResponse("store name required", {status:400})
        }
        
        const {userId} = auth()
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        
        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
        })

        return NextResponse.json(store)
        
    } catch (error) {
        console.log("[STORES_POST]", error);
        return new NextResponse("internal error", {status:500})
    }
}