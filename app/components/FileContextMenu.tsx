import { useState } from 'react';
import { createFile, createDirectory, deleteFileOrDirectory, renameFileOrDirectory } from '~/utils/file';
import { MoreVertical, File, Folder, Trash, Edit } from 'lucide-react';

interface FileContextMenuProps {
  path: string;
  type: 'file' | 'directory';
}

export default function FileContextMenu({ path, type }: FileContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = async (type: 'file' | 'directory') => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;

    const newPath = `${path}/${name}`;
    try {
      if (type === 'file') {
        await createFile(newPath);
      } else {
        await createDirectory(newPath);
      }
    } catch (error) {
      console.error('Failed to create:', error);
    }
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await deleteFileOrDirectory(path);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
    setIsOpen(false);
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newPath = path.replace(/[^/]+$/, newName);
    try {
      await renameFileOrDirectory(path, newPath);
    } catch (error) {
      console.error('Failed to rename:', error);
    }
    setIsRenaming(false);
    setNewName('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          {type === 'directory' && (
            <>
              <button
                onClick={() => handleCreate('file')}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <File className="w-4 h-4" />
                New File
              </button>
              <button
                onClick={() => handleCreate('directory')}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Folder className="w-4 h-4" />
                New Folder
              </button>
            </>
          )}
          <button
            onClick={() => setIsRenaming(true)}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit className="w-4 h-4" />
            Rename
          </button>
          <button
            onClick={handleDelete}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Trash className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}

      {isRenaming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleRename}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg"
          >
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="New name"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsRenaming(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Rename
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
