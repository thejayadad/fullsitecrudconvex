'use client'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'sonner'


const DashboardPage = () => {
    const {user}= useUser()
    const create = useMutation(api.documents.create)
    const onCreate = () => {
        const promise = create({title: 'Untitled'})
        toast.promise(promise, {
          loading: 'Creating a document...',
          success: 'New document created!',
          error: 'Failed to create a document.'
        })
      }
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
        <h1>Welcome To {user?.fullName}</h1> Notes
        <button
        onClick={onCreate}
        className='flex items-center'
        >
            <FiPlus className='h-4 w-4 mr-2' />
            Create Note
        </button>
    </div>
  )
}

export default DashboardPage