'use client';

import Header from '@/components/header/header';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';
import { Id } from '@/convex/_generated/dataModel';
import ToolBar from '@/components/toolbar/toolbar';
import EditorComponent from '@/components/blocknote/editor';

const SingleNotePage = () => {
  const params = useParams();
  const noteId = params?.id as string;

  if (!noteId) {
    return <div className="text-center text-red-500 mt-10">Invalid Note ID</div>;
  }

  // Fetch the note using Convex API
  const documentId: Id<"documents"> = noteId as Id<"documents">;
  const note = useQuery(api.documents.getDocumentById, { id: documentId });

  if (note === undefined) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!note) {
    return <div className="text-center text-red-500 mt-10">Note not found</div>;
  }

  return (
    <div className="w-full">
      <Header />
      <div className="p-6">
        <div className="max-w-screen-xl mx-auto">
          {note && <ToolBar initialData={note} />}
        </div>
        <div className="max-w-screen-xl mx-auto pt-8">
        <EditorComponent 
            noteId={note._id} 
            initialContent={note.content || ''} 
            editable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleNotePage;
