import { useState, useRef, useEffect } from "react";
import searchIcon from "../../assets/images/icon-search.svg";
import loadingIcon from "../../assets/images/icon-loading.svg";
import type { Result } from "../../types/Types";
import { UseWeatherContext } from "../../context/WeatherAppContext";
import { t } from "../../utilities/Utilities";
import Favorites from "./favorites/Favorites";

export default function SearchBar() {
  const [inputText, setInputText] = useState<string>("");
  const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const searchDivRef = useRef<HTMLDivElement>(null);

  const { searchLocation, setSearchStatus, getWeather, language } =
    UseWeatherContext();

  let inputClassName = `bg-ui-main hover:bg-ui-main-hover border-2 border-transparent focus-visible:border-background focus-visible:outline-2 focus-visible:outline-white focus-visible:border-2 transition-colors hover:cursor-pointer w-full rounded-lg text-white text-lg py-3.5`;
  inputClassName += inputText.length > 0 ? " p-3" : " pl-15";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setResults(null);
    }
    setInputText(e.target.value);
  };

  //Submit form
  const handleSubmit = async () => {
    if (inputText.length < 3) return;
    setSearchInProgress(true);
    const results: Result[] | null = await searchLocation(inputText);
    if (!results) setSearchStatus("no-results");
    setResults(results);
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
            <img
              src={searchIcon}
              alt="Search icon"
              className="absolute left-5 top-1/3"
            />
          )}
        </div>
        {searchInProgress && (
          <div className="flex gap-3 absolute mt-3 bg-ui-main rounded-lg p-4.5 w-full shadow-2xl z-10">
            <img
              src={loadingIcon}
              alt="Loading icon"
              className="animate-spin"
            />
            <p className="text-white">{t(language, "searching")}</p>
          </div>
        )}
        {results && (
          <ul className="flex flex-col gap-3 absolute mt-3 bg-ui-main rounded-lg p-2 w-full shadow-2xl z-10">
            {results.length > 0 ? (
              results.map((result: Result) => (
                <li key={result.id}>
                  <button
                    onClick={() =>
                      handlegetWeather(
                        result.name,
                        result.country ? result.country : "",
                        result.latitude,
                        result.longitude
                      )
                    }
                    className="w-full text-left text-white rounded px-2 py-1  hover:bg-ui-main-hover border border-transparent hover:border-ui-main-border cursor-default focus:bg-ui-main-hover focus:border-ui-main-border focus:outline-0"
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
              <li className="h-[34px] flex items-center">
                <p className="text-white">{t(language, "no_results")}</p>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-700 hover:bg-blue-800 border-2 border-transparent focus-visible:border-background focus-visible:outline-2 focus-visible:outline-blue-700 transition-colors hover:cursor-pointer text-white text-lg rounded-lg py-3.5 px-6"
        >
          {t(language, "search")}
        </button>
        <button
          type="button"
          aria-label={t(language, "favorites")}
          title={t(language, "favorites")}
          className="text-white bg-yellow-500 rounded-lg px-3 hover:bg-yellow-600 hover:cursor-pointer transition-colors"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <svg
            fill="currentColor"
            width="40px"
            height="40px"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M47 43h553q10 0 16.5 7t6.5 16v29q0 9-6.5 16t-16.5 7H47q-10 0-17-7t-7-16V66q0-9 7-16t17-7zm0 139h553q10 0 16.5 7t6.5 17v28q0 10-6.5 16.5T600 257H47q-10 0-17-6.5T23 234v-28q0-10 7-17t17-7zm0 140h359q10 0 17 6.5t7 16.5v28q0 10-7 17t-17 7H47q-10 0-17-7t-7-17v-28q0-10 7-16.5t17-6.5zm0 139h153q10 0 16.5 7t6.5 16v29q0 9-6.5 16t-16.5 7H47q-10 0-17-7t-7-16v-29q0-9 7-16t17-7zm578 386l-151 79q-9 5-19.5 4t-19-7-12.5-16-3-20l29-168q4-19-10-32L317 568q-8-7-10.5-17.5t1-20.5 11.5-17 18-8l169-25q19-2 27-20l76-152q4-10 13-15.5t19.5-5.5 19.5 5.5 14 15.5l75 152q9 18 28 20l168 25q11 1 19 8t11 17 .5 20.5T967 568L845 687q-14 13-10 32l28 168q2 10-2 20t-12.5 16-19 7-20.5-4l-150-79q-17-9-34 0z"></path>
            </g>
          </svg>
        </button>
      </div>
      {showFavorites && <Favorites close={() => setShowFavorites(false)} />}
    </form>
  );
}
