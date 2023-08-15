"use client"

import { UserButton } from '@clerk/nextjs'
import {StoreModal} from '@/components/shared/store-modal'

export default function SetupPage() {
  return (
    <div className='p-4'>
      <UserButton afterSignOutUrl='/' />
      <StoreModal />
       
      this is root route
    </div>
  )
}
