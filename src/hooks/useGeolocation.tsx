import { useEffect, useState } from "react";
import axios from "axios";
import type { ReverseGeocoding } from "../types/Types";
import { UseWeatherContext } from "../context/WeatherAppContext";

export default function useGeolocation() {
  const [geolocationnStatus, setGeolocationnStatus] = useState<
    "idle" | "searching" | "denied" | "not supported" | "error"
  >("idle");
  const { getWeather, language, searchStatus, setSearchStatus } =
    UseWeatherContext();

  const isGeolocationSupported: boolean = "geolocation" in navigator;

  useEffect(() => {
    if (!isGeolocationSupported) setGeolocationnStatus("not supported");
  }, [isGeolocationSupported]);

  //Check if the user has already granted permission for geolocation
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(currentPosition);
      }
    });
  }, []);

  const currentPosition = async (position: GeolocationPosition) => {
    if (searchStatus === "loading") return;
    setSearchStatus("loading");
    setGeolocationnStatus("searching");
    try {
      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${language}`
      );

      const location: ReverseGeocoding = response.data;
      getWeather(
        location.address.city,
        location.address.country,
        latitude,
        longitude
      );
    } catch (error) {
      console.error(error);
      setGeolocationnStatus("error");
    }
  };

  const getCurrentLocation = () => {
    if (isGeolocationSupported) {
      //Ask for geolocation
      navigator.geolocation.getCurrentPosition(currentPosition, () =>
        setGeolocationnStatus("denied")
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setGeolocationnStatus("not supported");
    }
  };
  return { geolocationnStatus, getCurrentLocation };
}
