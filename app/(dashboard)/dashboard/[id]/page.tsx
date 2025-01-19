'use client';

import Header from '@/components/header/header';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';
import { Id } from '@/convex/_generated/dataModel';
import ToolBar from '@/components/toolbar/toolbar';

const SingleNotePage = () => {
  const params = useParams();
  const noteId = params?.id as string | undefined; // Get note ID from URL

  // Fetch the note using Convex API
  const documentId = noteId as Id<"documents">;
  const note = useQuery(api.documents.getDocumentById, { id: documentId });

  if (note === undefined) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!note) {
    return <div className="text-center text-red-500 mt-10">Note not found</div>;
  }

  if(note === null){
    return <div>Not Found</div>
  }

  return (
    <div className="w-full">
      <Header 
      />
      <div className="p-6">
        <div className='max-w-screen-xl mx-auto'>
        {note ? <ToolBar initialData={note} /> : <div>Loading note...</div>}

        </div>
      </div>
    </div>
  );
};

export default SingleNotePage;
