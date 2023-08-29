"use client"

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/shared/api-list";

import { columns, ProductColumn } from "./columns";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";



interface Props {
  data: ProductColumn[];
}

export const ProductClient: React.FC<Props> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} description="Manage products for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};