import DailyForecastCard from "./DailyForecastCard";
import { UseWeatherContext } from "../../../context/WeatherAppContext";

export default function DailyForecast() {
  const { weather, searchStatus } = UseWeatherContext();

  const DateFormater = (rawDate: Date): string => {
    return new Date(rawDate).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <>
      <h3 className="text-white text-xl font-light mt-3">Daily Forecast</h3>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
        {searchStatus === "loading" ? (
          <>
            <div className="bg-ui-main min-w-[102px] min-h-[158px] border border-ui-main-border rounded-xl"></div>
            <div className="bg-ui-main min-w-[102px] min-h-[158px] border border-ui-main-border rounded-xl"></div>
            <div className="bg-ui-main min-w-[102px] min-h-[158px] border border-ui-main-border rounded-xl"></div>
            <div className="bg-ui-main min-w-[102px] min-h-[158px] border border-ui-main-border rounded-xl"></div>
            <div className="bg-ui-main min-w-[102px] min-h-[158px] border border-ui-main-border rounded-xl"></div>
            <div className="bg-ui-main min-w-[102px] min-h-[158px] border border-ui-main-border rounded-xl"></div>
            <div className="bg-ui-main min-w-[102px] min-h-[158px] border border-ui-main-border rounded-xl"></div>
          </>
        ) : (
          weather?.daily.time.map((time, i) => (
            <DailyForecastCard
              key={i}
              day={DateFormater(time)}
              weatherCode={weather ? weather.daily.weather_code[i] : 0}
              max={weather ? weather.daily.temperature_2m_max[i] : 0}
              min={weather ? weather.daily.temperature_2m_min[i] : 0}
            />
          ))
        )}
      </div>
    </>
  );
}
