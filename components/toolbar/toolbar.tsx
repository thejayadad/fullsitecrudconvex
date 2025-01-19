'use client';

import { Doc } from '@/convex/_generated/dataModel';
import React, { useState } from 'react';
import EmojiPickerComponent from './icon-picker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FiTrash2, FiSmile } from 'react-icons/fi';
import Header from '../header/header';

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const ToolBar = ({ initialData, preview }: Props) => {
  const [icon, setIcon] = useState<string | null>(initialData.icon || null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const updateIcon = useMutation(api.documents.updateIcon);
  const removeIcon = useMutation(api.documents.updateIcon); // Assuming same API to set it to empty

  const handleIconChange = async (newIcon: string) => {
    setIcon(newIcon);
    setIsPickerVisible(false); // Hide the picker after selection
    try {
      await updateIcon({ id: initialData._id, icon: newIcon });
    } catch (error) {
      console.error('Failed to update icon:', error);
    }
  };

  const handleDeleteIcon = async () => {
    setIcon(null);
    try {
      await removeIcon({ id: initialData._id, icon: '' }); // Set icon to empty in backend
    } catch (error) {
      console.error('Failed to delete icon:', error);
    }
  };

  return (
    <div className="pl-[54px] group relative">
      <div className="flex items-center gap-x-4 group/icon pt-6">
        {/* Show icon if available */}
        {icon && !preview && (
          <p className="text-6xl cursor-pointer" onClick={() => setIsPickerVisible(true)}>
            {icon}
          </p>
        )}

        {/* Add Icon Button */}
        {!icon && !preview && (
            <div className='flex items-center space-x-2'>
                     <button
            onClick={() => setIsPickerVisible(!isPickerVisible)}
            className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            <FiSmile className="h-6 w-6" />
          </button>
          <button>
            Add CoverImage
          </button>
            </div>
        )}

        {/* Delete Icon Button */}
        {icon && (
          <button
            onClick={handleDeleteIcon}
            className="p-1 rounded bg-red-400 text-white hover:bg-red-600 transition"
          >
            <FiTrash2 className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Emoji Picker */}
      {isPickerVisible && (
        <div className="absolute top-16 left-0 bg-white border border-gray-300 shadow-lg rounded-md p-2">
          <EmojiPickerComponent onChange={handleIconChange}>
            <button className="text-sm text-blue-500 hover:underline">Pick an emoji</button>
          </EmojiPickerComponent>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
