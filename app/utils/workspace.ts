import type { FileNode } from '~/stores/files';

interface WorkspaceState {
  files: FileNode[];
  openFiles: string[];
  activeFile: string | null;
  terminalHistory: any[];
  editorState: any;
}

export async function saveWorkspace(): Promise<void> {
  const workspace: WorkspaceState = {
    files: filesStore.get().tree,
    openFiles: [],
    activeFile: filesStore.get().selectedFile,
    terminalHistory: terminalStore.get().history,
    editorState: editorStore.get(),
  };

  try {
    localStorage.setItem('workspace', JSON.stringify(workspace));
    await syncToCloud(workspace);
  } catch (error) {
    console.error('Failed to save workspace:', error);
  }
}

export async function loadWorkspace(): Promise<void> {
  try {
    const local = localStorage.getItem('workspace');
    const workspace = local ? JSON.parse(local) : null;
    
    if (workspace) {
      filesStore.set({ 
        tree: workspace.files,
        selectedFile: workspace.activeFile,
        expandedFolders: new Set()
      });
      
      editorStore.set(workspace.editorState);
      
      terminalStore.set({
        ...terminalStore.get(),
        history: workspace.terminalHistory
      });
    }
  } catch (error) {
    console.error('Failed to load workspace:', error);
  }
}

async function syncToCloud(workspace: WorkspaceState): Promise<void> {
  // Implement cloud sync logic here
}
