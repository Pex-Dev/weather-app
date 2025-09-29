import { createContext, useContext, useEffect, useState } from "react";
import {
  saveUnits,
  getUnits,
  getLanguage,
  saveLanguage,
  getFavorites,
  saveFavorites,
  getTheme,
} from "../utilities/Utilities";
import type {
  Units,
  SearchResults,
  Result,
  SearchStatus,
  Weather,
  Location,
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
    longitude: number,
    setAsCompareLocation?: boolean
  ) => void;
  tryAgain: () => void;
  favorites: Location[];
  handleFavorite: (location: Location) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  locationsToCompare: Weather[] | null;
  setLocationsToCompare: React.Dispatch<React.SetStateAction<Weather[] | null>>;
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
  const [searchData, setSearchData] = useState<Location | null>(null);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [mainUnits, setMainUnits] = useState<"imperial" | "metric">("metric");
  const [units, setUnits] = useState<Units>(getUnits());
  const [favorites, setFavorites] = useState<Location[]>(getFavorites());
  const [theme, setTheme] = useState<"light" | "dark">(getTheme());

  const [locationsToCompare, setLocationsToCompare] = useState<
    Weather[] | null
  >(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
    }
    if (html.classList.contains("light")) {
      html.classList.remove("light");
    }

    html.classList.add(theme);
  }, [theme]);

  const handleLanguageChange = (newLanguage: "en" | "es") => {
    setLanguage(newLanguage);
    saveLanguage(newLanguage);
    const html = document.documentElement;
    console.log(html);

    html.lang = newLanguage;
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
      )}&count=10&language=${language}&format=json`;

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
    setAsCompareLocation: boolean = false //Set the result in the locations to compare list
  ) => {
    if (searchStatus === "loading") return;
    setSearchStatus("loading");

    //Save search data to use in case of retry
    setSearchData({ name, country, latitude, longitude });

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
        latitude
      )}&longitude=${encodeURIComponent(
        longitude
      )}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,relative_humidity_2m&timezone=auto&wind_speed_unit=kmh&temperature_unit=celsius&precipitation_unit=mm`;
      const response = await axios.get(url);
      let weather: Weather = response.data;
      weather = { ...weather, latitude, longitude, name, country };

      if (setAsCompareLocation) {
        setLocationsToCompare((prev) => [...(prev ?? []), weather]);
      } else {
        setWeather(weather);
      }
      setSearchStatus("success");
    } catch (error) {
      console.error(error);
      setSearchStatus("error");
    }
  };

  // Retry fetching weather data when in error state
  const tryAgain = () => {
    if (!searchData) return;
    getWeather(
      searchData.name,
      searchData.country,
      searchData.latitude,
      searchData.longitude,
      locationsToCompare ? true : false
    );
  };

  const handleFavorite = (location: Location) => {
    // Check if the location is already in favorites
    const isAlreadyFavorite = favorites.some(
      (fav) =>
        fav.latitude === location.latitude &&
        fav.longitude === location.longitude
    );

    //If is in favorites, remove it
    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) =>
          fav.latitude !== location.latitude ||
          fav.longitude !== location.longitude
      );
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
      return;
    }

    //If not, add it
    const updatedFavorites = [...favorites, location];
    saveFavorites(updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "dark") {
        localStorage.setItem("theme", "light");
        return "light";
      }
      localStorage.setItem("theme", "dark");
      return "dark";
    });
  };

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
        favorites,
        handleFavorite,
        theme,
        toggleTheme,
        locationsToCompare,
        setLocationsToCompare,
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
