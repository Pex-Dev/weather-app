import DetailedInfoCard from "./DetailedInfoCard";
import { UseWeatherContext } from "../../../context/WeatherAppContext";
import { getImperialUnit, t } from "../../../utilities/Utilities";

export default function CurrentWeatherDetails() {
  const { weather, searchStatus, units, language } = UseWeatherContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
      <DetailedInfoCard
        label={t(language, "feels_like")}
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(
                units.temperature === "celsius"
                  ? weather.current.temperature_2m
                  : getImperialUnit(
                      "fahrenheit",
                      weather.current.temperature_2m
                    )
              )}°`
            : ""
        }
      />
      <DetailedInfoCard
        label={t(language, "humidity")}
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(weather.current.relative_humidity_2m)}%`
            : ""
        }
      />
      <DetailedInfoCard
        label={t(language, "wind")}
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(
                units.wind === "kmh"
                  ? weather.current.wind_speed_10m
                  : getImperialUnit("mph", weather.current.wind_speed_10m)
              )} ${units.wind}`
            : ""
        }
      />
      <DetailedInfoCard
        label={t(language, "precipitation")}
        value={
          searchStatus === "loading"
            ? "-"
            : weather
            ? `${Math.round(
                units.precipitation === "mm"
                  ? weather.current.precipitation
                  : getImperialUnit("inch", weather.current.precipitation)
              )} ${units.precipitation}`
            : ""
        }
      />
    </div>
  );
}
