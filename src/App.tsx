import "./App.css";
import Header from "./components/layout/Header";
import Title from "./components/layout/Title";
import SearchBar from "./components/UI/SearchBar";
import Dashboard from "./components/layout/Dashboard";

function App() {
  return (
    <div className="p-4 max-w-[1220px] mx-auto md:mt-8">
      <Header />
      <Title />
      <SearchBar />
      <Dashboard />
    </div>
  );
}

export default App;
