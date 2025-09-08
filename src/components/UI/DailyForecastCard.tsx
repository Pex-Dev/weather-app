import iconSunny from "../../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../../assets/images/icon-partly-cloudy.webp";
import iconCloudy from "../../assets/images/icon-overcast.webp";
import iconDrizzle from "../../assets/images/icon-drizzle.webp";
import iconRainy from "../../assets/images/icon-rain.webp";
import iconSnowy from "../../assets/images/icon-snow.webp";
import iconStormy from "../../assets/images/icon-storm.webp";
import iconFoggy from "../../assets/images/icon-fog.webp";

export default function DailyForecastCard({
  day,
  icon = "sunny",
  max,
  min,
}: {
  day: string;
  icon?:
    | "sunny"
    | "partlyCloudy"
    | "cloudy"
    | "drizzle"
    | "rainy"
    | "snowy"
    | "stormy"
    | "foggy";
  max: number;
  min: number;
}) {
  const weathericon = {
    sunny: iconSunny,
    partlyCloudy: iconPartlyCloudy,
    cloudy: iconCloudy,
    drizzle: iconDrizzle,
    rainy: iconRainy,
    snowy: iconSnowy,
    stormy: iconStormy,
    foggy: iconFoggy,
  };

  return (
    <div className="bg-ui-main border border-ui-main-border rounded-xl p-3 text-white">
      <h4 className="text-lg text-center">{day}</h4>
      <img src={weathericon[icon]} alt="iconSunny" />
      <p className="flex justify-between w-full text-lg">
        <span>{max}°</span>
        <span>{min}°</span>
      </p>
    </div>
  );
}
