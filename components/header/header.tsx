'use client';

import { UserButton } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import TitleForm from './title-form';

const Header: React.FC = () => {
  const params = useParams();
  const noteId = params?.id as string | undefined; // Ensure we get a string

  if (!noteId) {
    return <div>Loading...</div>;
  }

  // Cast noteId to Convex ID type safely
  const documentId = noteId as Id<"documents">;

  const note = useQuery(api.documents.getDocumentById, { id: documentId });

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <header className="border-b py-6 px-4 w-full">
      <div className="mx-auto flex justify-between items-center max-w-screen-xl">
        <div className="ml-10 lg:ml-0">
          <TitleForm noteId={documentId} noteTitle={note?.title || 'Untitled'} />
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
