import React from "react";
import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import GithubCard from "../components/GithubCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 p-4">
      <Navbar />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherCard city="Kigali" />
        <GithubCard username="Boldecca" />
      </div>
    </div>
  );
}
