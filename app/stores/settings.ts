import { atom } from 'nanostores';

export interface ProjectSettings {
  name: string;
  description: string;
  formatOnSave: boolean;
  tabSize: number;
  insertSpaces: boolean;
  autoSave: boolean;
  lintOnChange: boolean;
  theme: {
    editor: string;
    terminal: string;
    ui: 'light' | 'dark' | 'system';
  };
  shortcuts: Record<string, string>;
}

const defaultSettings: ProjectSettings = {
  name: 'Untitled Project',
  description: '',
  formatOnSave: true,
  tabSize: 2,
  insertSpaces: true,
  autoSave: true,
  lintOnChange: true,
  theme: {
    editor: 'github-dark',
    terminal: 'monokai',
    ui: 'system',
  },
  shortcuts: {
    'save': 'mod+s',
    'format': 'mod+shift+f',
    'find': 'mod+f',
    'replace': 'mod+h',
  },
};

export const settingsStore = atom<ProjectSettings>(defaultSettings);

export function updateSettings(updates: Partial<ProjectSettings>) {
  settingsStore.set({ ...settingsStore.get(), ...updates });
  saveSettings();
}

function saveSettings() {
  localStorage.setItem('project-settings', JSON.stringify(settingsStore.get()));
}

export function loadSettings() {
  const saved = localStorage.getItem('project-settings');
  if (saved) {
    settingsStore.set({ ...defaultSettings, ...JSON.parse(saved) });
  }
}
