import { createContext, useContext, useEffect, useState } from "react";
import type { Units } from "../types/Types";

type WeatherState = {
  units: Units;
  HandleUnitChange: (
    unit: "temperature" | "wind" | "precipitation",
    value: "celsius" | "fahrenheit" | "kmh" | "mph" | "mm" | "inch"
  ) => void;
  mainUnits: "imperial" | "metric";
  setMainUnits: React.Dispatch<React.SetStateAction<"imperial" | "metric">>;
};

//Crear context
const WeatherContext = createContext<WeatherState | null>(null);

//Crear provider
export default function WeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <WeatherContext.Provider
      value={{ units, HandleUnitChange, mainUnits, setMainUnits }}
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
