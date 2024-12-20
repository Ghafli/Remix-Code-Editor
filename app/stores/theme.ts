import { atom } from 'nanostores';

export type Theme = 'light' | 'dark';

export const themeStore = atom<Theme>('light');

export const toggleTheme = () => {
  themeStore.set(themeStore.get() === 'light' ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark');
};
