"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/shared/alert-modal"

interface Props{
    data:BillboardColumn
}


export const CellAction:React.FC<Props> =({data})=>{
    const router = useRouter()
    const params = useParams()

    const [loading,setLoading]=useState(false)
    const [open,setOpen]=useState(false)
    
    const onCopy = (id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success(`billboard id: ${id} copied.`)
    }

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
          router.refresh();
          router.push(`/${params.storeId}/billboards`);
          toast.success('Billboard deleted.');
        } catch (error: any) {
          toast.error('Make sure you removed all categories using this billboard first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

    return (
        <>
        <AlertModal isOpen={open} loading={loading} onClose={()=>setOpen(false)} onConfirm={onDelete}/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/billboards/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpen(true)}>
                    <Trash2 className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )

}