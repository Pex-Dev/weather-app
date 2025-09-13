import { useState, useRef, useEffect } from "react";
import searchIcon from "../../assets/images/icon-search.svg";
import loadingIcon from "../../assets/images/icon-loading.svg";
import type { Result } from "../../types/Types";
import { UseWeatherContext } from "../../context/WeatherAppContext";

export default function SearchBar() {
  const [inputText, setInputText] = useState<string>("");
  const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
  const [results, setResults] = useState<Result[] | null>(null);

  const searchDivRef = useRef<HTMLDivElement>(null);

  const { SearchLocation, setSearchStatus, GetWeather } = UseWeatherContext();

  let inputClassName = `bg-ui-main hover:bg-ui-main-hover border-2 border-transparent focus-visible:border-background focus-visible:outline-2 focus-visible:outline-white focus-visible:border-2 transition-colors hover:cursor-pointer w-full rounded-lg text-white text-lg py-3.5`;
  inputClassName += inputText.length > 0 ? " p-3" : " pl-15";

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setResults(null);
    }
    setInputText(e.target.value);
  };

  //Submit form
  const HandleSubmit = async () => {
    if (inputText.length < 3) return;
    setSearchInProgress(true);
    const results: Result[] | null = await SearchLocation(inputText);
    if (!results) setSearchStatus("no-results");
    setResults(results);
    setSearchInProgress(false);
  };

  //Select a location and get weather
  const HandleGetWeather = (
    city: string,
    country: string,
    latitude: number,
    longitude: number
  ) => {
    GetWeather(city, country ? country : "", latitude, longitude);
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
  }, [results]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleSubmit();
      }}
      className="flex flex-col md:flex-row gap-3 w-full max-w-[670px] mx-auto mt-15"
    >
      <div ref={searchDivRef} className="relative w-full">
        <div className="relative">
          <input
            type="search"
            name="search"
            placeholder="Search for a place..."
            autoComplete="off"
            value={inputText}
            onChange={(e) => HandleInputChange(e)}
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
          <div className="flex gap-3 absolute mt-3 bg-ui-main rounded-lg p-4.5 w-full shadow-2xl">
            <img
              src={loadingIcon}
              alt="Loading icon"
              className="animate-spin"
            />
            <p className="text-white">Search in progress</p>
          </div>
        )}
        {results && (
          <ul className="flex flex-col gap-3 absolute mt-3 bg-ui-main rounded-lg p-2 w-full shadow-2xl">
            {results.length > 0 ? (
              results.map((result: Result) => (
                <li
                  key={result.id}
                  onClick={() =>
                    HandleGetWeather(
                      result.name,
                      result.country ? result.country : "",
                      result.latitude,
                      result.longitude
                    )
                  }
                  className="text-white rounded px-2 py-1  hover:bg-ui-main-hover border border-transparent hover:border-ui-main-border cursor-default  "
                >
                  <p>
                    {result.name}
                    <span>{result.admin1 ? `, ${result.admin1}` : ""}</span>
                    <span>{result.country ? `, ${result.country}` : ""}</span>
                  </p>
                </li>
              ))
            ) : (
              <li className="h-[34px] flex items-center">
                <p className="text-white">No results found</p>
              </li>
            )}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 border-2 border-transparent focus-visible:border-background focus-visible:outline-2 focus-visible:outline-blue-700 transition-colors hover:cursor-pointer text-white text-lg rounded-lg py-3.5 px-6"
      >
        Search
      </button>
    </form>
  );
}
