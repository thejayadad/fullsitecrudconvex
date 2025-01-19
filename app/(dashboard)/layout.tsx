'use client'
import SideBar from '@/components/sidebar/sidebar';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const {user} = useUser()
    if(!user){
        redirect('/')
    }
  return (
    <div className='h-full flex'>
        <SideBar />
        <main className='flex-1 h-full overflow-y-auto'>
        {children}
        </main>
    </div>
  )
}

export default layout