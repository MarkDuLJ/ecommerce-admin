import prismadb from "@/lib/prismadb";

export const getTotalSale = async (storeId: string) => {
  const paidOrders = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true
    },
  });


  return paidOrders;
};