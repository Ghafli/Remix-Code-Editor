import { json } from '@remix-run/cloudflare';
import type { LoaderFunction } from '@remix-run/cloudflare';
import SplitPanel from '~/components/SplitPanel';
import FileTree from '~/components/FileTree';
import CodeEditor from '~/components/CodeEditor';

export const loader: LoaderFunction = async () => {
  return json({});
};

export default function Index() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-12 border-b flex items-center px-4">
        <h1 className="text-xl font-bold">Code Editor</h1>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <SplitPanel
          left={<FileTree />}
          right={<CodeEditor />}
        />
      </main>
    </div>
  );
}
