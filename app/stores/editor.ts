import { atom } from 'nanostores';
import type { EditorState } from '@codemirror/state';

export interface EditorStore {
  content: string;
  language: string;
  currentFile: string | null;
  editorState?: EditorState;
}

export const editorStore = atom<EditorStore>({
  content: '',
  language: 'javascript',
  currentFile: null,
});
