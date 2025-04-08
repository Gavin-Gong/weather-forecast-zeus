export interface WeatherResponse {
  code: string;
  daily: Array<{
    fxDate: string;
    tempMax: string;
    tempMin: string;
    textDay: string;
  }>;
}

export interface LocationResponse {
  code: string;
  location: Array<{
    id: string;
    name: string;
  }>;
}

export async function get7DayForecast(locationId: string): Promise<WeatherResponse> {
  const res = await fetch(
    `https://pj5cttqqnd.re.qweatherapi.com/v7/weather/7d?location=${locationId}&key=${process.env.NEXT_PUBLIC_QWEATHER_KEY}`
  );
  return await res.json();
}

export async function searchLocations(query: string): Promise<LocationResponse> {
  const res = await fetch(
    `https://pj5cttqqnd.re.qweatherapi.com/geo/v2/city/lookup?location=${encodeURIComponent(query)}&key=${process.env.NEXT_PUBLIC_QWEATHER_KEY}`
  );
  return await res.json();
}
