import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { chatStore, addMessage } from '~/stores/chat';
import { MessageSquare, Send, X, Loader } from 'lucide-react';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, isOpen, isLoading } = useStore(chatStore);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    addMessage(userMessage, 'user');
    
    chatStore.set({ ...chatStore.get(), isLoading: true });
    
    try {
      // Here we'll integrate with Claude API later
      const response = "I'm here to help! (API integration pending)";
      addMessage(response, 'assistant');
    } catch (error) {
      addMessage('Sorry, there was an error processing your request.', 'assistant');
    } finally {
      chatStore.set({ ...chatStore.get(), isLoading: false });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white dark:bg-gray-800 flex flex-col shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <button
          onClick={() => chatStore.set({ ...chatStore.get(), isOpen: false })}
          className="hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask a question..."
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
