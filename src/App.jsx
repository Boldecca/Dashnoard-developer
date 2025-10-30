import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar />
      <Dashboard />
    </div>
  );
}
