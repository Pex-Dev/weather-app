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
      className={`flex items-center justify-between px-2 py-1 rounded md:rounded-md text-neutral-700 dark:text-white font-extralight ${
        selected
          ? "bg-neutral-100 dark:bg-ui-main-hover"
          : "hover:bg-neutral-100 hover:dark:bg-ui-main-hover"
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
      {selected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="11"
          fill="none"
          viewBox="0 0 14 11"
        >
          <path
            fill="currentColor"
            d="M11.895 1.047c.136-.137.355-.137.464 0l.793.766c.11.136.11.355 0 .464L4.95 10.48a.315.315 0 0 1-.465 0L.82 6.844c-.11-.137-.11-.356 0-.465l.793-.793c.11-.11.328-.11.465 0l2.625 2.652 7.192-7.191Z"
          />
        </svg>
      )}
    </label>
  );
}
