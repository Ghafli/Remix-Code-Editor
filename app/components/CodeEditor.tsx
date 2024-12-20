import {
    EditorView,
    highlightSpecialChars,
    drawSelection,
    dropCursor,
    lineNumbers,
    highlightActiveLine,
    keymap,
  } from "@codemirror/view";
  import { EditorState } from "@codemirror/state";
  import { indentWithTab } from "@codemirror/commands";
  import {
    javascript,
    typescript,
    json,
    html,
    css,
    markdown,
    python
  } from "@codemirror/lang-javascript";
  import { github } from "@uiw/codemirror-theme-github";
  import { useEffect, useRef } from "react";
  import { useStore } from "nanostores";
  import { editorStore } from "../stores/editor";
  import { filesStore } from "../stores/files";
  import { uiStore } from "../stores/ui";
  
  interface CodeEditorProps {
    fileId: string;
  }
  
  export function CodeEditor({ fileId }: CodeEditorProps) {
      const editorRef = useRef<HTMLDivElement | null>(null);
      const editor = useStore(editorStore);
      const files = useStore(filesStore);
      const ui = useStore(uiStore);
  
  
      useEffect(() => {
          if (!editorRef.current) return;
  
          const file = files.find(f => f.id === fileId);
          if (!file) return;
  
          let language = javascript();
          switch (file.extension) {
              case 'js':
                  language = javascript();
                  break;
              case 'jsx':
                  language = javascript({ jsx: true });
                  break;
              case 'ts':
                  language = typescript();
                  break;
              case 'tsx':
                  language = typescript({ jsx: true });
                  break;
              case 'json':
                  language = json();
                  break;
              case 'html':
                  language = html();
                  break;
              case 'css':
                  language = css();
                   break;
              case 'md':
                  language = markdown();
                   break;
              case 'py':
                   language = python();
                  break;
               default:
                 language = javascript();
          }
  
  
          const state = EditorState.create({
              doc: file.content,
              extensions: [
                  lineNumbers(),
                  highlightSpecialChars(),
                  drawSelection(),
                  dropCursor(),
                  highlightActiveLine(),
                  language,
                  keymap.of([indentWithTab]),
                  github,
                  EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                       editorStore.set({ content: update.state.doc.toString() , fileId});
                    }
                   }),
                  EditorView.theme({
                    ".cm-content": {
                      height: "100%"
                    },
                   ".cm-editor": {
                      height: "100%",
                    },
                  }),
              ],
          });
  
  
          const view = new EditorView({
              state,
              parent: editorRef.current,
              
          });
              
          return () => {
              view.destroy();
          };
  
      }, [fileId, files, ui.theme]);
  
      return (
           <div ref={editorRef} className="h-full w-full"></div>
      );
  }