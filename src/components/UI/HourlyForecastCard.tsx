import iconSunny from "../../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../../assets/images/icon-partly-cloudy.webp";
import iconCloudy from "../../assets/images/icon-overcast.webp";
import iconDrizzle from "../../assets/images/icon-drizzle.webp";
import iconRainy from "../../assets/images/icon-rain.webp";
import iconSnowy from "../../assets/images/icon-snow.webp";
import iconStormy from "../../assets/images/icon-storm.webp";
import iconFoggy from "../../assets/images/icon-fog.webp";

type Weather =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "drizzle"
  | "rainy"
  | "snowy"
  | "stormy"
  | "foggy";

export default function HourlyForecastCard({
  icon = "sunny",
}: {
  icon: Weather;
}) {
  const weatherIcon = {
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
    <li className="w-full pr-3 rounded-lg bg-ui-main-hover border border-ui-main-border flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={weatherIcon[icon]} alt={icon} className="max-w-13 " />
        <p className="text-white uppercase text-xl">3 pm</p>
      </div>
      <p className="text-neutral-200 font-light">68°</p>
    </li>
  );
}
