import { UseWeatherContext } from "../../context/WeatherAppContext";
import { t } from "../../utilities/Utilities";
export default function ButtonTheme() {
  const { toggleTheme, theme, language } = UseWeatherContext();

  const textLabel = `${t(language, "change_to")}${
    theme === "dark" ? t(language, "light_theme") : t(language, "dark_theme")
  }`;

  return (
    <button
      type="button"
      aria-label={textLabel}
      title={textLabel}
      onClick={() => toggleTheme()}
      className={`bg-white shadow-md dark:bg-ui-main px-1 md:px-2 rounded-md ${
        theme === "dark" ? "text-white" : "text-cyan-900"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      </svg>
    </button>
  );
}
