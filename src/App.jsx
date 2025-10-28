import React from 'react';
import { useTheme } from './useTheme';
import Navbar from './Navbar';
import GithubCard from './GithubCard';
import WeatherCard from './WeatherCard';

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen transition-colors duration-300`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        <GithubCard isDarkMode={isDarkMode} />
        <WeatherCard isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
