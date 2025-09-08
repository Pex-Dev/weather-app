import MainInfoCard from "../UI/MainInfoCard";
import DetailedInfoCard from "../UI/DetailedInfoCard";
import DailyForecastCard from "../UI/DailyForecastCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 mb-15">
      <MainInfoCard />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DetailedInfoCard label="Feels Like" value="64°" />
        <DetailedInfoCard label="Humidity" value="46%°" />
        <DetailedInfoCard label="Wind" value="9 mph" />
        <DetailedInfoCard label="Precipitation" value="0" />
      </div>
      <h3 className="text-white text-xl font-light mt-3">Daily Forecast</h3>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
        <DailyForecastCard day="Tue" icon="sunny" max={20} min={14} />
        <DailyForecastCard day="Tue" icon="partlyCloudy" max={20} min={14} />
        <DailyForecastCard day="Tue" icon="stormy" max={20} min={14} />
        <DailyForecastCard day="Tue" max={20} min={14} />
        <DailyForecastCard day="Tue" icon="cloudy" max={20} min={14} />
        <DailyForecastCard day="Tue" icon="partlyCloudy" max={20} min={14} />
        <DailyForecastCard day="Tue" icon="rainy" max={20} min={14} />
      </div>
    </div>
  );
}
