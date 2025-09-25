import { UseWeatherContext } from "../../../context/WeatherAppContext";
import type { Location } from "../../../types/Types";
import { t } from "../../../utilities/Utilities";

export default function Favorites({ close }: { close: () => void }) {
  const { language, favorites, handleFavorite, getWeather } =
    UseWeatherContext();
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

  const deleteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      <path d="M10 12l4 4m0 -4l-4 4" />
    </svg>
  );

  const handleGetWeather = (location: Location) => {
    getWeather(
      location.name,
      location.name,
      location.latitude,
      location.longitude
    );
    close();
  };

  return (
    <div className="h-dvh w-dvw fixed top-0 left-0 bg-black/90 flex justify-center items-center z-20">
      <div className="bg-white dark:bg-ui-main md:rounded-lg p-4 w-full min-h-full md:w-auto md:min-h-auto md:min-w-[500px] md:h-[500px] ">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl text-neutral-700 dark:text-white">
            {t(language, "favorites")}
          </h2>
          <button
            aria-label={t(language, "close")}
            title={t(language, "close")}
            className="text-neutral-700 dark:text-white hover:cursor-pointer"
            onClick={close}
          >
            {closeIcon}
          </button>
        </header>
        {favorites.length === 0 ? (
          <p className="text-gray-300 text-center mt-10 text-xl font-dmsans">
            {t(language, "no_favorites")}
          </p>
        ) : (
          <ul className="flex flex-col gap-2 mt-4 text-white">
            {favorites.map((fav) => (
              <li className="flex justify-between items-center bg-neutral-200 dark:bg-ui-main-hover px-2 py-1 md:px-3 md:py-2 rounded-md border-2 border-transparent hover:border-ui-main-border">
                <p
                  className="text-neutral-600 dark:text-gray-300 hover:text-neutral-700 hover:dark:text-white cursor-pointer"
                  onClick={() => handleGetWeather(fav)}
                >
                  {fav.name}, {fav.country}
                </p>
                <button
                  aria-label={t(language, "delete")}
                  title={t(language, "delete")}
                  className="text-gray-400 md:text-gray-500 hover:text-neutral-700 hover:dark:text-white cursor-pointer"
                  onClick={() => handleFavorite(fav)}
                >
                  {deleteIcon}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
