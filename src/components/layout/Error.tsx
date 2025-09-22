import iconError from "../../assets/images/icon-error.svg";
import { UseWeatherContext } from "../../context/WeatherAppContext";
import { t } from "../../utilities/Utilities";

export default function Error() {
  const { tryAgain, language } = UseWeatherContext();

  return (
    <div className="mx-auto w-fit flex flex-col items-center text-white mt-20 md:mt-25">
      <img src={iconError} alt="Icon error" className="w-10" />
      <h1 className="text-3xl md:text-5xl font-bold mt-7 text-center">
        {t(language, "something_went_wrong")}
      </h1>
      <p className="mt-7 md:text-lg text-neutral-300 max-w-[500px] text-center">
        {t(language, "api_error")}
      </p>
      <button
        className="flex gap-1 items-center mt-5 bg-ui-main py-1.5 px-3 rounded-md hover:cursor-pointer hover:bg-ui-main-hover transition-colors"
        onClick={tryAgain}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
        </svg>
        {t(language, "retry")}
      </button>
    </div>
  );
}
