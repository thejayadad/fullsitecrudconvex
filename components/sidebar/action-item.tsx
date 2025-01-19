'use client';

import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { Id } from '@/convex/_generated/dataModel';

interface Props {
  id?: Id<"documents">;
  label: string;
  onClick?: () => void;
  icon: IconType;
  isSearch?: boolean;
  active?: boolean;
  onSearch?: (query: string) => void;
}

const ActionItem: React.FC<Props> = ({ label, onClick, icon: Icon, isSearch, active, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle expansion for search dropdown
  const toggleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* Action Item Row */}
      <div
        onClick={isSearch ? toggleExpand : onClick}
        className={`group min-h-[27px] text-sm py-1 pr-3 w-full flex items-center font-medium cursor-pointer 
          ${active ? 'text-purple-400 bg-purple-100' : 'text-muted-foreground'} 
          hover:bg-primary/5`}
      >
        <Icon className="h-5 w-5 shrink-0 text-muted-foreground/50 mr-2" />
        <span className="truncate">{label}</span>
      </div>

      {/* Search Dropdown Input */}
      {isExpanded && isSearch && (
        <div className="ml-6 mt-2 bg-white border border-gray-300 rounded shadow-lg p-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (onSearch) {
                onSearch(e.target.value);
              }
            }}
            placeholder="Search documents..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <ul className="mt-2 space-y-1">
            {searchQuery ? (
              <li className="text-sm text-gray-700">Results for "{searchQuery}"...</li>
            ) : (
              <li className="text-sm text-gray-500">Start typing to search</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionItem;
