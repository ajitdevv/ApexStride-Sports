"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const labels = ["Foundation", "Storefront", "Commerce", "Operations", "Launch"];

const data = {
  labels,
  datasets: [
    {
      label: "Platform readiness",
      data: [22, 48, 71, 88, 100],
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56, 189, 248, 0.14)",
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 5,
    },
    {
      label: "Operations maturity",
      data: [12, 22, 49, 82, 100],
      borderColor: "#818cf8",
      backgroundColor: "rgba(129, 140, 248, 0.10)",
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#cbd5e1",
      },
    },
    tooltip: {
      backgroundColor: "#081120",
      titleColor: "#f8fafc",
      bodyColor: "#cbd5e1",
      borderColor: "rgba(255,255,255,0.12)",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#94a3b8",
      },
      grid: {
        color: "rgba(148, 163, 184, 0.12)",
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: "#94a3b8",
      },
      grid: {
        color: "rgba(148, 163, 184, 0.12)",
      },
      border: {
        display: false,
      },
    },
  },
};

export function AdminOverviewChart() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Analytics foundation</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Milestone delivery trajectory</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-300">
          This placeholder chart validates the analytics stack and the reusable dashboard module pattern before real operational reporting is connected.
        </p>
      </div>
      <div className="mt-8 h-[320px] w-full">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
