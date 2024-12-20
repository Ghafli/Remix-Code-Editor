import { atom } from 'nanostores';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface ChatStore {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
}

export const chatStore = atom<ChatStore>({
  messages: [],
  isOpen: false,
  isLoading: false,
});

export const addMessage = (content: string, role: 'user' | 'assistant') => {
  const store = chatStore.get();
  chatStore.set({
    ...store,
    messages: [...store.messages, {
      id: crypto.randomUUID(),
      content,
      role,
      timestamp: Date.now(),
    }],
  });
};
