'use client';

import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import Logo from '../logo';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SideBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const { user } = useUser();

    const handleToggle = () => {
        setIsVisible(!isVisible);
      };
    
  return (
    <div className="h-full">
         <aside
        className={`h-full border-r overflow-y-auto flex flex-col relative z-[99999] transition-all duration-300 ${
          isVisible ? 'w-60 px-4' : 'w-0'
        }`}
      >
                {isVisible && (
                  <div className="py-4">
                    <div className="flex justify-end w-full px-4">
                        <Logo />
                    </div>
                    <div className='py-8'>
                        Action Items
                    </div>
                    <div>
                      Document List
                    </div>
                </div>

                )}
        </aside>
        <button
        onClick={handleToggle}
        className="absolute top-4 left-3 z-[100000] bg-primary p-1 border rounded-full shadow-md"
      >
        {isVisible ? (
          <FiChevronLeft className="h-6 w-6 text-gray-700" />
        ) : (
          <FiChevronRight className="h-6 w-6 text-gray-700" />
        )}
      </button>
    </div>
  )
}

export default SideBar