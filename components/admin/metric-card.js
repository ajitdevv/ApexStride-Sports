export function MetricCard({ label, value, detail }) {
  return (
    <article className="rounded-[1.75rem] border border-white/12 bg-linear-to-br from-white/12 via-white/8 to-transparent p-5 backdrop-blur-sm surface-shadow">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{value}</p>
      <p className="mt-3 text-sm leading-7 text-dark-muted">{detail}</p>
    </article>
  );
}
