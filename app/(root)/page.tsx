"use client"

import { UserButton } from '@clerk/nextjs'
import Modal from '@/components/shared/modal'

export default function SetupPage() {
  return (
    <div className='p-4'>
      <UserButton afterSignOutUrl='/' />
      <Modal isOpen onClose={()=>{}} title='test' description='des'>
        Hello
      </Modal>
      this is root route
    </div>
  )
}
