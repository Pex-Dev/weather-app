import iconSunny from "../../assets/images/icon-sunny.webp";

export default function MainInfoCard() {
  return (
    <div className="py-12 md:px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-9 bg-[url('/images/bg-today-small.svg')] md:bg-[url('/images/bg-today-large.svg')]  bg-no-repeat bg-cover  rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-2">
        <h2 className="text-white text-center text-2xl font-semibold">
          Berlin, Germany
        </h2>
        <p className="text-neutral-200 text-center md:text-left">
          Tuesday, Aug 5, 2025
        </p>
      </div>
      <div className="flex items-center gap-2 mx-auto md:mx-0">
        <img src={iconSunny} alt="Icon sunny" className="max-w-32" />
        <p className="text-8xl font-bold text-white italic">
          68<span className="not-italic"> °</span>
        </p>
      </div>
    </div>
  );
}
