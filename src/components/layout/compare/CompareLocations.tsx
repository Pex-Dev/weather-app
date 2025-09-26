import { UseWeatherContext } from "../../../context/WeatherAppContext";
import LocationToCompare from "./LocationToCompare";
import SearchBar from "../../UI/SearchBar";
import type { Result } from "../../../types/Types";
import { t } from "../../../utilities/Utilities";

export default function CompareLocations() {
  const { locationsToCompare, setLocationsToCompare, getWeather, language } =
    UseWeatherContext();

  const handleResult = (result: Result) => {
    const exist = locationsToCompare?.some(
      (location) =>
        location.latitude == result.latitude &&
        location.longitude == result.longitude
    );
    if (!exist) {
      getWeather(
        result.name,
        result.country !== undefined ? result.country : "",
        result.latitude,
        result.longitude,
        false,
        true
      );
    }
  };

  return (
    <div className="mt-8">
      <header className="flex justify-start">
        <button
          aria-label={t(language, "back_to_forecast")}
          title={t(language, "back_to_forecast")}
          onClick={() => setLocationsToCompare(null)}
          className="text-gray-100 hover:text-white hover:cursor-pointer dark:text-"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 14l-4 -4l4 -4" />
            <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
          </svg>
        </button>
        <h1 className="w-full text-5xl text-white font-bricolage-grotesque text-center">
          {t(language, "compare_locations")}
        </h1>
      </header>
      <SearchBar resultOnClick={handleResult} />
      {locationsToCompare !== null && (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:p-4 mt-8">
          {locationsToCompare.map((location) => (
            <LocationToCompare
              key={`${location.latitude}.${location.longitude}`}
              location={location}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
