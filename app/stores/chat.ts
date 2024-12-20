import { atom } from 'nanostores';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const chatStore = atom<ChatMessage[]>([])