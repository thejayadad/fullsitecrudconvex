'use client';

import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import Logo from '../logo';
import { FiChevronLeft, FiChevronRight, FiPlusCircle, FiSearch } from 'react-icons/fi';
import ActionItem from './action-item';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import NoteList from './notes-list';
import NoteArchive from './note-archieve';

const SideBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const create = useMutation(api.documents.create);
  const onCreate = () => {
    const promise = create({ title: 'Untitled' });
    toast.promise(promise, {
      loading: 'Creating a document...',
      success: 'New document created!',
      error: 'Failed to create a document.',
    });
  };

  const notes = useQuery(api.documents.getSearch);

  // Filter notes based on search query
  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full">
      <aside
        className={`h-full border-r overflow-y-auto flex flex-col relative z-[99999] transition-all duration-300 ${
          isVisible ? 'w-60 px-4' : 'w-0'
        }`}
      >
        {isVisible && (
          <div className="py-4">
            <div className="flex justify-end w-full px-4">
              <Logo />
            </div>
            <div className="py-8">
              <ActionItem label="New Note" icon={FiPlusCircle} onClick={onCreate} />
              <ActionItem
                label="Search..."
                icon={FiSearch}
                isSearch
                onSearch={(query) => setSearchQuery(query)}
              />
            </div>
            <div className="border-t">
              <h2 className="font-medium leading-8">Note List</h2>
              <NoteList data={filteredNotes || []} />
            </div>
            <div className="border-t">
              <h2 className="font-medium leading-8">Archived</h2>
              <NoteArchive />
            </div>
          </div>
        )}
      </aside>
      <button
        onClick={handleToggle}
        className="absolute top-4 left-3 z-[100000] bg-primary p-1 border rounded-full shadow-md"
      >
        {isVisible ? (
          <FiChevronLeft className="h-6 w-6 text-gray-700" />
        ) : (
          <FiChevronRight className="h-6 w-6 text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default SideBar;
