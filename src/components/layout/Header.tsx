import logo from "../../assets/images/logo.svg";
import UnitsSelector from "../UI/UnitsSelector";

export default function Header() {
  return (
    <header className="flex justify-between">
      <img
        src={logo}
        alt="Weather now"
        className="max-w-[150px] md:max-w-max "
      />
      <UnitsSelector />
    </header>
  );
}
