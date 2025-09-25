import { UseWeatherContext } from "../../../context/WeatherAppContext";
import { t } from "../../../utilities/Utilities";
import UnitLabel from "./UnitLabel";

export default function UnitsDropdown() {
  const {
    units,
    handleUnitChange,
    mainUnits,
    handleMainUnitsChange,
    language,
  } = UseWeatherContext();

  return (
    <div className="absolute mt-3 right-0 shadow-md bg-white dark:bg-ui-main border border-neutral-200 dark:border-ui-main-border rounded-md md:rounded-xl p-2 min-w-[212px] z-10">
      <button
        onClick={() =>
          handleMainUnitsChange(
            mainUnits === "imperial" ? "metric" : "imperial"
          )
        }
        className="text-neutral-700 dark:text-white text-nowrap p-2 hover:bg-neutral-200 hover:dark:bg-ui-main-hover w-full rounded text-left hover:cursor-pointer"
      >
        {t(language, "switch_to")}{" "}
        {mainUnits === "imperial"
          ? t(language, "metric")
          : t(language, "imperial")}
      </button>
      <div className="flex flex-col z-10 gap-[1px]">
        <h3 className="text-neutral-500 dark:text-label text-sm px-2 mb-2">
          {t(language, "temperature")}
        </h3>
        <UnitLabel
          label="Celsius (°C)"
          name={t(language, "temperature")}
          value="celsius"
          selected={units.temperature == "celsius"}
          onClick={() => handleUnitChange("temperature", "celsius")}
        />
        <UnitLabel
          label="Fahrenheit (°F)"
          name={t(language, "temperature")}
          value="fahrenheit"
          selected={units.temperature == "fahrenheit"}
          onClick={() => handleUnitChange("temperature", "fahrenheit")}
        />
      </div>
      <hr className="text-gray-700 h-[1px] my-2" />
      <div className="flex flex-col z-10 gap-[1px]">
        <h3 className="text-neutral-500 dark:text-label text-sm px-2 mb-2">
          {t(language, "wind")}
        </h3>
        <UnitLabel
          label="km/h"
          name={t(language, "wind")}
          value="kmh"
          selected={units.wind == "kmh"}
          onClick={() => handleUnitChange("wind", "kmh")}
        />
        <UnitLabel
          label="mph"
          name={t(language, "wind")}
          value="mph"
          selected={units.wind == "mph"}
          onClick={() => handleUnitChange("wind", "mph")}
        />
      </div>
      <hr className="text-gray-700 h-[1px] my-2" />
      <div className="flex flex-col z-10 gap-[1px]">
        <h3 className="text-neutral-500 dark:text-label text-sm px-2 mb-2">
          {t(language, "precipitation")}
        </h3>
        <UnitLabel
          label={`${t(language, "millimeters")} (mm)`}
          name={t(language, "precipitation")}
          value="mm"
          selected={units.precipitation == "mm"}
          onClick={() => handleUnitChange("precipitation", "mm")}
        />
        <UnitLabel
          label={`${t(language, "inches")} (in)`}
          name={t(language, "precipitation")}
          value="inch"
          selected={units.precipitation == "inch"}
          onClick={() => handleUnitChange("precipitation", "inch")}
        />
      </div>
    </div>
  );
}
