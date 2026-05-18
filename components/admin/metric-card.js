export function MetricCard({ label, value, detail }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm leading-7 text-slate-300">{detail}</p>
    </article>
  );
}
