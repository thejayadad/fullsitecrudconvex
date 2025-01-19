'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { FiTrash2 } from 'react-icons/fi';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

interface Props {
  id?: Id<"documents">;
  label: string;
  icon: IconType;
  userId: string; // The owner of the document
}

const NoteItem = ({ id, label, icon: Icon, userId }: Props) => {
  const pathname = usePathname();
  const archiveDocument = useMutation(api.documents.toggleArchive);
  const { user } = useUser();

  const handleArchive = async (documentId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the link
    try {
      await archiveDocument({ id: documentId });
      toast("Document archived successfully");
    } catch (error) {
      console.log("Error archiving document:" + error);
    }
  };

  // Check if the current page is active
  const isActive = pathname === `/dashboard/${id}`;
  
  // Correct comparison of Clerk user ID with document userId
  const isOwner = user?.id === userId;

  return (
    <Link href={`/dashboard/${id}`}>
      <div
        className={`flex mb-2 items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
          isActive ? 'bg-secondary/10 text-primary' : 'hover:bg-gray-200 text-gray-800'
        } group`}
      >
        <Icon className="h-5 w-5 text-gray-600" />
        <span className="truncate ml-2 flex-1">{label}</span>

        {/* Show delete button only if the logged-in user is the owner */}
        {isOwner && (
          <button
            onClick={(e) => handleArchive(id!, e)}
            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <FiTrash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
          </button>
        )}
      </div>
    </Link>
  );
};

export default NoteItem;
