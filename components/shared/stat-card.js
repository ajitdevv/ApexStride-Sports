export function StatCard({ label, value, detail }) {
  return (
    <article className="rounded-[1.75rem] border border-white/70 bg-white/92 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{value}</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{detail}</p>
    </article>
  );
}
