import iconDropdown from "../../../assets/images/icon-dropdown.svg";
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
        className="bg-ui-main hover:bg-ui-main-hover hover:cursor-pointer transition-colors flex justify-between gap-1.5 items-center py-1 md:py-2 px-3 md:px-4 rounded-md"
      >
        <img
          src={languagesFlags[language]}
          alt={`Flag of ${language}`}
          className="max-w-5 max-h-4"
        />
        <span className=" text-white font-light uppercase">{language}</span>
        <img src={iconDropdown} alt="Icon dropdown" className="max-w-3" />
      </button>
      {showDropdown && (
        <div className="absolute mt-3 right-0 bg-ui-main border border-ui-main-border rounded-md md:rounded-xl p-1 min-w-[100px] z-10">
          <button
            onClick={() => {
              handleLanguageChange("en");
              setShowDropdown(false);
            }}
            className="flex items-center gap-2 w-full px-2 py-1 rounded md:rounded-md text-left text-white font-extralight hover:bg-ui-main-hover focus:outline-1 focus:bg-ui-main-hover focus:outline-ui-main-border"
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
            className="flex items-center gap-2 w-full px-2 py-1 rounded md:rounded-md text-left text-white font-extralight hover:bg-ui-main-hover focus:outline-1 focus:bg-ui-main-hover focus:outline-ui-main-border"
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
