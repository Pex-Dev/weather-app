import DailyForecastCard from "./DailyForecastCard";
import { UseWeatherContext } from "../../../context/WeatherAppContext";
import { getImperialUnit, t } from "../../../utilities/Utilities";

export default function DailyForecast() {
  const { weather, units, searchStatus, language } = UseWeatherContext();

  const DateFormater = (rawDate: Date): string => {
    return new Date(rawDate).toLocaleDateString(
      language === "en" ? "en-US" : "es-ES",
      {
        weekday: "short",
      }
    );
  };

  return (
    <>
      <h3 className="dark:text-white text-xl dark:font-light mt-3">
        {t(language, "daily_forecast")}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 md:gap-4">
        {searchStatus === "loading" ? (
          <>
            <div className="bg-white dark:bg-ui-main w-full min-h-[158px] border dark:border-ui-main-border rounded-lg md:rounded-xl border-cyan-600 shadow-md dark:shadow-2xl"></div>
            <div className="bg-white dark:bg-ui-main w-full min-h-[158px] border dark:border-ui-main-border rounded-lg md:rounded-xl border-cyan-600 shadow-md dark:shadow-2xl"></div>
            <div className="bg-white dark:bg-ui-main w-full min-h-[158px] border dark:border-ui-main-border rounded-lg md:rounded-xl border-cyan-600 shadow-md dark:shadow-2xl"></div>
            <div className="bg-white dark:bg-ui-main w-full min-h-[158px] border dark:border-ui-main-border rounded-lg md:rounded-xl border-cyan-600 shadow-md dark:shadow-2xl"></div>
            <div className="bg-white dark:bg-ui-main w-full min-h-[158px] border dark:border-ui-main-border rounded-lg md:rounded-xl border-cyan-600 shadow-md dark:shadow-2xl"></div>
            <div className="bg-white dark:bg-ui-main w-full min-h-[158px] border dark:border-ui-main-border rounded-lg md:rounded-xl border-cyan-600 shadow-md dark:shadow-2xl"></div>
            <div className="bg-white dark:bg-ui-main w-full min-h-[158px] border dark:border-ui-main-border rounded-lg md:rounded-xl border-cyan-600 shadow-md dark:shadow-2xl"></div>
          </>
        ) : (
          weather &&
          weather.daily.time.map((time, i) => (
            <DailyForecastCard
              key={i}
              day={DateFormater(time)}
              weatherCode={weather.daily.weather_code[i]}
              max={
                units.temperature === "celsius"
                  ? weather.daily.temperature_2m_max[i]
                  : getImperialUnit(
                      "fahrenheit",
                      weather.daily.temperature_2m_max[i]
                    )
              }
              min={
                units.temperature === "celsius"
                  ? weather.daily.temperature_2m_min[i]
                  : getImperialUnit(
                      "fahrenheit",
                      weather.daily.temperature_2m_min[i]
                    )
              }
            />
          ))
        )}
      </div>
    </>
  );
}
