import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useStore } from '@nanostores/react';
import { editorStore } from '~/stores/editor';

export default function CodeEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const editor = useStore(editorStore);
  
  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      doc: editor.content,
      extensions: [
        basicSetup,
        javascript(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            editorStore.set({
              ...editor,
              content: update.state.doc.toString(),
            });
          }
        }),
      ],
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div ref={editorRef} className="h-full" />
    </div>
  );
}
