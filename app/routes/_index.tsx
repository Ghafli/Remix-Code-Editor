import { json } from '@remix-run/cloudflare';
import type { LoaderFunction } from '@remix-run/cloudflare';
import SplitPanel from '~/components/SplitPanel';
import FileTree from '~/components/FileTree';
import CodeEditor from '~/components/CodeEditor';
import Terminal from '~/components/Terminal';
import ChatInterface from '~/components/ChatInterface';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import { Terminal as TerminalIcon, MessageSquare } from 'lucide-react';
import { terminalStore } from '~/stores/terminal';
import { chatStore } from '~/stores/chat';

export const loader: LoaderFunction = async () => {
  return json({});
};

export default function Index() {
  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <header className="h-12 border-b dark:border-gray-700 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold">Code Editor</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => terminalStore.set({ ...terminalStore.get(), isOpen: true })}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <TerminalIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => chatStore.set({ ...chatStore.get(), isOpen: true })}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <ThemeSwitcher />
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <SplitPanel
          left={<FileTree />}
          right={
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <CodeEditor />
              </div>
              <Terminal />
            </div>
          }
        />
      </main>
      
      <div className="fixed right-4 bottom-4">
        <ChatInterface />
      </div>
    </div>
  );
}
