import type { Weather } from "../../../types/Types";
import { getCorrectIcon, WeatherCodes } from "../../../utilities/Utilities";
import { UseWeatherContext } from "../../../context/WeatherAppContext";
import { t } from "../../../utilities/Utilities";

export default function LocationToCompare({ location }: { location: Weather }) {
  const { language, units, setLocationsToCompare } = UseWeatherContext();

  const handleRemoveLocation = (location: Weather) => {
    setLocationsToCompare((prev) =>
      (prev ?? []).filter(
        (prevLocation) =>
          prevLocation.latitude !== location.latitude &&
          prevLocation.longitude !== location.longitude
      )
    );
  };

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );

  return (
    <li
      className="text-neutral-700
     dark:text-white bg-white dark:bg-ui-main p-2 md:p-3 lg:p-4 rounded-lg shadow-md dark:shadow-2xl flex flex-col justify-between"
    >
      <div className="flex justify-between gap-1.5 items-start">
        <h2 className="w-full text-lg md:text-xl text-center">{`${location.name}, ${location.country}`}</h2>
        <button
          aria-label={`${t(language, "remove")} ${location.name}`}
          title={`${t(language, "remove")} ${location.name}`}
          onClick={() => handleRemoveLocation(location)}
        >
          {closeIcon}
        </button>
      </div>
      <div className="flex md:gap-2 flex-col md:flex-row md:items-center">
        <img
          src={getCorrectIcon(
            location.current.weather_code,
            new Date(location.current.time).getHours()
          )}
          alt={WeatherCodes[location.current.weather_code].name}
          className="max-w-[100px] md:max-w-[160] mx-auto"
        />
        <p className="text-4xl md:text-5xl font-bold text-neutral-700 dark:text-white italic text-center min-w-[80px] ">
          {Math.round(location.current.temperature_2m)}
          <span className="not-italic"> °</span>
        </p>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-3 lg:gap-4 mt-3">
        <p className="bg-gray-100 dark:bg-ui-main-hover p-2 rounded-sm flex gap-1 items-center justify-between md:flex-col text-neutral-600 dark:text-gray-300 text-sm break-words">
          {t(language, "feels_like")}
          <span className="text-neutral-700 dark:text-white text-xl md:text-2xl">
            {Math.round(location.current.apparent_temperature)}°
          </span>
        </p>
        <p className="bg-gray-100 dark:bg-ui-main-hover p-2 rounded-sm flex gap-1 items-center justify-between md:flex-col text-neutral-600 dark:text-gray-300 text-sm break-words">
          {t(language, "humidity")}
          <span className="text-neutral-700 dark:text-white text-xl md:text-2xl">
            {Math.round(location.current.relative_humidity_2m)}
            <span className="text-sm md:text-lg">%</span>
          </span>
        </p>
        <p className="bg-gray-100 dark:bg-ui-main-hover p-2 rounded-sm flex gap-1 items-center justify-between md:flex-col text-neutral-600 dark:text-gray-300 text-sm break-words">
          {t(language, "wind")}
          <span className="text-neutral-700 dark:text-white text-xl md:text-2xl">
            {Math.round(location.current.wind_speed_10m)}
            <span className="text-sm md:text-lg"> {units.wind}</span>
          </span>
        </p>
        <p className="bg-gray-100 dark:bg-ui-main-hover p-2 rounded-sm flex gap-1 items-center justify-between md:flex-col text-neutral-600 dark:text-gray-300 text-sm break-words">
          {t(language, "precipitation")}
          <span className="text-neutral-700 dark:text-white text-xl md:text-2xl">
            {Math.round(location.current.precipitation)}
            <span className="text-sm md:text-lg"> {units.precipitation}</span>
          </span>
        </p>
      </div>
    </li>
  );
}
