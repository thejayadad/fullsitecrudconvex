'use client'
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

interface Props {
  label: string;
  onClick: () => void;
  icon: IconType;
  isSearch?: boolean;
}

const ActionItem: React.FC<Props> = ({ label, onClick, icon: Icon, isSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* Main Row */}
      <div
        onClick={onClick}
        
        style={{ paddingLeft: '12px' }}
        className={`group min-h-[27px] text-sm py-1 pr-3 w-full flex items-center font-medium cursor-pointer ${
          isExpanded ? 'text-primary' : 'text-muted-foreground'
        } hover:bg-primary/5`}
      >
          
        {/* Icon */}
        <div
          onClick={toggleExpand}
       >
        <Icon
        className="h-4 w-4 shrink-0 text-muted-foreground/50 mr-2" />
        </div>
       
        {/* Label */}
        <span className="truncate">{label}</span>

      </div>

      {/* Dropdown Search Area */}
      {isExpanded && isSearch && (
        <div className="ml-6 mt-2 bg-gray-100 p-2 rounded shadow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <ul className="mt-2 space-y-1">
            {searchQuery ? (
              <li className="text-sm text-muted-foreground">Results for "{searchQuery}"</li>
            ) : (
              <li className="text-sm text-muted-foreground">No search input yet</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionItem;
