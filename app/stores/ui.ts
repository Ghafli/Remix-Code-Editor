import { atom } from 'nanostores';

interface UIState {
  theme: 'light' | 'dark';
}

export const uiStore = atom<UIState>({
   theme: 'light'
});