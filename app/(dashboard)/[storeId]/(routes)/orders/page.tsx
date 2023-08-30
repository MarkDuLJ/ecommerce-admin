import prismadb from "@/lib/prismadb"
import { format } from "date-fns";

import { OrderClient} from "./components/order-client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({params}:{params:{storeId:string}}) =>{

  
  const orders = await prismadb.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      orderItems:{
        include:{
          // order:true,
          product:true
        }
      }
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  const formattedOrders:OrderColumn[] = orders.map(item=>({
    id:item.id,
    isPaid:item.isPaid,
    phone:item.phone,
    address:item.address,
    products:item.orderItems.map((orderItem)=>orderItem.product.name).join(", "),
    totalPrice: formatter.format(item.orderItems.reduce((total, cur)=> total + Number(cur.product.price), 0)),
    createdAt: format(item.createdAt,"MMMM do, yyyy")
  }
  ))
    return (
        <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
       
        <OrderClient data={formattedOrders} />
      </div>
    </div>
    )
}

export default OrdersPage