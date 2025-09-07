import MainInfoCard from "../UI/MainInfoCard";
import DetailedInfoCard from "../UI/DetailedInfoCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <MainInfoCard />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DetailedInfoCard label="Feels Like" value="64°" />
        <DetailedInfoCard label="Humidity" value="46%°" />
        <DetailedInfoCard label="Wind" value="9 mph" />
        <DetailedInfoCard label="Precipitation" value="0" />
      </div>
    </div>
  );
}
