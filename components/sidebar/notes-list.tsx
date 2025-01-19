'use client';

import React from 'react';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useParams, useRouter } from 'next/navigation';
import { FiImage } from 'react-icons/fi';
import NoteItem from './note-item';

interface Props {
  noteId?: Id<"documents">;
  data: Doc<"documents">[];  // Receive filtered data from parent component
}

const NoteList = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams();

  const onRedirect = (noteId: string) => {
    router.push(`/dashboard/${noteId}`);
  };

  return (
    <div className="mt-4">
      {data.length > 0 ? (
        data.map((note) => {
          
          return (
            <div key={note._id}>
              <NoteItem
                label={note.title}
                icon={FiImage}
                id={note._id}
                userId={note.userId}
              />
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm mt-4">No notes found.</p>
      )}
    </div>
  );
};

export default NoteList;
