import { useStore } from '@nanostores/react';
import { themeStore, toggleTheme } from '~/stores/theme';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitcher() {
  const theme = useStore(themeStore);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
