import { createContext, useContext, useEffect, useState } from "react";
import {
  saveUnits,
  getUnits,
  getLanguage,
  saveLanguage,
} from "../utilities/Utilities";
import type {
  Units,
  SearchResults,
  Result,
  SearchStatus,
  Weather,
  ReverseGeocoding,
} from "../types/Types";
import axios from "axios";

type WeatherState = {
  language: "en" | "es";
  handleLanguageChange: (language: "en" | "es") => void;
  units: Units;
  handleUnitChange: (
    unit: "temperature" | "wind" | "precipitation",
    value: "celsius" | "fahrenheit" | "kmh" | "mph" | "mm" | "inch"
  ) => void;
  weather: Weather | null;
  setWeather: React.Dispatch<React.SetStateAction<Weather | null>>;
  searchStatus: SearchStatus;
  setSearchStatus: React.Dispatch<React.SetStateAction<SearchStatus>>;
  mainUnits: "imperial" | "metric";
  handleMainUnitsChange: (units: "imperial" | "metric") => void;
  searchLocation: (location: string) => Promise<Result[] | null>;
  getWeather: (
    name: string,
    country: string,
    latitude: number,
    longitude: number
  ) => void;
  tryAgain: () => void;
};

//create context
const WeatherContext = createContext<WeatherState | null>(null);

//create provider
export default function WeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<"en" | "es">(getLanguage());
  const [searchData, setSearchData] = useState<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [mainUnits, setMainUnits] = useState<"imperial" | "metric">("metric");
  const [units, setUnits] = useState<Units>(getUnits());

  const isGeolocationSupported: boolean = "geolocation" in navigator;

  //Get weather again when the units change
  useEffect(() => {
    if (searchStatus !== "success" || !weather) return;
    getWeather(
      weather.name,
      weather.country,
      weather.latitude,
      weather.longitude
    );
  }, [units]);

  const handleLanguageChange = (newLanguage: "en" | "es") => {
    setLanguage(newLanguage);
    saveLanguage(newLanguage);
  };

  const handleMainUnitsChange = (newMainUnits: "imperial" | "metric") => {
    const newUnits: Units = {
      temperature: newMainUnits === "metric" ? "celsius" : "fahrenheit",
      wind: newMainUnits === "metric" ? "kmh" : "mph",
      precipitation: newMainUnits === "metric" ? "mm" : "inch",
    };
    setMainUnits(newMainUnits);
    setUnits(newUnits);

    //Save in localStorage
    saveUnits(newUnits);
  };

  const handleUnitChange = (
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
      //Save in localStorage
      saveUnits(newUnits);
      return newUnits;
    });
  };

  const searchLocation = async (location: string): Promise<Result[] | null> => {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        location
      )}&count=10&language=en&format=json`;

      const response = await axios.get(url);
      const data: SearchResults = response.data;
      if (!data.results) return null;
      return data.results;
    } catch (error) {
      console.error(error);
      setSearchStatus("idle");
    }
    return null;
  };

  const getWeather = async (
    name: string,
    country: string,
    latitude: number,
    longitude: number,
    startLoading: boolean = false
  ) => {
    if (!startLoading) {
      if (searchStatus === "loading") return;
      setSearchStatus("loading");
    }

    //Save search data to use in case of retry
    setSearchData({ name, country, latitude, longitude });

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
      const response = await axios.get(url);
      let weather: Weather = response.data;
      weather = { ...weather, name, country };
      setWeather(weather);
      setSearchStatus("success");
    } catch (error) {
      console.error(error);
      setSearchStatus("error");
    }
  };

  const currentPosition = async (position: GeolocationPosition) => {
    setSearchStatus("loading");
    try {
      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
      );

      const location: ReverseGeocoding = response.data;
      getWeather(
        location.address.city,
        location.address.country,
        latitude,
        longitude,
        true
      );
    } catch (error) {
      console.error(error);
      setSearchStatus("idle");
    }
  };

  const getCurrentLocation = () => {
    if (isGeolocationSupported) {
      navigator.geolocation.getCurrentPosition(currentPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Retry fetching weather data when in error state
  const tryAgain = () => {
    if (!searchData) return;
    getWeather(
      searchData.name,
      searchData.country,
      searchData.latitude,
      searchData.longitude
    );
  };

  //Get current location on load
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        language,
        handleLanguageChange,
        units,
        handleUnitChange,
        mainUnits,
        weather,
        setWeather,
        handleMainUnitsChange,
        searchLocation,
        searchStatus,
        setSearchStatus,
        getWeather,
        tryAgain,
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
