import { useEffect, useState } from "react";
import { useStore } from "nanostores";
import { uiStore } from "../stores/ui";
import { FaSun, FaMoon } from "react-icons/fa";


export function ThemeSwitcher() {
    const ui = useStore(uiStore);
    const [theme, setTheme] = useState(ui.theme);

    useEffect(() => {
        setTheme(ui.theme);
    }, [ui.theme]);

    const toggleTheme = () => {
      const newTheme = ui.theme === "light" ? "dark" : "light";
      uiStore.set({ ...ui, theme: newTheme });
    }


    return (
         <div className="fixed top-4 right-4 z-50">
            <button onClick={toggleTheme}  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out">
             {theme === 'light' ? <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <FaSun  className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
           </button>
         </div>
    )
}