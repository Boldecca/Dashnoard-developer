import React from "react";
import GitHubCard from "../components/GitHubCard";
import WeatherCard from "../components/WeatherCard";
import GithubCard from "../components/GithubCard";

export default function Dashboard() {
  const defaultUser = import.meta.env.VITE_GITHUB_USERNAME || "";
  const [username, setUsername] = useState(defaultUser);
  const [searchUser, setSearchUser] = useState("");

  const handleSearch = (val) => {
    if (!val) return;
    setUsername(val.trim());
    setSearchUser("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#111827] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="text-white">
              <h1 className="text-3xl font-bold">Developer Dashboard</h1>
              <p className="text-gray-400 mt-1">GitHub profile + real-time weather</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GitHubCard username={username} />
              <WeatherCard />
            </div>
          </div>

          {/* Right column: quick controls */}
          <div className="space-y-6">
            <div className="p-4 bg-[#0f1724] rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">GitHub quick search</h3>
              <div className="flex gap-2">
                <input
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Type username"
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                />
                <button
                  onClick={() => handleSearch(searchUser)}
                  className="px-4 py-2 bg-blue-600 rounded text-white"
                >
                  Load
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#0f1724] rounded-xl border border-gray-700 text-gray-300">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-gray-400">Use the search to load any GitHub profile. Weather uses OpenWeatherMap city from VITE_WEATHER_CITY.</p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-xs text-gray-500">Data provided by GitHub API and OpenWeatherMap.</div>
      </div>
    </div>
  );
}
