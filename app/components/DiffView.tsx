import { useEffect, useState } from "react";
import { diffLines } from "diff";
import { useStore } from 'nanostores/react';
import { editorStore } from "../stores/editor";
import { filesStore } from "../stores/files";
import { uiStore } from "../stores/ui";


interface DiffViewProps {
    fileId: string;
}

export function DiffView({ fileId }: DiffViewProps) {
  const editor = useStore(editorStore);
    const files = useStore(filesStore);
  const [diff, setDiff] = useState<any[]>([]);
  const ui = useStore(uiStore);

  useEffect(() => {
    if (!fileId) return;
      const file = files.find(f => f.id === fileId);
        if (!file) return;
      const current = editor.fileId === fileId ? editor.content : file.content;

    const changes = diffLines(file.content, current);
    setDiff(changes);
  }, [fileId, editor, files, ui.theme]);


  return (
    <div className="h-full w-full overflow-y-auto p-4 text-sm font-mono whitespace-pre-wrap">
      {diff.map((part:any, index:number) => (
        <span key={index} style={{ backgroundColor: part.added ? 'rgba(0, 255, 0, 0.2)' : part.removed ? 'rgba(255, 0, 0, 0.2)' : 'transparent'}}>
          {part.value}
        </span>
      ))}
    </div>
  );
}