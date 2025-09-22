import { UseWeatherContext } from "../../context/WeatherAppContext";
import { t } from "../../utilities/Utilities";
export default function Title() {
  const { language } = UseWeatherContext();

  return (
    <h1 className="font-bricolage-grotesque text-6xl text-center text-white font-semibold mt-14">
      {t(language, "title")}
    </h1>
  );
}
