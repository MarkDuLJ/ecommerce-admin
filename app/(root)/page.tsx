import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function SetupPage() {
  return (
    <div className='p-4'>
      <UserButton afterSignOutUrl='/'/>
      this is root route
    </div>
  )
}
