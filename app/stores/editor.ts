import { atom } from 'nanostores';

interface EditorState {
  content: string;
  fileId: string | null
}

export const editorStore = atom<EditorState>({
    content: "",
    fileId: null
});

export const setEditorContent = (content: string, fileId: string) => {
   editorStore.set({ content, fileId})
}