import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const OPENWEATHER_API = import.meta.env.VITE_WEATHER_API_KEY; // must be set
const DEFAULT_CITY = import.meta.env.VITE_WEATHER_CITY || "Kigali";

export default function WeatherCard({ city = DEFAULT_CITY }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(OPENWEATHER_API));
  const [error, setError] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let cancel = false;
    if (!OPENWEATHER_API) {
      setError("No weather API key configured (VITE_WEATHER_API_KEY).");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data?.lat}&longitude=${data?.lon}&hourly=temperature_2m`)
      .then((res) => {
        if (!res.ok) throw new Error(`Weather API: ${res.status}`);
        return res.json();
      })
      .then((json) => { if (!cancel) setData(json); })
      .catch((err) => { if (!cancel) setError(err.message); })
      .finally(() => { if (!cancel) setLoading(false); });

    return () => (cancel = true);
  }, [city]);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <div className="p-6"><LoadingSpinner /></div>;
  if (error) return <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-700 dark:text-red-300">{error}</div>;
  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const condition = data.weather?.[0]?.description || "";
  const wind = data.wind?.speed;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">{data.name}, {data.sys?.country}</div>
          <div className="text-3xl font-bold dark:text-white">{temp}°C</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{condition}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400">Wind</div>
          <div className="font-semibold dark:text-white">{wind} m/s</div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">Local time</div>
      <div className="text-sm dark:text-white font-mono">{time.toLocaleString()}</div>
    </div>
  );
}
