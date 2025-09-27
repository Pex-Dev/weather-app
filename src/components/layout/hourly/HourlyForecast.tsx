import { useEffect, useMemo, useState } from "react";
import { UseWeatherContext } from "../../../context/WeatherAppContext";
import { getImperialUnit, t } from "../../../utilities/Utilities";
import DaySelector from "../../UI/DaySelector";
import HourlyForecastCard from "./HourlyForecastCard";

export default function HourlyForecast() {
  const { weather, searchStatus, language, theme, units } = UseWeatherContext();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    //If forecast is loaded
    if (searchStatus === "success") {
      if (!weather) return;

      //Set current date as selected day to display hourly forecast
      const date = new Date(weather.hourly.time[0]);
      setSelectedDay(date);
    } else {
      setSelectedDay(null);
    }
  }, [searchStatus]);

  const hourlyData = useMemo(() => {
    if (!selectedDay || !weather) return [];

    return weather.hourly.time
      .map((time, i) => ({
        time: new Date(time),
        weatherCode: weather.hourly.weather_code[i],
        temperature: weather.hourly.temperature_2m[i],
      }))
      .filter(
        (hData) => hData.time.toDateString() === selectedDay.toDateString()
      );
  }, [selectedDay, weather]);

  return (
    <div className="w-full lg:max-w-[345px] bg-white border border-cyan-600 shadow-md dark:shadow-2xl dark:border-ui-main-border dark:bg-ui-main rounded-lg md:rounded-2xl lg:rounded-3xl py-3 md:py-4 pl-3 md:pl-4 mt-2 md:mt-0 max-h-[602px] overflow-hidden">
      <header className="flex justify-between items-center mr-4">
        <h3 className="text-neutral-700 dark:text-white text-xl font-light">
          {t(language, "hourly_forecast")}
        </h3>
        <DaySelector
          days={weather ? weather.hourly.time : undefined}
          selectedDay={selectedDay ? selectedDay : undefined}
          setSelectedDay={weather ? setSelectedDay : undefined}
        />
      </header>
      <ul
        className={`my-3 flex flex-col gap-2.5 md:gap-3 overflow-y-auto max-h-[520px] pr-3 md:pr-4 focus:outline-0 focus:border-t focus:border-b focus:border-ui-main-border ${
          theme === "dark" ? "custom-scrollbar-dark" : "custom-scrollbar"
        }`}
      >
        {searchStatus === "success" &&
          selectedDay !== null &&
          hourlyData?.map((hData, i) => (
            <HourlyForecastCard
              key={i}
              time={hData.time.getHours()}
              weatherCode={hData.weatherCode}
              temperature={
                units.temperature === "celsius"
                  ? hData.temperature
                  : getImperialUnit("fahrenheit", hData.temperature)
              }
            />
          ))}
      </ul>
    </div>
  );
}
