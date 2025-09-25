import { useEffect, useRef, useState } from "react";
import { UseWeatherContext } from "../../context/WeatherAppContext";

export default function DaySelector({
  days,
  selectedDay,
  setSelectedDay,
}: {
  days?: string[];
  selectedDay?: Date;
  setSelectedDay?: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const daysDiv = useRef<HTMLDivElement>(null);

  const { language } = UseWeatherContext();

  //Close menu when click outside
  useEffect(() => {
    const HandleClickOutside = (e: MouseEvent) => {
      if (daysDiv && !daysDiv.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("mousedown", HandleClickOutside);
    return () => window.removeEventListener("mousedown", HandleClickOutside);
  }, [showDropdown]);

  const dateFormater = (rawDate: Date): string => {
    return new Date(rawDate).toLocaleDateString(
      language === "en" ? "en-US" : "es-ES",
      {
        weekday: "long",
      }
    );
  };

  const removeDuplicates = (dates: string[]) => {
    const days: number[] = [];
    const fixedDates: Date[] = [];

    //Add only the days that do no repeat
    dates.forEach((date) => {
      if (!days.includes(new Date(date).getDate())) {
        days.push(new Date(date).getDate());
        fixedDates.push(new Date(date));
      }
    });
    return fixedDates;
  };

  return (
    <div ref={daysDiv} className="relative">
      <button
        onClick={() => {
          if (!days) return;
          setShowDropdown((prev) => !prev);
        }}
        className="bg-neutral-200 dark:bg-ui-main-border hover:cursor-pointer transition-colors flex justify-between gap-1.5 items-center py-1 md:py-2 px-3 md:px-4 rounded-md md:rounded-lg"
      >
        <span className="text-neutral-700 dark:text-white font-light">
          {selectedDay
            ? new Date(selectedDay).toLocaleDateString(
                language === "en" ? "en-US" : "es-ES",
                {
                  weekday: "long",
                }
              )
            : "-"}
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
      {showDropdown && days && setSelectedDay && (
        <div className="absolute mt-3 right-0 bg-white dark:bg-ui-main border border-neutral-400 dark:border-ui-main-border rounded-md md:rounded-xl p-2 min-w-[212px] z-10 shadow-2xl">
          {removeDuplicates(days).map((day) => (
            <button
              key={day.toISOString()}
              className="block w-full px-2 py-1 rounded md:rounded-md text-left text-neutral-700 dark:text-white font-extralight hover:bg-neutral-100 hover:dark:bg-ui-main-hover focus:outline-1 focus:bg-neutral-100 focus:outline-neutral-200 focus:dark:bg-ui-main-hover focus:dark:outline-ui-main-border"
              onClick={() => {
                setSelectedDay(day);
                setShowDropdown(false);
              }}
            >
              {dateFormater(new Date(day))}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
