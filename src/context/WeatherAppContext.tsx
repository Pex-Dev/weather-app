import { createContext, useContext, useState } from "react";
import type { Units } from "../types/Types";

type WeatherState = {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
};

//Crear context
const WeatherContext = createContext<WeatherState | null>(null);

//Crear provider
export default function WeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  return (
    <WeatherContext.Provider value={{ units, setUnits }}>
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
