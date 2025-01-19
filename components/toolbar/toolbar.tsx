'use client';

import { Doc } from '@/convex/_generated/dataModel';
import React, { useState } from 'react';
import EmojiPickerComponent from './icon-picker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FiTrash2, FiSmile, FiImage } from 'react-icons/fi';
import { SingleImageDropzone } from '../edgestore/image-dropzone';

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const ToolBar = ({ initialData, preview }: Props) => {
  const [icon, setIcon] = useState<string | null>(initialData.icon || null);
  const [coverImage, setCoverImage] = useState<string | null>(initialData.coverImage || null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isUploaderVisible, setIsUploaderVisible] = useState(false);

  const updateIcon = useMutation(api.documents.updateIcon);
  const updateCoverImage = useMutation(api.documents.updateCoverImage);

  const handleIconChange = async (newIcon: string) => {
    setIcon(newIcon);
    setIsPickerVisible(false);
    try {
      await updateIcon({ id: initialData._id, icon: newIcon });
    } catch (error) {
      console.error('Failed to update icon:', error);
    }
  };

  const handleDeleteIcon = async () => {
    setIcon(null);
    try {
      await updateIcon({ id: initialData._id, icon: '' });
    } catch (error) {
      console.error('Failed to delete icon:', error);
    }
  };

  const handleCoverImageUpload = async (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const imageUrl = reader.result as string;
      setCoverImage(imageUrl);
      setIsUploaderVisible(false);
      try {
        await updateCoverImage({ id: initialData._id, coverImage: imageUrl });
      } catch (error) {
        console.error('Failed to upload cover image:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCoverImage = async () => {
    setCoverImage(null);
    try {
      await updateCoverImage({ id: initialData._id, coverImage: '' });
    } catch (error) {
      console.error('Failed to remove cover image:', error);
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {/* Cover Image Preview */}
      {coverImage ? (
        <div className="mt-4 relative">
          <img src={coverImage} alt="Cover" className="w-full h-48 object-cover rounded-md shadow" />
          <button
            onClick={handleRemoveCoverImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      ) : (
        // Show Upload Button if no image
        <div className="mt-4">
          {isUploaderVisible ? (
            <SingleImageDropzone onChange={handleCoverImageUpload} value={undefined} />
          ) : (
            // <button
            //   onClick={() => setIsUploaderVisible(true)}
            //   className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition flex items-center gap-2"
            // >
            //   <FiImage className="h-6 w-6" />
            //   <span>Add Cover Image</span>
            // </button>
            <SingleImageDropzone onChange={handleCoverImageUpload} value={undefined} />

          )}
        </div>
      )}

      <div className="flex flex-row items-center gap-x-4 group/icon pt-6">
        {/* Show icon if available */}
        {icon && !preview && (
          <p className="text-6xl cursor-pointer" onClick={() => setIsPickerVisible(true)}>
            {icon}
          </p>
        )}

        {/* Add Icon Button */}
        {!icon && !preview && (
          <button
            onClick={() => setIsPickerVisible(!isPickerVisible)}
            className="p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            <FiSmile className="h-6 w-6" />
          </button>
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
