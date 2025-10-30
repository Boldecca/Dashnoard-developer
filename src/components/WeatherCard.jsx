import { useState, useEffect } from "react";

export default function WeatherCard({ isDarkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-1.9536&longitude=30.0606&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Africa%2FKigali"
        );
        if (!res.ok) throw new Error("Weather API error");

        const result = await res.json();

        const icons = {
          0: { text: "Clear Sky", icon: "☀️" },
          1: { text: "Mainly Clear", icon: "🌤️" },
          2: { text: "Partly Cloudy", icon: "⛅" },
          3: { text: "Overcast", icon: "☁️" },
          45: { text: "Fog", icon: "🌫️" },
          48: { text: "Fog", icon: "🌫️" },
          51: { text: "Light Drizzle", icon: "🌦️" },
          61: { text: "Light Rain", icon: "🌧️" },
          63: { text: "Rain", icon: "🌧️" },
          65: { text: "Heavy Rain", icon: "⛈️" },
          71: { text: "Snow", icon: "❄️" },
          95: { text: "Thunderstorm", icon: "⚡" }
        };

        const weather = icons[result.current.weather_code] ?? { text: "N/A", icon: "🌡️" };

        setData({
          temp: Math.round(result.current.temperature_2m),
          humidity: result.current.relative_humidity_2m,
          wind: Math.round(result.current.wind_speed_10m),
          condition: weather.text,
          icon: weather.icon,
          location: "Kigali, Rwanda"
        });
      } catch (err) {
        setError("Failed to load weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  if (loading) {
    return (
      <div className={`p-8 rounded-2xl shadow-lg text-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-white/70 text-gray-800 backdrop-blur-lg"}`}>
        <div className="animate-spin text-4xl">🌐</div>
        <p className="mt-2 text-sm opacity-70">Fetching Kigali weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-8 rounded-2xl shadow-lg text-center ${isDarkMode ? "bg-gray-800 text-red-500" : "bg-white/70 text-red-500 backdrop-blur-lg"}`}>
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl shadow-xl transition-colors border
      ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white/80 border-white/50 text-gray-800 backdrop-blur-xl"}`}>
      
      {/* Header */}
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">🌤 Kigali Weather</h2>

      {/* Main Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-6xl mb-2">{data.icon}</div>
        <div className="text-5xl font-extrabold">{data.temp}°C</div>
        <p className="text-lg opacity-90 mt-1">{data.condition}</p>
        <p className="text-sm opacity-60">{data.location}</p>
      </div>

      {/* Date & Time */}
      <div className={`p-4 rounded-xl mb-5 text-center ${isDarkMode ? "bg-gray-800" : "bg-blue-50/70 border border-blue-200"}`}>
        <p className="text-2xl font-mono font-bold">{formatTime(currentTime)}</p>
        <p className="text-sm opacity-70">{formatDate(currentTime)}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-rows-3 gap-3 text-center">
         <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          🌡️
          <p className="text-xl font-bold">{data.temp}°</p>
          <p className="text-xs opacity-60 mt-1">Temperature</p>
        </div>

        <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          💨
          <p className="text-xl font-bold">{data.wind}</p>
          <p className="text-xs opacity-60 mt-1">Wind km/h</p>
        </div>

         <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          💧
          <p className="text-xl font-bold">{data.humidity}%</p>
          <p className="text-xs opacity-60 mt-1">Humidity</p>
        </div>
      </div>
    </div>
  );
}
