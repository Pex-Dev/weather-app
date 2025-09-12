import { createContext, useContext, useEffect, useState } from "react";
import type {
  Units,
  SearchResults,
  Result,
  SearchStatus,
} from "../types/Types";

type WeatherState = {
  units: Units;
  HandleUnitChange: (
    unit: "temperature" | "wind" | "precipitation",
    value: "celsius" | "fahrenheit" | "kmh" | "mph" | "mm" | "inch"
  ) => void;
  searchStatus: SearchStatus;
  setSearchStatus: React.Dispatch<React.SetStateAction<SearchStatus>>;
  mainUnits: "imperial" | "metric";
  setMainUnits: React.Dispatch<React.SetStateAction<"imperial" | "metric">>;
  SearchLocation: (location: string) => Promise<Result[] | null>;
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

  return (
    <WeatherContext.Provider
      value={{
        units,
        HandleUnitChange,
        mainUnits,
        setMainUnits,
        SearchLocation,
        searchStatus,
        setSearchStatus,
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
