import { useState } from "react";
import { useStore } from 'nanostores/react';
import { filesStore } from "../stores/files";
import { uiStore } from "../stores/ui";
import { Modal, Input } from "./Modal";

interface FileContextMenuProps {
    onClose: () => void;
    onDelete: () => void;
    file: any;
}

export function FileContextMenu({ onClose, onDelete, file }: FileContextMenuProps) {
  const ui = useStore(uiStore);
    const [isEditing, setIsEditing] = useState(false)
    const [newFileName, setNewFileName] = useState(file.name);

    const files = useStore(filesStore);

    const handleEditFile = () => {
      setIsEditing(true)
    }

    const handleCancelEdit = () => {
       setIsEditing(false);
       onClose();
    }


    const handleEditFileName = (e: React.FormEvent) => {
       e.preventDefault();
      if(!newFileName) return;
        const updatedFile = {
          ...file,
           name: newFileName,
          extension: newFileName.split(".").pop() || "",
        }
     filesStore.set(files.map((f:any) => f.id === file.id ? updatedFile : f));
      setIsEditing(false);
        onClose();
    }

  return (
    <div className={`absolute top-6 right-0 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-md `}>
        { isEditing &&
         (
            <Modal title="Edit file name" onClose={handleCancelEdit} onSubmit={handleEditFileName}>
                <Input label="File name" value={newFileName} onChange={e => setNewFileName(e.target.value)} />
             </Modal>
         )
         }
         <button onClick={handleEditFile} className="w-full block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out border-b border-gray-200 dark:border-gray-600">
            Rename
        </button>
      <button onClick={onDelete} className="w-full block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out">
        Delete
      </button>
    </div>
  );
}