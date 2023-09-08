import Stripe from "stripe";

import {  NextResponse} from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

const corsHeader={
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methos":"GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({},{headers:corsHeader})
}

export async function POST(req:Request,
    {params}:{params:{
        storeId:string
    }}) {

        const {productIds} = await req.json()

        if(!productIds||productIds.length === 0){
            return new NextResponse("no product Id in cart",{status:400})
        }

        const products = await prismadb.product.findMany({
            where:{
                id:{
                    in:productIds
                }
            }
        })

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

        products.forEach(product=>{
            line_items.push({
                quantity:1,
                price_data:{
                    currency:"USD",
                    product_data:{
                        name:product.name,
                    },
                    unit_amount: Math.floor(product.price.toNumber()*100)
                }
            })
        })

        // create unpaid order
        const order = await prismadb.order.create({
            data:{
                storeId: params.storeId,
                isPaid:false,
                orderItems:{
                    create: productIds.map((prodId: string)=>({
                        product:{
                            connect:{
                                id:prodId
                            }
                        }
                    }))
                }
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode:"payment",
            billing_address_collection:"required",
            phone_number_collection:{enabled:true},
            success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
            cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
            metadata:{
                orderId: order.id
            }
        })

        return NextResponse.json({url:session.url},{headers:corsHeader})
}