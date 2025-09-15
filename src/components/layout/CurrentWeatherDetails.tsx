import DetailedInfoCard from "../UI/DetailedInfoCard";
import { UseWeatherContext } from "../../context/WeatherAppContext";

export default function CurrentWeatherDetails() {
  const { weather, searchStatus, units } = UseWeatherContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
      <DetailedInfoCard
        label="Feels Like"
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(weather.current.temperature_2m)}°`
            : ""
        }
      />
      <DetailedInfoCard
        label="Humidity"
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(weather.current.relative_humidity_2m)}%`
            : ""
        }
      />
      <DetailedInfoCard
        label="Wind"
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(weather.current.wind_speed_10m)} ${units.wind}`
            : ""
        }
      />
      <DetailedInfoCard
        label="Precipitation"
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(weather.current.precipitation)} ${
                units.precipitation
              }`
            : ""
        }
      />
    </div>
  );
}
