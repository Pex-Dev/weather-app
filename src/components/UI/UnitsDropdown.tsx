import { UseWeatherContext } from "../../context/WeatherAppContext";
import UnitLabel from "./UnitLabel";

export default function UnitsDropdown() {
  const { units, HandleUnitChange, mainUnits, setMainUnits } =
    UseWeatherContext();

  return (
    <div className="absolute mt-3 right-0 bg-ui-main border border-ui-main-border rounded-md md:rounded-xl p-2 min-w-[212px] z-10">
      <button
        onClick={() =>
          setMainUnits((pMainUnits) =>
            pMainUnits === "imperial" ? "metric" : "imperial"
          )
        }
        className="text-white text-nowrap p-2 hover:bg-ui-main-hover w-full rounded text-left hover:cursor-pointer"
      >
        Switch to {mainUnits === "imperial" ? "metric" : "imperial"}
      </button>
      <div className="flex flex-col z-10">
        <h3 className="text-label text-sm px-2 mb-2">Temperature</h3>
        <UnitLabel
          label="Celsius (°C)"
          name="temperature"
          value="celsius"
          selected={units.temperature == "celsius"}
          onClick={() => HandleUnitChange("temperature", "celsius")}
        />
        <UnitLabel
          label="Fahrenheit (°F)"
          name="temperature"
          value="fahrenheit"
          selected={units.temperature == "fahrenheit"}
          onClick={() => HandleUnitChange("temperature", "fahrenheit")}
        />
      </div>
      <hr className="text-gray-700 h-[1px] my-2" />
      <div className="flex flex-col z-10">
        <h3 className="text-label text-sm px-2 mb-2">Wind Speed</h3>
        <UnitLabel
          label="km/h"
          name="wind"
          value="kmh"
          selected={units.wind == "kmh"}
          onClick={() => HandleUnitChange("wind", "kmh")}
        />
        <UnitLabel
          label="mph"
          name="wind"
          value="mph"
          selected={units.wind == "mph"}
          onClick={() => HandleUnitChange("wind", "mph")}
        />
      </div>
      <hr className="text-gray-700 h-[1px] my-2" />
      <div className="flex flex-col z-10">
        <h3 className="text-label text-sm px-2 mb-2">Precipitation</h3>
        <UnitLabel
          label="Milimeters (mm)"
          name="precipitation"
          value="mm"
          selected={units.precipitation == "mm"}
          onClick={() => HandleUnitChange("precipitation", "mm")}
        />
        <UnitLabel
          label="Inches (in)"
          name="precipitation"
          value="inch"
          selected={units.precipitation == "inch"}
          onClick={() => HandleUnitChange("precipitation", "inch")}
        />
      </div>
    </div>
  );
}
