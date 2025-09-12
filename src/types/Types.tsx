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
