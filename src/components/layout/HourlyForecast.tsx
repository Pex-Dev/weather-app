import { useEffect, useMemo, useState } from "react";
import { UseWeatherContext } from "../../context/WeatherAppContext";
import DaySelector from "../UI/DaySelector";
import HourlyForecastCard from "../UI/HourlyForecastCard";

export default function HourlyForecast() {
  const { weather, searchStatus } = UseWeatherContext();
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
    <div className="w-full lg:max-w-[345px] bg-ui-main rounded-2xl lg:rounded-3xl py-4 pl-4 mt-4 md:mt-0 max-h-[602px] overflow-hidden">
      <header className="flex justify-between items-center mr-4">
        <h3 className="text-white text-xl font-light">Hourly Forecast</h3>
        <DaySelector
          days={weather ? weather.hourly.time : undefined}
          selectedDay={selectedDay ? selectedDay : undefined}
          setSelectedDay={weather ? setSelectedDay : undefined}
        />
      </header>
      <ul className="my-3 flex flex-col gap-3  overflow-y-auto max-h-[520px] mr-4">
        {searchStatus === "loading" || !selectedDay
          ? ""
          : hourlyData?.map((hData, i) => (
              <HourlyForecastCard
                key={i}
                time={hData.time.getHours()}
                weatherCode={hData.weatherCode}
                temperature={hData.temperature}
              />
            ))}
      </ul>
    </div>
  );
}
