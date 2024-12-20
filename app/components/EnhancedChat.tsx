import { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { chatStore, addMessage } from '~/stores/chat';
import { getCodeSuggestion, analyzeCode } from '~/utils/ai';
import { editorStore } from '~/stores/editor';
import { MessageSquare, Code, Send, X, Loader } from 'lucide-react';

interface CodeSuggestion {
  code: string;
  explanation: string;
}

export default function EnhancedChat() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<CodeSuggestion[]>([]);
  const { messages, isOpen, isLoading } = useStore(chatStore);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    addMessage(userMessage, 'user');
    
    chatStore.set({ ...chatStore.get(), isLoading: true });
    
    try {
      const suggestion = await getCodeSuggestion(userMessage);
      setSuggestions([...suggestions, suggestion]);
      addMessage(suggestion.explanation, 'assistant');
    } catch (error) {
      addMessage('Sorry, I encountered an error while processing your request.', 'assistant');
    } finally {
      chatStore.set({ ...chatStore.get(), isLoading: false });
    }
  };

  const applySuggestion = (code: string) => {
    editorStore.set({
      ...editorStore.get(),
      content: code
    });
  };

  const analyzeCurrentCode = async () => {
    const currentCode = editorStore.get().content;
    chatStore.set({ ...chatStore.get(), isLoading: true });
    
    try {
      const analysis = await analyzeCode(currentCode);
      addMessage(analysis, 'assistant');
    } catch (error) {
      addMessage('Sorry, I encountered an error while analyzing the code.', 'assistant');
    } finally {
      chatStore.set({ ...chatStore.get(), isLoading: false });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-96 bg-white dark:bg-gray-800 flex flex-col shadow-xl rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={analyzeCurrentCode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Analyze current code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => chatStore.set({ ...chatStore.get(), isOpen: false })}
            className="hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {message.content}
              {message.role === 'assistant' && suggestions.length > 0 && (
                <div className="mt-2">
                  <button
                    onClick={() => applySuggestion(suggestions[suggestions.length - 1].code)}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
                  >
                    Apply suggestion
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask for code suggestions..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
