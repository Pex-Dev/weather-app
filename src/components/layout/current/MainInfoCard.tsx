import { getCorrectIcon, getImperialUnit } from "../../../utilities/Utilities";
import { UseWeatherContext } from "../../../context/WeatherAppContext";
import { t } from "../../../utilities/Utilities";

export default function MainInfoCard() {
  const {
    weather,
    searchStatus,
    language,
    favorites,
    handleFavorite,
    setLocationsToCompare,
    units,
  } = UseWeatherContext();

  const dateFormater = (rawDate: string): string => {
    const date = new Date(rawDate);
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isInFavorites = (latitude: number, longitude: number) => {
    return favorites.some(
      (fav) => fav.latitude === latitude && fav.longitude === longitude
    );
  };

  const labelKey = isInFavorites(weather?.latitude!, weather?.longitude!)
    ? "remove_favorite"
    : "add_favorite";

  const savedAsFavoriteIcon = (
    <svg
      width="40px"
      height="40px"
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M15.75 3.25H8.24999C7.52064 3.25 6.82117 3.53973 6.30545 4.05546C5.78972 4.57118 5.49999 5.27065 5.49999 6V20C5.49898 20.1377 5.53587 20.2729 5.60662 20.391C5.67738 20.5091 5.77926 20.6054 5.90112 20.6695C6.02298 20.7335 6.16012 20.7627 6.2975 20.754C6.43488 20.7453 6.56721 20.6989 6.67999 20.62L12 16.91L17.32 20.62C17.4467 20.7063 17.5967 20.7516 17.75 20.75C17.871 20.7486 17.9903 20.7213 18.1 20.67C18.2203 20.6041 18.3208 20.5072 18.3911 20.3894C18.4615 20.2716 18.499 20.1372 18.5 20V6C18.5 5.27065 18.2103 4.57118 17.6945 4.05546C17.1788 3.53973 16.4793 3.25 15.75 3.25Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );

  const saveAsFavoriteIcon = (
    <svg
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M17.75 20.75C17.5974 20.747 17.4487 20.702 17.32 20.62L12 16.91L6.68 20.62C6.56249 20.6915 6.42757 20.7294 6.29 20.7294C6.15243 20.7294 6.01751 20.6915 5.9 20.62C5.78491 20.5607 5.68741 20.4722 5.61722 20.3634C5.54703 20.2546 5.50661 20.1293 5.5 20V6C5.5 5.27065 5.78973 4.57118 6.30546 4.05546C6.82118 3.53973 7.52065 3.25 8.25 3.25H15.75C16.4793 3.25 17.1788 3.53973 17.6945 4.05546C18.2103 4.57118 18.5 5.27065 18.5 6V20C18.5005 20.1362 18.4634 20.2698 18.3929 20.3863C18.3223 20.5027 18.2209 20.5974 18.1 20.66C17.9927 20.7189 17.8724 20.7498 17.75 20.75ZM12 15.25C12.1532 15.2484 12.3033 15.2938 12.43 15.38L17 18.56V6C17 5.66848 16.8683 5.35054 16.6339 5.11612C16.3995 4.8817 16.0815 4.75 15.75 4.75H8.25C7.91848 4.75 7.60054 4.8817 7.36612 5.11612C7.1317 5.35054 7 5.66848 7 6V18.56L11.57 15.38C11.6967 15.2938 11.8468 15.2484 12 15.25Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );

  if (searchStatus === "success" && weather) {
    return (
      <div className="relative w-full flex flex-col md:flex-row md:items-center md:justify-between gap-9 rounded-3xl overflow-hidden py-12 md:px-5 bg-[url('/images/bg-today-small.svg')] md:bg-[url('/images/bg-today-large.svg')]  bg-no-repeat bg-cover">
        <div className="flex flex-col gap-2">
          {/* City and country */}
          <h2 className="text-white text-center md:text-left text-2xl font-semibold">
            {`${weather.name}, ${weather.country}`}
          </h2>
          <p className="text-neutral-200 text-center md:text-left">
            {dateFormater(weather.current.time)}
          </p>
        </div>
        <div className="flex items-center gap-2 mx-auto md:mx-0 min-w-[280px] md:min-w-[320px] ">
          {/* Icon */}
          <img
            src={getCorrectIcon(
              weather.current.weather_code,
              new Date(weather.current.time).getHours()
            )}
            alt="Icon sunny"
            className="max-w-30 md:max-w-32 shrink-0"
          />
          {/* Current temperature */}
          <p className="text-7xl md:text-8xl font-bold text-white italic ">
            {Math.round(
              units.temperature === "celsius"
                ? weather.current.temperature_2m
                : getImperialUnit("fahrenheit", weather.current.temperature_2m)
            )}
            <span className="not-italic"> °</span>
          </p>
        </div>
        {/* Button add to favorites */}
        <button
          aria-label={t(language, labelKey)}
          title={t(language, labelKey)}
          type="button"
          onClick={() =>
            handleFavorite({
              name: weather.name,
              country: weather.country,
              latitude: weather.latitude,
              longitude: weather.longitude,
            })
          }
          className="absolute top-4 right-4 rounded-lg p-0.5 hover:cursor-pointer text-white"
        >
          {isInFavorites(weather.latitude, weather.longitude)
            ? savedAsFavoriteIcon
            : saveAsFavoriteIcon}
        </button>
        {/* Button compare locations */}
        <button
          onClick={() => setLocationsToCompare([weather])}
          className="bg-ui-main/70 hover:bg-ui-main/90 flex gap-3 px-2 absolute bottom-3 left-2/5 md:bottom-auto md:top-4 md:left-4 rounded-md p-0.5 hover:cursor-pointer text-neutral-200 hover:text-white"
        >
          <span>{t(language, "compare")}</span>
          <svg
            fill="currentColor"
            width="25px"
            height="25px"
            viewBox="0 0 24.00 24.00"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            strokeWidth="0.00024000000000000003"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M1,8A1,1,0,0,1,2,7H9.586L7.293,4.707A1,1,0,1,1,8.707,3.293l4,4a1,1,0,0,1,0,1.414l-4,4a1,1,0,1,1-1.414-1.414L9.586,9H2A1,1,0,0,1,1,8Zm21,7H14.414l2.293-2.293a1,1,0,0,0-1.414-1.414l-4,4a1,1,0,0,0,0,1.414l4,4a1,1,0,0,0,1.414-1.414L14.414,17H22a1,1,0,0,0,0-2Z"></path>
            </g>
          </svg>
        </button>
      </div>
    );
  }

  if (searchStatus === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-9 rounded-3xl overflow-hidden  bg-white dark:bg-ui-main h-[316px] md:h-[224px]">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="animation-jump-container flex gap-2 w-fit">
            <span className="animation-jump block w-2 h-2 bg-neutral-600 dark:bg-white rounded-full"></span>
            <span className="animation-jump block w-2 h-2 bg-neutral-600 dark:bg-white rounded-full"></span>
            <span className="animation-jump block w-2 h-2 bg-neutral-600 dark:bg-white rounded-full"></span>
          </div>
          <p className="text-neutral-500 dark:text-neutral-300">
            {t(language, "loading")}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
