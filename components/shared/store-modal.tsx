"use client"

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { log } from "console";

const formSchema = z.object({
    name:z.string().min(1),
})

export const StoreModal = () =>{
    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:""
        }
    })

    const onSubmit =async (values:z.infer<typeof formSchema>) => {
        console.log(values);
        
    }

    return (
        <Modal title="Create Store" description="create store" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} render={({field})=>{
                            return (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="store name input" {...field} />
                                    </FormControl>
                                    <FormMessage  />
                                </FormItem>
                            )
                        }} name="name" />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
            </>
        </Modal>
    )
}