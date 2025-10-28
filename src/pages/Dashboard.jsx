import React from "react";
import WeatherCard from "../components/WeatherCard";
import GithubCard from "../components/GithubCard";

export default function Dashboard({ isDarkMode }) {
  return (
    <div className={`p-4 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherCard isDarkMode={isDarkMode} />
        <GithubCard isDarkMode={isDarkMode} username="Boldecca" />
      </div>
    </div>
  );
}
