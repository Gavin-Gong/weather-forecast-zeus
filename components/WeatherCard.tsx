import React, { JSX } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayCloudyHigh,
  WiRainMix,
  WiShowers,
  WiSandstorm,
} from "react-icons/wi";

interface WeatherCardProps {
  date: string;
  condition: string;
  maxTemp: string;
  minTemp: string;
  isLoading?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  condition,
  maxTemp,
  minTemp,
  isLoading = false,
}) => {
  const dayName = new Date(date).toLocaleDateString("zh-CN", {
    weekday: "short",
  });
  const dayDate = new Date(date).toLocaleDateString("zh-CN", {
    month: "numeric",
    day: "numeric",
  });

  const weatherIcons: Record<string, JSX.Element> = {
    晴: <WiDaySunny size={32} className="text-yellow-400" />,
    多云: <WiCloudy size={32} className="text-gray-100" />,
    阴: <WiDayCloudyHigh size={32} className="text-gray-100" />,
    雨: <WiRain size={32} className="text-blue-400" />,
    小雨: <WiRainMix size={32} className="text-blue-300" />,
    阵雨: <WiShowers size={32} className="text-blue-400" />,
    雷雨: <WiThunderstorm size={32} className="text-purple-500" />,
    雪: <WiSnow size={32} className="text-blue-100" />,
    雾: <WiFog size={32} className="text-gray-300" />,
    沙尘: <WiSandstorm size={32} className="text-yellow-600" />,
  };

  return isLoading ? (
    <div className="bg-white/70 backdrop-blur-lg rounded-lg shadow p-4 flex flex-col items-center w-full">
      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse my-2"></div>
      <div className="flex gap-4 mt-2">
        <span className="h-6 w-12 bg-gray-200 rounded animate-pulse"></span>
        <span className="h-6 w-12 bg-gray-200 rounded animate-pulse"></span>
      </div>
    </div>
  ) : (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-sm p-4 flex flex-col items-center">
      <div className="text-gray-100">
        {dayName} {dayDate}
      </div>
      <div className="text-xl my-2 flex items-center gap-2 text-gray-100">
        {weatherIcons[condition] || null}
        {condition}
      </div>
      <div className="flex gap-4 mt-2">
        <span className="text-red-500">{maxTemp}°C</span>
        <span className="text-blue-400">{minTemp}°C</span>
      </div>
    </div>
  );
};
