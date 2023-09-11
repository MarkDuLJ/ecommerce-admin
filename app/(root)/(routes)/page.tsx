"use client"

import { UserButton } from '@clerk/nextjs'
import {StoreModal} from '@/components/shared/store-modal'
import {useStoreModal} from '@/hooks/use-store-modal'
import { useEffect } from 'react'

export default function SetupPage() {
  const {onOpen, isOpen} = useStoreModal()

  useEffect(()=>{
    if(!isOpen) onOpen()
  },[isOpen,onOpen])
  
  return (
    <div className='p-4'>
      <UserButton afterSignOutUrl='/' />
      <StoreModal />
       
      this is root route
    </div>
  )
}
