export default function DetailedInfoCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-ui-main border border-cyan-600 shadow-md dark:shadow-2xl dark:border-ui-main-border rounded-xl p-4 w-full">
      <h3 className="text-neutral-500 dark:text-white/80">{label}</h3>
      <p className="text-neutral-700 dark:text-white text-3xl">{value}</p>
    </div>
  );
}
