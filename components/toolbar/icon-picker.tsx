'use client';

import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Props {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

const EmojiPickerComponent = ({ onChange, children, asChild }: Props) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);  // Correct assignment for state update
    setIsPickerVisible(false);   // Close picker after selection
  };

  return (
    <div className="relative">
      {/* Trigger to open emoji picker */}
      <div
        onClick={() => setIsPickerVisible(!isPickerVisible)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {/* Emoji picker dropdown */}
      {isPickerVisible && (
        <div className="absolute top-10 left-0 z-50 bg-white border shadow-md">
          <EmojiPicker height={350} onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
