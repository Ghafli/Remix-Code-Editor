import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { editorStore } from '~/stores/editor';

let doc: Y.Doc;
let provider: WebrtcProvider;
let persistence: IndexeddbPersistence;

export async function initializeCollaboration(projectId: string) {
  doc = new Y.Doc();
  
  // Connect to other peers
  provider = new WebrtcProvider(projectId, doc);
  
  // Persist document locally
  persistence = new IndexeddbPersistence(projectId, doc);
  
  // Create shared types
  const sharedContent = doc.getText('content');
  
  // Listen for changes
  sharedContent.observe(event => {
    editorStore.set({
      ...editorStore.get(),
      content: sharedContent.toString()
    });
  });

  return {
    doc,
    provider,
    sharedContent
  };
}

export function updateSharedContent(content: string) {
  const sharedContent = doc.getText('content');
  sharedContent.delete(0, sharedContent.length);
  sharedContent.insert(0, content);
}

export function getCollaborators() {
  return Array.from(provider.awareness.getStates().values())
    .map((state: any) => ({
      id: state.id,
      name: state.user?.name || 'Anonymous',
      color: state.user?.color,
      cursor: state.cursor
    }));
}

export function updateUserInfo(info: { name: string; color: string }) {
  provider.awareness.setLocalStateField('user', info);
}
