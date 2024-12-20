import { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { terminalStore, addCommand } from '~/stores/terminal';
import { Terminal as TerminalIcon, X } from 'lucide-react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const { history, isOpen } = useStore(terminalStore);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      try {
        // Here we'll integrate with WebContainer API later
        const output = `Command '${input}' executed`;
        addCommand(input, output);
        setInput('');
      } catch (error) {
        addCommand(input, String(error));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-64 bg-gray-900 text-gray-100 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <button
          onClick={() => terminalStore.set({ ...terminalStore.get(), isOpen: false })}
          className="hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {history.map((entry) => (
          <div key={entry.id} className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span>{entry.command}</span>
            </div>
            <div className="ml-4 text-gray-400 whitespace-pre-wrap">
              {entry.output}
            </div>
          </div>
        ))}
      </div>
      <div className="h-64 bg-gray-900 text-gray-100 flex flex-col"></div>
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800">
        <span className="text-green-400">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none"
          placeholder="Enter command..."
        />
      </div>
    </div>
  );
}
