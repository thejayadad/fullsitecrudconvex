import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='h-full'>
      <main className='flex justify-center items-center h-full'>
      {children}
      </main>
    </div>
  )
}

export default layout