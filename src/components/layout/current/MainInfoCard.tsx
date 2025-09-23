import { getCorrectIcon } from "../../../utilities/Utilities";
import { UseWeatherContext } from "../../../context/WeatherAppContext";
import { t } from "../../../utilities/Utilities";

export default function MainInfoCard() {
  const { weather, searchStatus, language } = UseWeatherContext();

  const dateFormater = (rawDate: string): string => {
    const date = new Date(rawDate);
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (searchStatus === "success" && weather) {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-9 rounded-3xl overflow-hidden py-12 md:px-5 bg-[url('/images/bg-today-small.svg')] md:bg-[url('/images/bg-today-large.svg')]  bg-no-repeat bg-cover">
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-center md:text-left text-2xl font-semibold">
            {`${weather.name}, ${weather.country}`}
          </h2>
          <p className="text-neutral-200 text-center md:text-left">
            {dateFormater(weather.current.time)}
          </p>
        </div>
        <div className="flex items-center gap-2 mx-auto md:mx-0 min-w-[280px] md:min-w-[320px] ">
          <img
            src={getCorrectIcon(
              weather.current.weather_code,
              new Date(weather.current.time).getHours()
            )}
            alt="Icon sunny"
            className="max-w-30 md:max-w-32 shrink-0"
          />
          <p className="text-7xl md:text-8xl font-bold text-white italic ">
            {Math.round(weather.current.temperature_2m)}
            <span className="not-italic"> °</span>
          </p>
        </div>
      </div>
    );
  }

  if (searchStatus === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-9 rounded-3xl overflow-hidden  bg-ui-main h-[316px] md:h-[224px]">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="animation-jump-container flex gap-2 w-fit">
            <span className="animation-jump block w-2 h-2 bg-white rounded-full"></span>
            <span className="animation-jump block w-2 h-2 bg-white rounded-full"></span>
            <span className="animation-jump block w-2 h-2 bg-white rounded-full"></span>
          </div>
          <p className="text-neutral-300">{t(language, "loading")}</p>
        </div>
      </div>
    );
  }

  return null;
}
