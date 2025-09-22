export const translations = {
  en: {
    title: "How's the sky looking today?",
    units: "Units",
    feels_like: "Feels like",
    wind: "Wind",
    humidity: "Humidity",
    precipitation: "Precipitation",
    search_placeholder: "Search for a city",
    daily_forecast: "Daily Forecast",
    hourly_forecast: "Hourly Forecast",
  },
  es: {
    title: "¿Cómo se ve el cielo hoy?",
    units: "Unidades",
    feels_like: "Sensación térmica",
    wind: "Viento",
    humidity: "Humedad",
    precipitation: "Precipitación",
    search_placeholder: "Buscar una ciudad",
    daily_forecast: "Pronóstico diario",
    hourly_forecast: "Pronóstico horario",
  },
} as const;

export type Languges = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)["en"];
