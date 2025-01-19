'use client';

import Header from '@/components/header/header';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';

const SingleNotePage = () => {
  const params = useParams();
  const noteId = params?.id; // Get note ID from URL

  // Fetch the note using Convex API
  const note = useQuery(api.documents.getDocumentById, { id: noteId });

  if (note === undefined) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!note) {
    return <div className="text-center text-red-500 mt-10">Note not found</div>;
  }

  return (
    <div className="w-full">
      <Header 
        initialTitle={note.title}
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <p className="text-lg text-gray-600 mt-4">{note.userId || 'No content available'}</p>
      </div>
    </div>
  );
};

export default SingleNotePage;
