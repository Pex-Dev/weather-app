import esFlag from "../../../assets/images/spain_flag.jpg";
import enFlag from "../../../assets/images/uk_flag.jpg";
import { useEffect, useRef, useState } from "react";
import { UseWeatherContext } from "../../../context/WeatherAppContext";

export default function LanguageSelector() {
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const unitsDiv = useRef<HTMLDivElement>(null);
  const { language, handleLanguageChange } = UseWeatherContext();

  //Close menu when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (unitsDiv && !unitsDiv.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    //Remove event listener when the component dismount
    window.addEventListener("mousedown", handleClickOutside);
    () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const languagesFlags = {
    en: enFlag,
    es: esFlag,
  };

  return (
    <div ref={unitsDiv} className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="bg-white shadow-md dark:shadow-none dark:bg-ui-main hover:bg-neutral-200 hover:dark:bg-ui-main-hover hover:cursor-pointer transition-colors flex justify-between gap-1.5 items-center py-1 md:py-2 px-3 md:px-4 rounded-md"
      >
        <img
          src={languagesFlags[language]}
          alt={`Flag of ${language}`}
          className="max-w-5 max-h-4"
        />
        <span className="text-neutral-700 dark:text-white font-light uppercase">
          {language}
        </span>
        <svg
          className="text-black dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="8"
          fill="none"
          viewBox="0 0 13 8"
        >
          <path
            fill="currentColor"
            d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"
          />
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute mt-3 right-0 shadow-md bg-white dark:bg-ui-main border border-neutral-200 dark:border-ui-main-border rounded-md md:rounded-xl p-1 min-w-[100px] z-10">
          <button
            onClick={() => {
              handleLanguageChange("en");
              setShowDropdown(false);
            }}
            className="flex items-center gap-2 w-full px-2 py-1 rounded md:rounded-md text-left text-neutral-700 dark:text-white font-extralight hover:bg-neutral-100 hover:dark:bg-ui-main-hover focus:outline-1 focus:bg-neutral-100 focus:outline-neutral-300 focus:dark:bg-ui-main-hover focus:dark:outline-ui-main-border"
          >
            <img
              src={enFlag}
              alt="Flag of English"
              className="max-w-5 max-h-4"
            />
            English
          </button>
          <button
            onClick={() => {
              handleLanguageChange("es");
              setShowDropdown(false);
            }}
            className="flex items-center gap-2 w-full px-2 py-1 rounded md:rounded-md text-left text-neutral-700 dark:text-white font-extralight hover:bg-neutral-100 hover:dark:bg-ui-main-hover focus:outline-1 focus:bg-neutral-100 focus:outline-neutral-300 focus:dark:bg-ui-main-hover focus:dark:outline-ui-main-border"
          >
            <img
              src={esFlag}
              alt="Flag of English"
              className="max-w-5 max-h-4"
            />
            Spanish
          </button>
        </div>
      )}
    </div>
  );
}
