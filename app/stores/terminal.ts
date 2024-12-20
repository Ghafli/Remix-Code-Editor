import { atom } from 'nanostores';

export interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  timestamp: number;
}

export interface TerminalStore {
  history: TerminalCommand[];
  isOpen: boolean;
}

export const terminalStore = atom<TerminalStore>({
  history: [],
  isOpen: false,
});

export const addCommand = (command: string, output: string) => {
  const store = terminalStore.get();
  terminalStore.set({
    ...store,
    history: [...store.history, {
      id: crypto.randomUUID(),
      command,
      output,
      timestamp: Date.now(),
    }],
  });
};
