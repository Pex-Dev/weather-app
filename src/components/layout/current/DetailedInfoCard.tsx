export default function DetailedInfoCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col gap-4 bg-ui-main border border-ui-main-border rounded-xl p-4 w-full lg:max-w-[180px]">
      <h3 className="text-white/80">{label}</h3>
      <p className="text-white text-3xl">{value}</p>
    </div>
  );
}
