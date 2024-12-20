import { useEffect, useState } from 'react';
import { Link } from "@remix-run/react";
import { useStore } from "nanostores";
import { uiStore } from '../stores/ui';

interface FileItemProps {
    file: any;
    isSelected: boolean;
    onSelect: () => void;
}

export function FileItem({ file, isSelected, onSelect }: FileItemProps) {
     const ui = useStore(uiStore);
    return (
          <Link to={`/${file.id}`} className={`block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-150 ease-in-out ${isSelected ? 'bg-gray-200 dark:bg-gray-600' : ''}`} onClick={onSelect}>
            <div className="flex items-center justify-between">
               <p className="text-sm text-gray-800 dark:text-gray-300 truncate">{file.name}</p>
              </div>
          </Link>
    );
}