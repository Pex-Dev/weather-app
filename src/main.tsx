import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WeatherProvider from "./context/WeatherAppContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </StrictMode>
);
