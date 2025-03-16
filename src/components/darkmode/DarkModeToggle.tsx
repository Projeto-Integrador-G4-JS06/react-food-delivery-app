import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export default function DarkModeToggle({ isDark, setIsDark }: DarkModeToggleProps) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 right-6 p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full shadow-lg transition-all hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
}