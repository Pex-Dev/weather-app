import { createContext, useContext, useState } from "react";
import type { Unit } from "../types/Types";

type WeatherState = {
  units: Unit;
  setUnits: React.Dispatch<React.SetStateAction<Unit>>;
};

//Crear context
const WeatherContext = createContext<WeatherState | null>(null);

//Crear provider
export default function WeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [units, setUnits] = useState<Unit>("imperial");

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
