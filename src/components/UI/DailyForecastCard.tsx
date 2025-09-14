import { WeatherCodes } from "../../utilities/Utilities";

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
    <div className="bg-ui-main border border-ui-main-border rounded-xl p-3 text-white min-w-[96px]">
      <h4 className="text-lg text-center">{day}</h4>
      <img
        src={`/images/weather_icons/${WeatherCodes[weatherCode].icons.day}`}
        alt={WeatherCodes[weatherCode].name}
      />
      <p className="flex justify-between w-full text-lg">
        <span>{Math.round(max)}°</span>
        <span>{Math.round(min)}°</span>
      </p>
    </div>
  );
}
