import { UseWeatherContext } from "../../context/WeatherAppContext";
import useGeolocalization from "../../hooks/useGeolocalization";
import { t } from "../../utilities/Utilities";
export default function Geolocation() {
  const { language } = UseWeatherContext();
  const { geolocationnStatus, getCurrentLocation } = useGeolocalization();

  if (geolocationnStatus === "not supported") {
    return (
      <p className="mx-auto mt-15 md:mt-18 py-2 px-3 text-center text-white border border-red-500 mb-5 max-w-[500px] ">
        {t(language, "geolocation_not_supported")}
      </p>
    );
  }

  return (
    <div className="mx-auto w-fit mt-15 md:mt-18">
      {geolocationnStatus === "denied" && (
        <p className="py-2 px-3 text-center text-white border border-red-500 mb-5 max-w-[500px] ">
          {t(language, "location_blocked")}
        </p>
      )}
      {geolocationnStatus === "error" && (
        <p className="py-2 px-3 text-center text-white border border-red-500 mb-5 max-w-[500px] ">
          {t(language, "geolocation_error")}
        </p>
      )}
      <button
        onClick={() => getCurrentLocation()}
        className={`p-2 max-w-[300px] flex items-center text-lg rounded-lg  transition-colors  w-fit mx-auto ${
          geolocationnStatus === "searching"
            ? "bg-green-700/40 hover:cursor-progress text-white/40"
            : "bg-green-700 hover:bg-green-800 hover:cursor-pointer  text-white"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
        </svg>
        <span>{t(language, "get_location")}</span>
      </button>
    </div>
  );
}
