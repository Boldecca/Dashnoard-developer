import React, { useState } from "react";
import WeatherCard from "../components/WeatherCard";
import GithubCard from "../components/GithubCard";

export default function Dashboard({ isDarkMode }) {
  const defaultUser = import.meta.env.VITE_GITHUB_USERNAME || "";
  const [username] = useState(defaultUser);

  return (
    <main
      className={`min-h-screen p-6 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <GithubCard username={username} isDarkMode={isDarkMode} />
        <WeatherCard isDarkMode={isDarkMode} />
      </div>
    </main>
  );
}
