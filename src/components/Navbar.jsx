import React from "react";
import useTheme from "../hooks/useTheme";

export default function Navbar({ onSearchGit }) {
  const { theme, toggle } = useTheme();

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center`}>
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Developer Dashboard</h1>
          </div>
          <button
            onClick={toggle}
            className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="toggle-theme"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            )}
            <span className="text-sm text-gray-700 dark:text-gray-200">{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}