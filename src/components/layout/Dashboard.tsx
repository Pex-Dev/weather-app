import MainInfoCard from "../UI/MainInfoCard";
import DetailedInfoCard from "../UI/DetailedInfoCard";
import DailyForecastCard from "../UI/DailyForecastCard";
import HourlyForecastCard from "../UI/HourlyForecastCard";
import DaySelector from "../UI/DaySelector";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-15 mb-15">
      <div className="flex flex-col gap-5">
        <MainInfoCard />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
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
      <div className="w-full lg:max-w-[345px] bg-ui-main rounded-2xl lg:rounded-3xl py-4 pl-4 mt-4 md:mt-0 max-h-[602px] overflow-hidden">
        <header className="flex justify-between items-center mr-4">
          <h3 className="text-white text-xl font-light">Hourly Forecast</h3>
          <DaySelector />
        </header>
        <ul className="my-3 flex flex-col gap-3  overflow-y-auto max-h-[520px] mr-4">
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
          <HourlyForecastCard icon="sunny" />
        </ul>
      </div>
    </div>
  );
}
