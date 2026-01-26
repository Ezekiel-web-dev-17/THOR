"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon
          size={20}
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
      ) : (
        <Sun
          size={20}
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
      )}
    </button>
  );
}
