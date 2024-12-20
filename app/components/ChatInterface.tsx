import { useState, useRef, useEffect } from 'react';
import { useStore } from 'nanostores/react';
import { chatStore } from '../stores/chat';
import { sendAiMessage } from '../utils/ai';
import { uiStore } from '../stores/ui';
import { Loading } from './Loading';

export function ChatInterface() {
  const [newMessage, setNewMessage] = useState('');
  const chat = useStore(chatStore);
    const ui = useStore(uiStore);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
   const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

    const handleSendMessage = async (e:React.FormEvent) => {
      e.preventDefault()
        if (!newMessage) return;
        setLoading(true);
       chatStore.set([...chat, { role: 'user', content: newMessage }]);
      try {
       const response = await sendAiMessage(newMessage, chat);
        if(response) {
           chatStore.set(prev => [...prev, { role: 'assistant', content: response} ])
        }
      }
      catch(e) {
           chatStore.set(prev => [...prev, { role: 'assistant', content: "Something went wrong"} ])
      }
      finally {
         setLoading(false)
      }

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {chat.map((message, index) => (
          <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block rounded-lg py-2 px-4 ${message.role === 'user'
                  ? `bg-primary text-white `
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 '}`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && <div className="mb-3 text-left">
            <div className="inline-block rounded-lg py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
             <Loading />
            </div>
          </div>
        }
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 border rounded p-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-primary dark:focus:border-primary bg-gray-100 dark:bg-gray-800"
          />
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded transition-colors duration-200 ease-in-out">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}