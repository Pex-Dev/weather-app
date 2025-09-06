import { useState } from "react";
import searchIcon from "../../assets/images/icon-search.svg";
export default function SearchBar() {
  const [inputText, setInputText] = useState<string>("");

  let inputClassName = `bg-ui-main hover:bg-ui-main-hover border-2 border-transparent focus-visible:border-background focus-visible:outline-2 focus-visible:outline-white focus-visible:border-2 transition-colors hover:cursor-pointer w-full rounded-lg text-white text-lg py-3.5`;
  inputClassName += inputText.length > 0 ? " p-3" : " pl-15";

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full max-w-[670px] mx-auto mt-15">
      <div className="relative w-full">
        <input
          type="search"
          name="search"
          placeholder="Search for a place..."
          value={inputText}
          onChange={(e) => HandleInputChange(e)}
          className={inputClassName}
        />
        {inputText.length < 1 && (
          <img
            src={searchIcon}
            alt="Search icon"
            className="absolute left-5 top-1/3"
          />
        )}
      </div>
      <button className="bg-blue-700 hover:bg-blue-800 border-2 border-transparent focus-visible:border-background focus-visible:outline-2 focus-visible:outline-blue-700 transition-colors hover:cursor-pointer text-white text-lg rounded-lg py-3.5 px-6">
        Search
      </button>
    </div>
  );
}
