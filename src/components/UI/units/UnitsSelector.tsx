import iconUnits from "../../../assets/images/icon-units.svg";
import iconDropdown from "../../../assets/images/icon-dropdown.svg";
import UnitsDropdown from "./UnitsDropdown";
import { useEffect, useRef, useState } from "react";

export default function UnitsSelector() {
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const unitsDiv = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={unitsDiv} className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="bg-ui-main hover:bg-ui-main-hover hover:cursor-pointer transition-colors flex justify-between gap-1.5 items-center py-1 md:py-2 px-3 md:px-4 rounded-md"
      >
        <img src={iconUnits} alt="Icon units" className="max-w-4 " />
        <span className=" text-white font-light">Units</span>
        <img src={iconDropdown} alt="Icon dropdown" className="max-w-3" />
      </button>
      {showDropdown && <UnitsDropdown />}
    </div>
  );
}
