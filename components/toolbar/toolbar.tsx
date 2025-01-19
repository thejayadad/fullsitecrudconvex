'use client';

import { Doc } from '@/convex/_generated/dataModel';
import React, { useState } from 'react';
import EmojiPickerComponent from './icon-picker';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const ToolBar = ({ initialData, preview }: Props) => {
  const [icon, setIcon] = useState(initialData.icon || '😊');
  const updateIcon = useMutation(api.documents.updateIcon);

  const handleIconChange = async (newIcon: string) => {
    setIcon(newIcon);
    try {
      await updateIcon({ id: initialData._id, icon: newIcon });
    } catch (error) {
      console.error('Failed to update icon:', error);
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <EmojiPickerComponent onChange={handleIconChange}>
            <p className="text-6xl hover:opacity-25 transition cursor-pointer">{icon}</p>
          </EmojiPickerComponent>
        </div>
      )}
    </div>
  );
};

export default ToolBar;
