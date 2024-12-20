import { SplitPanel } from "~/components/SplitPanel";
import { FileTree } from "~/components/FileTree";
import { Terminal } from "~/components/Terminal";
import { ChatInterface } from "~/components/ChatInterface";
import { Empty } from "~/components/Empty";
import { useStore } from "nanostores/react";
import { uiStore } from "~/stores/ui";

export default function Index() {
   const ui = useStore(uiStore);

  return (
    <div className="h-full flex flex-col">
         <SplitPanel leftContent={<FileTree />} rightContent={
           <Empty text="Select a file to start editing" />
         } initialWidth="25%" minWidth={200} maxWidth={400}/>
           <SplitPanel leftContent={<Terminal />} rightContent={<ChatInterface />} initialWidth="50%" minWidth={300} maxWidth={800} />
    </div>
  );
}