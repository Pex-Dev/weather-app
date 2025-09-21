import iconCheck from "../../../assets/images/icon-checkmark.svg";
type UnitLabel = {
  label: string;
  name: string;
  value: string;
  onClick: Function;
  selected?: boolean;
};

export default function UnitLabel({
  label,
  name,
  value,
  onClick,
  selected = false,
}: UnitLabel) {
  return (
    <label
      className={`flex justify-between px-2 py-1 rounded md:rounded-md text-white font-extralight ${
        selected ? "bg-ui-main-hover" : "hover:bg-ui-main-hover"
      }`}
    >
      {label}
      <input
        type="radio"
        name={name}
        value={value}
        onClick={() => onClick()}
        className="appearance-none"
      />
      {selected && <img src={iconCheck} alt={label} />}
    </label>
  );
}
