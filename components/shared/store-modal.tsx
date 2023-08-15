"use client"

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () =>{
    const storeModal = useStoreModal()

    return (
        <Modal title="Create Store" description="create store" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            Todo: store form
        </Modal>
    )
}