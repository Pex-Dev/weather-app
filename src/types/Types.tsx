export type Units = {
  temperature: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precipitation: "mm" | "inch";
};

export type SearchResults = {
  results: Result[];
  generationtime_ms: number;
};

export type Result = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone: string;
  population: number;
  country_id?: number;
  country?: string;
  admin1: string;
  admin2: string;
  admin3?: string;
  admin4?: string;
  postcodes?: string[];
};

export type SearchStatus =
  | "idle"
  | "loading"
  | "success"
  | "no-results"
  | "error";

export type Weather = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
};

export type Current = {
  time: string;
  interval: number;
  temperature_2m: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
};

export type CurrentUnits = {
  time: string;
  interval: string;
  temperature_2m: string;
  precipitation: string;
  weather_code: string;
  wind_speed_10m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
};

export type Daily = {
  time: Date[];
  weather_code: number[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
};

export type DailyUnits = {
  time: string;
  weather_code: string;
  temperature_2m_min: string;
  temperature_2m_max: string;
};

export type Hourly = {
  time: string[];
  temperature_2m: number[];
};

export type HourlyUnits = {
  time: string;
  temperature_2m: string;
};
