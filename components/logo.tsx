import React from 'react';
import { FiEdit3, FiShare2 } from 'react-icons/fi'; // React Icons

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon Part */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-1 rounded-full shadow-lg transform rotate-12">
        <FiEdit3 className="h-3 w-3" />
      </div>
      {/* Text Part */}
      <h1 className="text-xl font-extrabold text-gray-900 tracking-wide">
        Snap<span className="text-indigo-600">Notes</span>
      </h1>
    </div>
  );
};

export default Logo;
