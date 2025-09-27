import "./App.css";
import Header from "./components/layout/Header";
import Title from "./components/layout/Title";
import SearchBar from "./components/UI/SearchBar";
import Dashboard from "./components/layout/Dashboard";
import Error from "./components/layout/Error";
import CompareLocations from "./components/layout/compare/CompareLocations";
import { UseWeatherContext } from "./context/WeatherAppContext";
import { t } from "./utilities/Utilities";

function App() {
  const { searchStatus, locationsToCompare, language } = UseWeatherContext();

  return (
    <div className="p-4 max-w-[1220px] mx-auto">
      <Header />
      {searchStatus === "error" ? (
        <Error />
      ) : (
        <>
          {locationsToCompare !== null ? (
            <CompareLocations />
          ) : (
            <>
              <Title />
              <SearchBar showNoResultsScreen={true} favoriteButton={true} />
              {searchStatus === "no-results" ? (
                <h2 className="text-white text-4xl text-center mt-10">
                  {t(language, "no_results")}
                </h2>
              ) : (
                <Dashboard />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
