'use client';

import React, { useEffect, useCallback } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { List, ListOrdered, Heading2, Undo, Redo } from 'lucide-react';

interface Props {
  noteId: string;
  initialContent?: string;
  editable?: boolean;
}

// Debounce function to delay content update
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const EditorComponent: React.FC<Props> = ({ noteId, initialContent = '', editable = true }) => {
  const updateContent = useMutation(api.documents.updateContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Start writing your note...' }),
      Heading.configure({ levels: [1, 2, 3, 4] }),
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: initialContent || '<p>Start writing here...</p>',
    editable: editable,
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  const handleContentUpdate = useCallback(
    debounce(async (newContent: string) => {
      try {
        await updateContent({ id: noteId, content: newContent });
        toast.success('Document saved successfully');
      } catch (error) {
        toast.error('Failed to update document');
        console.error('Failed to update content:', error);
      }
    }, 1000), // Debounce delay of 1 second
    [updateContent, noteId]
  );

  useEffect(() => {
    if (editor) {
      editor.on('update', () => {
        const newContent = editor.getHTML();
        handleContentUpdate(newContent);
      });
    }
  }, [editor, handleContentUpdate]);

  if (!editor) {
    return <p className="text-gray-500">Loading editor...</p>;
  }

  return (
    <div className="p-4 bg-white">
      {/* Toolbar */}
      <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-center gap-5 w-full flex-wrap border border-gray-700 bg-gray-100">
        <div className="flex justify-start items-center gap-3 w-full lg:w-10/12 flex-wrap">
          <ToolbarButton editor={editor} command="toggleBold" isActive={editor.isActive('bold')}>
            Bold
          </ToolbarButton>
          <ToolbarButton editor={editor} command="toggleItalic" isActive={editor.isActive('italic')}>
            Italic
          </ToolbarButton>
          <ToolbarButton editor={editor} command="toggleUnderline" isActive={editor.isActive('underline')}>
            Underline
          </ToolbarButton>
          <ToolbarButton editor={editor} command="toggleBulletList" isActive={editor.isActive('bulletList')}>
            <List className="w-5 h-5" />
          </ToolbarButton>
          <ToolbarButton editor={editor} command="toggleOrderedList" isActive={editor.isActive('orderedList')}>
            <ListOrdered className="w-5 h-5" />
          </ToolbarButton>
          <ToolbarButton
            editor={editor}
            command="setHeading"
            level={2}
            isActive={editor.isActive('heading', { level: 2 })}
          >
            <Heading2 className="w-5 h-5" />
          </ToolbarButton>
          <ToolbarButton editor={editor} command="undo">
            <Undo className="w-5 h-5" />
          </ToolbarButton>
          <ToolbarButton editor={editor} command="redo">
            <Redo className="w-5 h-5" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all min-h-[200px]"
      />
    </div>
  );
};

// Toolbar Button Component
type ToolbarButtonProps = {
  editor: Editor;
  command: string;
  level?: number;
  children: React.ReactNode;
  isActive?: boolean;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ editor, command, level, children, isActive }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (level) {
          editor.chain().focus()[command]({ level }).run();
        } else {
          editor.chain().focus()[command]().run();
        }
      }}
      className={`p-2 rounded-lg transition ${
        isActive ? 'bg-sky-700 text-white' : 'text-sky-400 hover:bg-sky-700 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
};

export default EditorComponent;
