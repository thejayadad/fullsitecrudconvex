import React from 'react';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams, useRouter } from 'next/navigation';
import ActionItem from './action-item';
import { FiImage } from 'react-icons/fi';

interface Props {
  noteId?: Id<"documents">;
  data?: Doc<"documents">[];
}

const NoteList = ({ noteId }: Props) => {
  const router = useRouter();
  const params = useParams();
  const notes = useQuery(api.documents.get);

  const onRedirect = (noteId: string) => {
    router.push(`/dashboard/${noteId}`);
  };

  return (
    <>
      {notes?.map((note) => {
        // Convert Convex ID to string for proper comparison
        const isActive = params.noteId === note._id.toString();
        console.log("Current Param ID:", params.noteId);
        console.log("Note ID:", note._id.toString());
        console.log("Is Active:", isActive);

        return (
          <div key={note._id}>
            <ActionItem
              id={note._id}
              label={note.title}
              icon={FiImage}
              onClick={() => onRedirect(note._id)}
              active={isActive}
            />
          </div>
        );
      })}
    </>
  );
};

export default NoteList;
