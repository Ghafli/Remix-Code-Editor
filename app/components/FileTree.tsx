import { useState } from "react";
import { useStore } from "nanostores";
import { filesStore } from "../stores/files";
import { v4 as uuid } from "uuid";
import { FileItem } from "./FileItem";
import { uiStore } from "../stores/ui";
import { Input } from "../components/Modal";
import { FileMenu } from "./FileMenu";
import { Empty } from "./Empty";

export function FileTree() {
    const files = useStore(filesStore);
    const [newFileName, setNewFileName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const ui = useStore(uiStore);

    const createNewFile = () => {
      setIsCreating(true)
    }

    const handleCreateFile = (e:React.FormEvent) => {
        e.preventDefault()
         if (!newFileName) return;
          const newFile = {
              id: uuid(),
              name: newFileName,
              content: "",
              extension: newFileName.split(".").pop() || "",
          }
        filesStore.set([...files, newFile])
        setNewFileName("")
        setIsCreating(false);
    }

    const handleCancelCreate = () => {
      setIsCreating(false)
    }


    return (
        <div className="w-full h-full relative">
             { isCreating && (
              <Modal onClose={handleCancelCreate} title="Create new file" onSubmit={handleCreateFile}>
                 <Input label="File name" value={newFileName} onChange={e => setNewFileName(e.target.value)} />
              </Modal>
            )}
              <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
               <h3 className="text-gray-800 dark:text-gray-200 font-bold">Files</h3>
                <button  onClick={createNewFile} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition duration-150 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </button>
           </div>
          <div className="h-full overflow-y-auto">
             {files.length === 0 ?
             <Empty text="No files yet. Create new one to start" /> :
               files.map(file => (
                 <FileItem key={file.id} file={file} isSelected={selectedId === file.id} onSelect={() => setSelectedId(file.id)} />
               ))
             }
           </div>
           <FileMenu selectedId={selectedId} setSelectedId={setSelectedId}/>
      </div>
    );
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function Modal({ title, children, onClose, onSubmit }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg relative">
           <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition duration-150 ease-in-out" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
         <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>
           <form onSubmit={onSubmit}>
            {children}
            <div className="mt-4 flex justify-end space-x-2">
             <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-150 ease-in-out">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition duration-150 ease-in-out">Create</button>
             </div>
           </form>
       </div>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ label, value, onChange }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
         className="w-full border border-gray-300 dark:border-gray-500 rounded p-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-primary dark:focus:border-primary"
      />
    </div>
  );
}