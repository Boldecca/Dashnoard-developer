import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors bg-white dark:bg-black`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Dashboard isDarkMode={isDarkMode} />
    </div>
  );
}
