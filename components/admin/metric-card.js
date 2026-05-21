export function MetricCard({ label, value, detail }) {
  return (
    <article className="rounded-[1.45rem] border border-white/12 bg-linear-to-br from-white/12 via-white/8 to-transparent p-4 backdrop-blur-sm surface-shadow sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200 sm:text-xs sm:tracking-[0.24em]">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">{value}</p>
      <p className="mt-2.5 text-sm leading-6 text-dark-muted">{detail}</p>
    </article>
  );
}
