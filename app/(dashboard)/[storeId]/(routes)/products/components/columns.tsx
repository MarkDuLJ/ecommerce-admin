"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { Decimal } from "@prisma/client/runtime/library";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export type ProductColumn = {
  id: string
  name: string;
  size: string;
  color: string;
  price: String;
  isFeatured: Boolean;
  isArchived: Boolean;
  category: string;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "category",
    header: "Categoy",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({row})=>(
      <div className="flex items-center gap-x-2">  
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.color}}/>
      </div>
    )
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "actions",
    cell: ({row})=><CellAction data={row.original}/>
  },
];
