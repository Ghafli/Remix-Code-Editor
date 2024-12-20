import { useStore } from '@nanostores/react';
import { filesStore, type FileNode } from '~/stores/files';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';

interface FileTreeItemProps {
  node: FileNode;
  depth: number;
}

function FileTreeItem({ node, depth }: FileTreeItemProps) {
  const { selectedFile, expandedFolders } = useStore(filesStore);
  
  const toggleFolder = (id: string) => {
    const store = filesStore.get();
    const newExpanded = new Set(store.expandedFolders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    filesStore.set({ ...store, expandedFolders: newExpanded });
  };

  const selectFile = (id: string) => {
    filesStore.set({ ...filesStore.get(), selectedFile: id });
  };

  const isExpanded = expandedFolders.has(node.id);
  const isSelected = selectedFile === node.id;

  return (
    <div>
      <div
        className={`flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''
        }`}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={() => node.type === 'directory' ? toggleFolder(node.id) : selectFile(node.id)}
      >
        {node.type === 'directory' && (
          isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
        {node.type === 'directory' ? (
          <Folder className="w-4 h-4 ml-1" />
        ) : (
          <File className="w-4 h-4 ml-1" />
        )}
        <span className="ml-2">{node.name}</span>
      </div>
      
      {node.type === 'directory' && isExpanded && node.children?.map((child) => (
        <FileTreeItem key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function FileTree() {
  const { tree } = useStore(filesStore);

  return (
    <div className="h-full overflow-y-auto">
      {tree.map((node) => (
        <FileTreeItem key={node.id} node={node} depth={0} />
      ))}
    </div>
  );
}
