import MainInfoCard from "./current/MainInfoCard";
import CurrentWeatherDetails from "./current/CurrentWeatherDetails";
import DailyForecast from "./daily/DailyForecast";
import HourlyForecast from "./hourly/HourlyForecast";
import { UseWeatherContext } from "../../context/WeatherAppContext";

export default function Dashboard() {
  const { searchStatus } = UseWeatherContext();

  if (searchStatus === "error" || searchStatus === "idle") return;

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-8 mb-10">
      <div className="flex flex-col gap-5 flex-1">
        <MainInfoCard />
        <CurrentWeatherDetails />
        <DailyForecast />
      </div>
      <HourlyForecast />
    </div>
  );
}
