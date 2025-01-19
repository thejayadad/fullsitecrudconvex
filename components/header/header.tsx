'use client';

import { UserButton } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TitleForm from './title-form';

const Header: React.FC = () => {
  const params = useParams();
  const noteId = params?.id as string; // Extract the note ID from URL params
  const note = useQuery(api.documents.getDocumentById, { id: noteId });

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <header className="border-b py-6 px-4 w-full">
      <div className="mx-auto flex justify-between items-center max-w-screen-xl">
        <div className="ml-10 lg:ml-0">
          <TitleForm noteId={noteId} noteTitle={note?.title || 'Untitled'} />
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
