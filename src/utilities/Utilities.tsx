import type { Location, Units, WeatherCode } from "../types/Types";
import type { TranslationKeys, Languages } from "../types/Translations";
import { translations } from "../types/Translations";

export const WeatherCodes: Record<number, WeatherCode> = {
  0: {
    name: "Clear Sky",
    icons: {
      day: "clear.svg",
      night: "clear-night.svg",
    },
  },
  1: {
    name: "Mainly Clear",
    icons: {
      day: "clear.svg",
      night: "clear-night.svg",
    },
  },
  2: {
    name: "Partly Cloudy",
    icons: {
      day: "partly-cloudy.svg",
      night: "partly-cloudy-night.svg",
    },
  },
  3: {
    name: "Overcast",
    icons: {
      day: "overcast.svg",
      night: "overcast.svg",
    },
  },
  45: {
    name: "Fog",
    icons: {
      day: "fog.svg",
      night: "fog-night.svg",
    },
  },
  48: {
    name: "Rime Fog",
    icons: {
      day: "rime-fog.svg",
      night: "rime-fog.svg",
    },
  },
  51: {
    name: "Light Drizzle",
    icons: {
      day: "light-drizzle.svg",
      night: "light-drizzle.svg",
    },
  },
  53: {
    name: "Moderate Drizzle",
    icons: {
      day: "drizzle.svg",
      night: "drizzle.svg",
    },
  },
  55: {
    name: "Heavy Drizzle",
    icons: {
      day: "heavy-drizzle.svg",
      night: "heavy-drizzle.svg",
    },
  },
  56: {
    name: "Light Freezing Drizzle",
    icons: {
      day: "drizzle.svg",
      night: "drizzle.svg",
    },
  },
  57: {
    name: "Dense Freezing Drizzle",
    icons: {
      day: "heavy-drizzle.svg",
      night: "heavy-drizzle.svg",
    },
  },
  61: {
    name: "Slight Rain",
    icons: {
      day: "slight-rain.svg",
      night: "slight-rain-night.svg",
    },
  },
  63: {
    name: "Moderate Rain",
    icons: {
      day: "rain.svg",
      night: "rain.svg",
    },
  },
  65: {
    name: "Heavy Rain",
    icons: {
      day: "heavy-rain.svg",
      night: "heavy-rain.svg",
    },
  },
  66: {
    name: "Light Freezing Rain",
    icons: {
      day: "rain.svg",
      night: "rain.svg",
    },
  },
  67: {
    name: "Heavy Freezing Rain",
    icons: {
      day: "heavy-rain.svg",
      night: "heavy-rain.svg",
    },
  },
  71: {
    name: "Slight snowfall",
    icons: {
      day: "light-snow.svg",
      night: "light-snow-night.svg",
    },
  },
  73: {
    name: "Moderate snowfall",
    icons: {
      day: "snow.svg",
      night: "snow.svg",
    },
  },
  75: {
    name: "Heavy snowfall",
    icons: {
      day: "heavy-snow.svg",
      night: "heavy-snow.svg",
    },
  },
  77: {
    name: "Snow Grains",
    icons: {
      day: "snow-grains.svg",
      night: "snow-grains.svg",
    },
  },
  80: {
    name: "Slight Rain Showers",
    icons: {
      day: "slight-rain-showers.svg",
      night: "slight-rain-showers-night.svg",
    },
  },
  81: {
    name: "Moderate Rain Showers",
    icons: {
      day: "rain-showers.svg",
      night: "rain-showers.svg",
    },
  },
  82: {
    name: "Violent Rain Showers",
    icons: {
      day: "heavy-rain-showers.svg",
      night: "heavy-rain-showers.svg",
    },
  },
  85: {
    name: "Light Snow Showers",
    icons: {
      day: "light-snow-showers.svg",
      night: "light-snow-showers.svg",
    },
  },
  86: {
    name: "Heavy Snow Showers",
    icons: {
      day: "heavy-snow-showers.svg",
      night: "heavy-snow-showers.svg",
    },
  },
  95: {
    name: "Thunderstorm",
    icons: {
      day: "thunderstorm.svg",
      night: "thunderstorm.svg",
    },
  },
  96: {
    name: "Slight Hailstorm",
    icons: {
      day: "hail.svg",
      night: "hail.svg",
    },
  },
  99: {
    name: "Heavy Hailstorm",
    icons: {
      day: "heavy-hail.svg",
      night: "heavy-hail.svg",
    },
  },
};

export const saveUnits = (units: Units) => {
  localStorage.setItem("units", JSON.stringify(units));
};

export const getUnits = (): Units => {
  const units = localStorage.getItem("units");

  if (!units) {
    return {
      temperature: "celsius",
      wind: "kmh",
      precipitation: "mm",
    };
  }

  return JSON.parse(units);
};

export const getCorrectIcon = (weatherCode: number, hour: number): string => {
  if (hour >= 6 && hour < 18) {
    return `/images/weather_icons/${WeatherCodes[weatherCode].icons.day}`;
  } else {
    return `/images/weather_icons/${WeatherCodes[weatherCode].icons.night}`;
  }
};

export const saveLanguage = (language: "en" | "es") => {
  localStorage.setItem("language", language);
};

export const getLanguage = (): "en" | "es" => {
  const language = localStorage.getItem("language");
  if (!language) {
    const preferedLanguage = navigator.language;
    if (preferedLanguage.startsWith("es")) return "es";
    return "en";
  }

  return language === "es" ? "es" : "en";
};

export const getFavorites = (): Location[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites: Location[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const t = (lang: Languages, key: TranslationKeys) => {
  return translations[lang][key] || key;
};
