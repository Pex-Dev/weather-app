import iconDropdown from "../../assets/images/icon-dropdown.svg";
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
        className="bg-ui-main-border hover:cursor-pointer transition-colors flex justify-between gap-1.5 items-center py-1 md:py-2 px-3 md:px-4 rounded-md md:rounded-lg"
      >
        <span className=" text-white font-light">
          {selectedDay
            ? new Date(selectedDay).toLocaleDateString(
                language === "en" ? "en-US" : "es-ES",
                {
                  weekday: "long",
                }
              )
            : "-"}
        </span>
        <img src={iconDropdown} alt="Icon dropdown" className="max-w-3" />
      </button>
      {showDropdown && days && setSelectedDay && (
        <div className="absolute mt-3 right-0 bg-ui-main border border-ui-main-border rounded-md md:rounded-xl p-2 min-w-[212px] z-10 shadow-2xl">
          {removeDuplicates(days).map((day) => (
            <button
              key={day.toISOString()}
              className="block w-full px-2 py-1 rounded md:rounded-md text-left text-white font-extralight hover:bg-ui-main-hover focus:outline-1 focus:bg-ui-main-hover focus:outline-ui-main-border"
              onClick={() => setSelectedDay(day)}
            >
              {dateFormater(new Date(day))}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
