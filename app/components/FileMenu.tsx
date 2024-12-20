import { useState, useEffect, useRef } from "react";
import { useStore } from "nanostores";
import { filesStore } from "../stores/files";
import { uiStore } from "../stores/ui";
import { FileContextMenu } from "./FileContextMenu";
import { fileStore } from "../stores/files";

interface FileMenuProps {
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
}

export function FileMenu({ selectedId, setSelectedId }: FileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
   const ui = useStore(uiStore);
    const files = useStore(filesStore);
  const [file, setFile] = useState<any>(null);

    useEffect(() => {
      if(selectedId) {
        setFile(files.find(f => f.id === selectedId));
      } else {
        setFile(null)
      }
    }, [selectedId, files])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

   const handleFileDelete = () => {
       if(selectedId) {
         filesStore.set(files.filter(f => f.id !== selectedId));
          setSelectedId(null);
       }
     setIsOpen(false);
    }


  return (
    <>
        {selectedId && (
             <div  ref={menuRef} className="absolute top-0 right-0">
             <button onClick={handleMenuClick} className={`text-gray-500 dark:text-gray-400  hover:text-gray-700 dark:hover:text-gray-300 transition duration-150 ease-in-out`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
            {isOpen && <FileContextMenu onClose={() => setIsOpen(false)} onDelete={handleFileDelete} file={file} />
             }
        </div>
        )}
    </>
  );
}