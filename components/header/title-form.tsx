'use client';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import React, { useState } from 'react';
import { FiEdit, FiX, FiCheck } from 'react-icons/fi';

interface Props {
  noteId: string;
  noteTitle: string;
}

const TitleForm: React.FC<Props> = ({ noteId, noteTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(noteTitle);
  const updateTitle = useMutation(api.documents.updateTitle);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && noteId) {
      try {
        await updateTitle({ id: noteId, title });
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating title:", error);
      }
    }
  };

  const handleCancel = () => {
    setTitle(noteTitle); // Reset to original title
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex items-center space-x-2">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
          >
            <FiCheck />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-400 text-white p-2 rounded-full hover:bg-red-500"
          >
            <FiX />
          </button>
        </form>
      ) : (
        <h1
          className="text-xl font-bold cursor-pointer hover:underline flex items-center"
          onClick={() => setIsEditing(true)}
        >
          {title}
          <FiEdit className="ml-2 text-gray-500" />
        </h1>
      )}
    </div>
  );
};

export default TitleForm;
