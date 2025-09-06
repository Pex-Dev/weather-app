import iconUnits from "../../assets/images/icon-units.svg";
import iconDropdown from "../../assets/images/icon-dropdown.svg";
import UnitsDropdown from "./UnitsDropdown";
import { useEffect, useRef, useState } from "react";

export default function UnitsSelector() {
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const unitsDropdownMenuRef = useRef<HTMLDivElement>(null);

  //Close menu when click outside
  useEffect(() => {
    const HandleClickOutside = (e: MouseEvent) => {
      if (
        unitsDropdownMenuRef &&
        !unitsDropdownMenuRef.current?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("mousedown", HandleClickOutside);
  }, [showDropdown]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="bg-ui-main hover:bg-ui-main-hover hover:cursor-pointer transition-colors flex justify-between gap-1.5 items-center py-1 md:py-2 px-3 md:px-4 rounded-md"
      >
        <img src={iconUnits} alt="Icon units" className="max-w-4 " />
        <span className=" text-white font-light">Units</span>
        <img src={iconDropdown} alt="Icon dropdown" className="max-w-3" />
      </button>
      {showDropdown && <UnitsDropdown ref={unitsDropdownMenuRef} />}
    </div>
  );
}
