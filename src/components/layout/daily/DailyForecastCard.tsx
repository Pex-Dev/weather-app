import { WeatherCodes } from "../../../utilities/Utilities";

export default function DailyForecastCard({
  day,
  weatherCode,
  max,
  min,
}: {
  day: string;
  weatherCode: number;
  max: number;
  min: number;
}) {
  return (
    <div className="bg-white dark:bg-ui-main border dark:border-ui-main-border rounded-xl p-3 text-white w-full border-cyan-600 shadow-md dark:shadow-2xl">
      <h4 className="text-lg text-center text-neutral-700 dark:text-white">
        {day}
      </h4>
      <img
        src={`/images/weather_icons/${WeatherCodes[weatherCode].icons.day}`}
        alt={WeatherCodes[weatherCode].name}
      />
      <p className="flex justify-between w-full text-lg text-neutral-700 dark:text-white">
        <span>{Math.round(max)}°</span>
        <span>{Math.round(min)}°</span>
      </p>
    </div>
  );
}
