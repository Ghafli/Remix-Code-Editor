import { atom } from 'nanostores';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileNode[];
  parent?: string;
}

export interface FilesStore {
  tree: FileNode[];
  selectedFile: string | null;
  expandedFolders: Set<string>;
}

export const filesStore = atom<FilesStore>({
  tree: [],
  selectedFile: null,
  expandedFolders: new Set(),
});
