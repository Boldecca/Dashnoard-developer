import React, { useEffect, useState } from 'react';

export default function WeatherCard({ isDarkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-1.9536&longitude=30.0606&current_weather=true'
        );
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const result = await response.json();
        const current = result.current_weather;
        setData({
          temperature: Math.round(current.temperature),
          windSpeed: Math.round(current.windspeed),
          condition: current.weathercode, // you can map codes to text/icons
          location: 'Kigali, Rwanda',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // every 5 min
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  if (loading) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <span className="animate-spin text-blue-500 text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-300 hover:shadow-xl`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">☁️ Weather</h2>

      <div className="flex flex-col items-center mb-4">
        <div className="text-5xl mb-2">{data.condition}</div>
        <div className="text-4xl font-bold">{data.temperature}°C</div>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{data.location}</p>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Wind: {data.windSpeed} km/h</p>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time: {formatTime(currentTime)}</p>
      </div>
    </div>
  );
}
