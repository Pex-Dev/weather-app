import { getCorrectIcon, WeatherCodes } from "../../../utilities/Utilities";

export default function HourlyForecastCard({
  weatherCode,
  time,
  temperature,
}: {
  weatherCode: number;
  time: number;
  temperature: number;
}) {
  return (
    <li className="w-full pr-3 rounded-lg bg-neutral-100 dark:bg-ui-main-hover border border-neutral-200 dark:border-ui-main-border flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src={getCorrectIcon(weatherCode, time)}
          alt={WeatherCodes[weatherCode].name}
          className="max-w-13"
        />
        <p className="min-w-[70px] text-neutral-700 dark:text-white uppercase text-xl">
          {time} pm
        </p>
      </div>
      <p className="text-neutral-700 dark:text-neutral-200 font-light">
        {Math.round(temperature)}°
      </p>
    </li>
  );
}
