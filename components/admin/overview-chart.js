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

function buildChartData(summary) {
  return {
    labels: ["Pending payment", "Paid", "Fulfilled", "Categories", "Products"],
    datasets: [
      {
        label: "Orders and catalog volume",
        data: [summary.pendingOrders, summary.paidOrders, summary.fulfilledOrders, summary.categoryCount, summary.productCount],
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.14)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        label: "Orders requiring follow-up",
        data: [summary.pendingOrders, summary.paidOrders, 0, 0, 0],
        borderColor: "#818cf8",
        backgroundColor: "rgba(129, 140, 248, 0.10)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };
}

function buildChartOptions(summary) {
  const maxValue = Math.max(summary.pendingOrders, summary.paidOrders, summary.fulfilledOrders, summary.categoryCount, summary.productCount, 1);

  return {
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
        suggestedMax: Math.max(5, maxValue + 1),
        ticks: {
          color: "#94a3b8",
          precision: 0,
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
}

function formatSummaryValue(value) {
  return Number(value ?? 0);
}

export function AdminOverviewChart({ pendingOrders = 0, paidOrders = 0, fulfilledOrders = 0, categoryCount = 0, productCount = 0 }) {
  const summary = {
    pendingOrders: formatSummaryValue(pendingOrders),
    paidOrders: formatSummaryValue(paidOrders),
    fulfilledOrders: formatSummaryValue(fulfilledOrders),
    categoryCount: formatSummaryValue(categoryCount),
    productCount: formatSummaryValue(productCount),
  };

  return (
    <section className="rounded-4xl border border-white/12 bg-white/8 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200 sm:text-xs sm:tracking-[0.24em]">Dashboard status</p>
          <h2 className="mt-2.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">Storefront readiness overview</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-dark-muted">
          Compare live order movement with current catalog visibility from one premium dashboard surface.
        </p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-[1.35rem] border border-white/12 bg-[#0d1b30] p-3.5 text-sm text-dark-muted sm:p-4">
          <p className="font-semibold text-white">Pending payment</p>
          <p className="mt-1.5 text-xl font-semibold text-sky-200 sm:text-2xl">{summary.pendingOrders}</p>
        </div>
        <div className="rounded-[1.35rem] border border-white/12 bg-[#0d1b30] p-3.5 text-sm text-dark-muted sm:p-4">
          <p className="font-semibold text-white">Paid orders</p>
          <p className="mt-1.5 text-xl font-semibold text-sky-200 sm:text-2xl">{summary.paidOrders}</p>
        </div>
        <div className="rounded-[1.35rem] border border-white/12 bg-[#0d1b30] p-3.5 text-sm text-dark-muted sm:p-4">
          <p className="font-semibold text-white">Fulfilled orders</p>
          <p className="mt-1.5 text-xl font-semibold text-sky-200 sm:text-2xl">{summary.fulfilledOrders}</p>
        </div>
        <div className="rounded-[1.35rem] border border-white/12 bg-[#0d1b30] p-3.5 text-sm text-dark-muted sm:p-4">
          <p className="font-semibold text-white">Live categories</p>
          <p className="mt-1.5 text-xl font-semibold text-sky-200 sm:text-2xl">{summary.categoryCount}</p>
        </div>
        <div className="rounded-[1.35rem] border border-white/12 bg-[#0d1b30] p-3.5 text-sm text-dark-muted sm:p-4">
          <p className="font-semibold text-white">Visible products</p>
          <p className="mt-1.5 text-xl font-semibold text-sky-200 sm:text-2xl">{summary.productCount}</p>
        </div>
      </div>
      <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-[#0d1b30] p-3.5 sm:p-4">
        <div className="h-[260px] w-full sm:h-[320px]">
          <Line data={buildChartData(summary)} options={buildChartOptions(summary)} />
        </div>
      </div>
    </section>
  );
}
