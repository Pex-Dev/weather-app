export default function UnitsDropdown() {
  return (
    <div className="absolute mt-3 right-0 bg-ui-main border border-ui-main-border rounded-md md:rounded-xl p-2 min-w-[212px] z-10">
      <button className="text-white text-nowrap p-2 hover:bg-ui-main-hover w-full rounded text-left hover:cursor-pointer">
        Switch to imperial
      </button>
      <div className="flex flex-col z-10">
        <h3 className="text-label text-sm px-2 mb-2">Temperature</h3>
        <label className="px-2 py-1 rounded md:rounded-md text-white font-extralight hover:bg-ui-main-hover">
          Celsius (°C)
          <input
            type="radio"
            name="temperature"
            value="Celsius"
            className="appearance-none"
          />
        </label>
        <label className="px-2 py-1 rounded md:rounded-md text-white font-extralight hover:bg-ui-main-hover">
          Fahrenheit (°F)
          <input
            type="radio"
            name="temperature"
            value="Fahrenheit"
            className="appearance-none"
          />
        </label>
      </div>
      <hr className="text-gray-700 h-[1px] my-2" />
      <div className="flex flex-col z-10">
        <h3 className="text-label text-sm px-2 mb-2">Wind Speed</h3>
        <label className="px-2 py-1 rounded md:rounded-md text-white font-extralight hover:bg-ui-main-hover">
          km/h
          <input
            type="radio"
            name="wind_speed"
            value="kmh"
            className="appearance-none"
          />
        </label>
        <label className="px-2 py-1 rounded md:rounded-md text-white font-extralight hover:bg-ui-main-hover">
          mph
          <input
            type="radio"
            name="wind_speed"
            value="mph"
            className="appearance-none"
          />
        </label>
      </div>
      <hr className="text-gray-700 h-[1px] my-2" />
      <div className="flex flex-col z-10">
        <h3 className="text-label text-sm px-2 mb-2">Precipitation</h3>
        <label className="px-2 py-1 rounded md:rounded-md text-white font-extralight hover:bg-ui-main-hover">
          Milimeters (mm)
          <input
            type="radio"
            name="wind_speed"
            value="milimeters"
            className="appearance-none"
          />
        </label>
        <label className="px-2 py-1 rounded md:rounded-md text-white font-extralight hover:bg-ui-main-hover">
          Inches (in)
          <input
            type="radio"
            name="wind_speed"
            value="inches"
            className="appearance-none"
          />
        </label>
      </div>
    </div>
  );
}
