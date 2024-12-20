import { SplitPanel } from "~/components/SplitPanel";
import { FileTree } from "~/components/FileTree";
import { Terminal } from "~/components/Terminal";
import { ChatInterface } from "~/components/ChatInterface";
import { CodeEditor } from "~/components/CodeEditor";
import { DiffView } from "~/components/DiffView";
import { useParams } from "@remix-run/react";
import { useStore } from "nanostores";
import { uiStore } from "~/stores/ui";
import { fileStore } from "~/stores/files";
import { useEffect, useState } from "react";

export default function FileRoute() {
  const { fileId } = useParams();
   const ui = useStore(uiStore);
  const file = useStore(fileStore);
  const [selectedTab, setSelectedTab] = useState<'editor' | 'diff'>('editor')


  useEffect(() => {
    if (fileId) {
     fileStore.set(fileId)
    }
  }, [fileId]);

  if(!fileId) return null;

  return (
    <div className="h-full flex flex-col">
      <SplitPanel leftContent={<FileTree />} rightContent={
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-end  border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setSelectedTab('editor')} className={`px-4 py-2 ${selectedTab === 'editor' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : ' text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}  transition duration-150 ease-in-out`}>
                Editor
             </button>
             <button onClick={() => setSelectedTab('diff')} className={`px-4 py-2 ${selectedTab === 'diff' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'} transition duration-150 ease-in-out`}>
                 Diff
            </button>
           </div>
         <div className="h-full">
              {selectedTab === 'editor' ? <CodeEditor fileId={fileId} /> :  <DiffView fileId={fileId} />}
           </div>
         </div>
      } initialWidth="25%" minWidth={200} maxWidth={400}/>
      <SplitPanel leftContent={<Terminal />} rightContent={<ChatInterface />} initialWidth="50%" minWidth={300} maxWidth={800} />
    </div>
  );
}