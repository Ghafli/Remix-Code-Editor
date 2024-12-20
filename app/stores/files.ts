import { atom, computed } from 'nanostores';
import { v4 as uuid } from 'uuid';

interface File {
    id: string;
    name: string;
    content: string;
    extension: string
}

const initialFiles = [
  {
    id: uuid(),
    name: "index.js",
    content: "console.log('Hello world')",
    extension: "js"
  }
]

export const filesStore = atom<File[]>(initialFiles);
export const fileStore = atom<string | null>(null);

export const currentFile = computed(fileStore, (fileId) => {
  if(!fileId) return null;
  return filesStore.get().find(f => f.id === fileId)
})