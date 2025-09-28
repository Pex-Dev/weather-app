import { useState, useRef, useEffect } from "react";
import { UseWeatherContext } from "../../context/WeatherAppContext";
import type { Result } from "../../types/Types";
import { t } from "../../utilities/Utilities";
import useSpeech from "../../hooks/useSpeech";
import searchIcon from "../../assets/images/icon-search.svg";
import Favorites from "./favorites/Favorites";

export default function SearchBar({
  favoriteButton = false,
  showNoResultsScreen = false,
  resultOnClick,
}: {
  favoriteButton?: boolean;
  showNoResultsScreen?: boolean;
  resultOnClick?: (result: Result) => void;
}) {
  const [inputText, setInputText] = useState<string>("");
  const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const searchDivRef = useRef<HTMLDivElement>(null);

  const { searchLocation, setSearchStatus, getWeather, language } =
    UseWeatherContext();

  const speechResults = (result: string) => {
    setInputText(result);
    handleSubmit(result);
  };

  const {
    speechRecognitionSupported,
    microphonePermission,
    startListening,
    stopListening,
    listening,
  } = useSpeech(speechResults);

  let inputClassName = `shadow-sm md:shadow-md bg-white hover:bg-neutral-100 dark:bg-ui-main hover:dark:bg-ui-main-hover border-2 border-transparent focus-visible:border-background focus-visible:outline-2 focus-visible:outline-white focus-visible:border-2 transition-colors hover:cursor-pointer w-full rounded-lg text-neutral-800 dark:text-white text-lg py-1.5 md:py-3.5 pr-12`;
  inputClassName += inputText.length > 0 ? " p-3" : " pl-15";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setResults(null);
    }
    setInputText(e.target.value);
  };

  //Submit form
  const handleSubmit = async (speechSearch: string = "") => {
    if (speechSearch.length === 0) {
      if (inputText.length < 3) return;
    }

    setSearchInProgress(true);
    const results: Result[] | null = await searchLocation(
      speechSearch.length > 0 ? speechSearch : inputText
    );
    if (!results && showNoResultsScreen) setSearchStatus("no-results");
    setResults(results !== null ? results : []);
    setSearchInProgress(false);
  };

  //Select a location and get weather
  const handlegetWeather = (
    city: string,
    country: string,
    latitude: number,
    longitude: number
  ) => {
    getWeather(city, country ? country : "", latitude, longitude);
    setResults(null);
  };

  //Handle click outside
  useEffect(() => {
    const HandleClickOutside = (e: MouseEvent) => {
      if (searchDivRef && !searchDivRef.current?.contains(e.target as Node)) {
        setResults(null);
      }
    };

    window.addEventListener("mousedown", HandleClickOutside);
    () => window.removeEventListener("mousedown", HandleClickOutside);
  }, [results]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col md:flex-row gap-3 w-full max-w-[670px] mx-auto mt-10"
    >
      <div ref={searchDivRef} className="relative w-full">
        <div className="relative">
          {/* Input search */}
          <input
            type="search"
            name="search"
            placeholder={t(language, "search_placeholder")}
            autoComplete="off"
            value={inputText}
            onChange={(e) => handleInputChange(e)}
            className={inputClassName}
          />
          {inputText.length < 1 && (
            <div className="h-full absolute top-0 flex justify-center items-center p-4 md:p-5">
              <img src={searchIcon} alt="Search icon" />
            </div>
          )}
          {speechRecognitionSupported && (
            <div className="absolute right-0 top-0 flex items-center h-full">
              <button
                aria-label="Search by speech"
                type="button"
                title={
                  microphonePermission
                    ? t(language, "search_by_speech")
                    : t(language, "microphone_blocked")
                }
                className={`p-3 ${
                  microphonePermission
                    ? "cursor-pointer text-neutral-500 dark:text-white"
                    : "cursor-not-allowed text-neutral-500/30 dark:text-white/30"
                } ${listening ? "animate-pulse" : "hover:scale-105"}`}
                onClick={() => (listening ? stopListening() : startListening())}
              >
                <svg
                  width="23px"
                  height="23px"
                  viewBox="0 0 16 16"
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
                      d="M5 3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3V7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7V3Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M9 13.9291V16H7V13.9291C3.60771 13.4439 1 10.5265 1 7V6H3V7C3 9.76142 5.23858 12 8 12C10.7614 12 13 9.76142 13 7V6H15V7C15 10.5265 12.3923 13.4439 9 13.9291Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          )}
        </div>
        {searchInProgress && (
          // Searching message
          <div className="flex items-center gap-3 absolute mt-3 bg-white dark:bg-ui-main rounded-lg p-4.5 w-full shadow-2xl z-10 text-neutral-700 dark:text-white">
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M9.25 1.5c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25C6.75.812 7.281.25 8 .25c.688 0 1.25.563 1.25 1.25ZM8 13.25c.688 0 1.25.563 1.25 1.25 0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25ZM15.75 8c0 .719-.563 1.25-1.25 1.25-.719 0-1.25-.531-1.25-1.25 0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm-13 0c0 .719-.563 1.25-1.25 1.25C.781 9.25.25 8.719.25 8c0-.688.531-1.25 1.25-1.25.688 0 1.25.563 1.25 1.25Zm.625-5.844c.719 0 1.25.563 1.25 1.25 0 .719-.531 1.25-1.25 1.25-.688 0-1.25-.531-1.25-1.25 0-.687.563-1.25 1.25-1.25Zm9.219 9.219c.687 0 1.25.531 1.25 1.25 0 .688-.563 1.25-1.25 1.25-.719 0-1.25-.563-1.25-1.25 0-.719.531-1.25 1.25-1.25Zm-9.219 0c.719 0 1.25.531 1.25 1.25 0 .688-.531 1.25-1.25 1.25-.688 0-1.25-.563-1.25-1.25 0-.719.563-1.25 1.25-1.25Z"
              />
            </svg>
            <p>{t(language, "searching")}</p>
          </div>
        )}
        {/* Results */}
        {results && (
          <ul className="flex flex-col gap-3 absolute mt-3 bg-white dark:bg-ui-main border border-cyan-300 dark:border-ui-main-border rounded-lg p-2 w-full shadow-2xl z-10">
            {results.length > 0 ? (
              results.map((result: Result) => (
                //Individual result
                <li key={result.id}>
                  <button
                    onClick={() => {
                      if (
                        resultOnClick !== null &&
                        resultOnClick !== undefined
                      ) {
                        resultOnClick(result);
                        setResults(null);
                        return;
                      }
                      handlegetWeather(
                        result.name,
                        result.country ? result.country : "",
                        result.latitude,
                        result.longitude
                      );
                    }}
                    className="w-full text-left text-neutral-700 dark:text-white rounded px-2 py-1  hover:bg-gray-100 hover:dark:bg-ui-main-hover border border-transparent hover:border-gray-200 hover:dark:border-ui-main-border cursor-default focus:bg-ui-main-hover focus:border-ui-main-border focus:outline-0"
                  >
                    <p>
                      {result.name}
                      <span>{result.admin1 ? `, ${result.admin1}` : ""}</span>
                      <span>{result.country ? `, ${result.country}` : ""}</span>
                    </p>
                  </button>
                </li>
              ))
            ) : (
              //No results
              <li className="h-[34px] flex items-center">
                <p className="text-neutral-700 dark:text-white">
                  {t(language, "no_results")}
                </p>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="shadow-md flex bg-white dark:bg-ui-main-hover rounded-lg">
        {/* Button submit */}
        <button
          type="submit"
          aria-label={t(language, "search")}
          title={t(language, "search")}
          className="flex-1 border-2 border-white dark:border-ui-main bg-green-700 hover:bg-green-800 dark:bg-blue-700 hover:dark:bg-blue-800 focus-visible:border-background focus-visible:outline-2 focus-visible:outline-blue-700 transition-colors hover:cursor-pointer text-white text-lg rounded-lg py-1.5 md:py-3.5 px-6"
        >
          {t(language, "search")}
        </button>
        {favoriteButton && (
          //Button favorites
          <button
            type="button"
            aria-label={t(language, "favorites")}
            title={t(language, "favorites")}
            className="text-neutral-400 hover:text-neutral-500 hover:dark:text-yellow-100 dark:text-white px-3 hover:cursor-pointer transition-colors"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <svg
              width="35px"
              height="35px"
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
          </button>
        )}
      </div>
      {showFavorites && <Favorites close={() => setShowFavorites(false)} />}
    </form>
  );
}
