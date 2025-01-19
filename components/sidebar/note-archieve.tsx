'use client';

import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FiRefreshCw } from 'react-icons/fi';
import { toast } from 'sonner';

const NoteArchive = () => {
  const archivedNotes = useQuery(api.documents.getArchive);
  const restoreDocument = useMutation(api.documents.restoreDocument);

  const handleRestore = async (id: string) => {
    try {
      await restoreDocument({ id });
      toast('Document restored successfully!');
    } catch (error) {
      console.error('Error restoring document:', error);
      toast('Failed to restore document.');
    }
  };

  return (
    <div className="">
      {archivedNotes ? (
        archivedNotes.length > 0 ? (
          archivedNotes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-2"
            >
              <span className="text-gray-700">{note.title}</span>
              <button
                onClick={() => handleRestore(note._id)}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <FiRefreshCw className="mr-1" />
                Restore
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No archived notes found.</p>
        )
      ) : (
        <p className="text-gray-500">Loading archived notes...</p>
      )}
    </div>
  );
};

export default NoteArchive;
