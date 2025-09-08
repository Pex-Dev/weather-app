import iconDropdown from "../../assets/images/icon-dropdown.svg";
import UnitsDropdown from "./UnitsDropdown";
import { useEffect, useRef, useState } from "react";

export default function DaySelector() {
  const [selectedDay, setSelectedDay] = useState<
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  >("Tuesday");
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const daysDiv = useRef<HTMLDivElement>(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  //Close menu when click outside
  useEffect(() => {
    const HandleClickOutside = (e: MouseEvent) => {
      if (daysDiv && !daysDiv.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("mousedown", HandleClickOutside);
  }, [showDropdown]);

  return (
    <div ref={daysDiv} className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="bg-ui-main-border hover:cursor-pointer transition-colors flex justify-between gap-1.5 items-center py-1 md:py-2 px-3 md:px-4 rounded-md md:rounded-lg"
      >
        <span className=" text-white font-light">{selectedDay}</span>
        <img src={iconDropdown} alt="Icon dropdown" className="max-w-3" />
      </button>
      {showDropdown && (
        <div className="absolute mt-3 right-0 bg-ui-main border border-ui-main-border rounded-md md:rounded-xl p-2 min-w-[212px] z-10 shadow-2xl">
          {days.map((day) => (
            <label className="block w-full px-2 py-1 rounded md:rounded-md text-white font-extralight hover:bg-ui-main-hover">
              {day}
              <input
                type="radio"
                name="day"
                value={day}
                className="appearance-none"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
