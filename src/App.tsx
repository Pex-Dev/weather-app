import "./App.css";
import Header from "./components/layout/Header";
import Title from "./components/layout/Title";
import SearchBar from "./components/UI/SearchBar";
import Dashboard from "./components/layout/Dashboard";
import { UseWeatherContext } from "./context/WeatherAppContext";

function App() {
  const { searchStatus } = UseWeatherContext();

  return (
    <div className="p-4 max-w-[1220px] mx-auto md:mt-8">
      <Header />
      <Title />
      <SearchBar />
      {searchStatus === "no-results" ? (
        <h2 className="text-white text-4xl text-center mt-10">
          No search result found!
        </h2>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
