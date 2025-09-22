import logo from "../../assets/images/logo.svg";
import LanguageSelector from "../UI/language/LanguageSelector";
import UnitsSelector from "../UI/units/UnitsSelector";

export default function Header() {
  return (
    <header className="flex justify-between">
      <img
        src={logo}
        alt="Weather now"
        className="max-w-[150px] md:max-w-max "
      />
      <div className="flex flex-wrap justify-end gap-1 md:gap-4">
        <LanguageSelector />
        <UnitsSelector />
      </div>
    </header>
  );
}
