"use client";
import { useState, useEffect } from "react";
import { get7DayForecast, searchLocations } from "../lib/weather";
import { WeatherCard } from "../components/WeatherCard";
import { SearchBar } from "../components/SearchBar";

export default function Home() {
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("上海");

  const loadWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);

      // 获取城市ID
      const locationRes = await searchLocations(cityName);
      if (locationRes.code !== "200") {
        throw new Error("城市未找到");
      }

      const locationId = locationRes.location[0].id;
      setCity(locationRes.location[0].name);

      // 获取天气预报
      const weatherRes = await get7DayForecast(locationId);
      if (weatherRes.code !== "200") {
        throw new Error("天气数据获取失败");
      }

      setForecast(weatherRes.daily);
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">天气预报</h1>

      <SearchBar onSearch={loadWeather} initialValue={city} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {forecast && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forecast.map((day: any) => (
            <WeatherCard
              key={day.fxDate}
              date={day.fxDate}
              condition={day.textDay}
              maxTemp={day.tempMax}
              minTemp={day.tempMin}
            />
          ))}
        </div>
      )}
      {loading && (
        <div className="text-center py-8 text-gray-100">加载中...</div>
      )}
    </main>
  );
}
