import { createContext, useContext, useEffect, useState } from "react";
import type {
  Units,
  SearchResults,
  Result,
  SearchStatus,
  Weather,
} from "../types/Types";

type WeatherState = {
  units: Units;
  HandleUnitChange: (
    unit: "temperature" | "wind" | "precipitation",
    value: "celsius" | "fahrenheit" | "kmh" | "mph" | "mm" | "inch"
  ) => void;
  weather: Weather | null;
  setWeather: React.Dispatch<React.SetStateAction<Weather | null>>;
  searchStatus: SearchStatus;
  setSearchStatus: React.Dispatch<React.SetStateAction<SearchStatus>>;
  mainUnits: "imperial" | "metric";
  setMainUnits: React.Dispatch<React.SetStateAction<"imperial" | "metric">>;
  SearchLocation: (location: string) => Promise<Result[] | null>;
  GetWeather: (
    name: string,
    country: string,
    latitude: number,
    longitude: number
  ) => void;
};

//Crear context
const WeatherContext = createContext<WeatherState | null>(null);

//Crear provider
export default function WeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [mainUnits, setMainUnits] = useState<"imperial" | "metric">("metric");
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  useEffect(() => {
    setUnits({
      temperature: mainUnits === "metric" ? "celsius" : "fahrenheit",
      wind: mainUnits === "metric" ? "kmh" : "mph",
      precipitation: mainUnits === "metric" ? "mm" : "inch",
    });
  }, [mainUnits]);

  const HandleUnitChange = (
    unit: "temperature" | "wind" | "precipitation",
    value: "celsius" | "fahrenheit" | "kmh" | "mph" | "mm" | "inch"
  ) => {
    setUnits((prevUnits) => {
      const newUnits: Units = {
        temperature:
          unit === "temperature" &&
          (value === "celsius" || value === "fahrenheit")
            ? value
            : prevUnits.temperature,

        wind:
          unit === "wind" && (value === "kmh" || value === "mph")
            ? value
            : prevUnits.wind,
        precipitation:
          unit === "precipitation" && (value === "mm" || value === "inch")
            ? value
            : prevUnits.precipitation,
      };

      return newUnits;
    });
  };

  const SearchLocation = async (location: string): Promise<Result[] | null> => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&count=10&language=en&format=json`;

    const response = await fetch(url);
    const data: SearchResults = await response.json();
    if (!data.results) return null;
    return data.results;
  };

  ///////////////////////////////////////////////CAMBIAR A AXIOS
  const GetWeather = async (
    name: string,
    country: string,
    latitude: number,
    longitude: number
  ) => {
    if (searchStatus === "loading") return;
    setSearchStatus("loading");

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
        latitude
      )}&longitude=${encodeURIComponent(
        longitude
      )}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,relative_humidity_2m&timezone=auto&wind_speed_unit=${
        units.wind
      }&temperature_unit=${units.temperature}&precipitation_unit=${
        units.precipitation
      }`;
      const response = await fetch(url);
      let weather: Weather = await response.json();
      weather = { ...weather, name, country };
      setWeather(weather);
      setSearchStatus("success");
    } catch (error) {
      console.error(error);
      setSearchStatus("error");
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        units,
        HandleUnitChange,
        mainUnits,
        weather,
        setWeather,
        setMainUnits,
        SearchLocation,
        searchStatus,
        setSearchStatus,
        GetWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function UseWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("UseWeatherContext must be use within a WeatherProvider");
  }
  return context;
}
