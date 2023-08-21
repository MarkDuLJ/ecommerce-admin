"use client"

import { useParams, useRouter } from "next/navigation";
import { CategoryColumn } from "./CategoryColumn";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/shared/alert-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal } from "lucide-react";
import axios from "axios";


interface Props{
    data:CategoryColumn
}

export const CellAction:React.FC<Props> =({data})=>{
    const router = useRouter()
    const params = useParams()

    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)

    const onCopy =(id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success(`copied to clipboard`)
    }

    const onDelete= async()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast(`category:${data.id} deleted.`)
            
        } catch (error) {
            toast.error(`remove all billboard using this category`)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
        <AlertModal 
            isOpen={open} 
            loading={loading} 
            onClose={()=>setOpen(false)}
            onConfirm={onDelete}/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/categories/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpen(true)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}