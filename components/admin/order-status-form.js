"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const statusOptions = [
  { value: "pending_payment", label: "Pending payment" },
  { value: "paid", label: "Paid" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

export function OrderStatusForm({ orderId, currentStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: formData.get("status"),
        }),
      });

      if (!response.ok) {
        return;
      }

      router.refresh();
    });
  }

  return (
    <form className="flex flex-col gap-2 rounded-[1.75rem] border border-white/10 bg-[#0d1b30] p-3 sm:flex-row sm:items-center" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={`status-${orderId}`}>
        Update order status
      </label>
      <select
        id={`status-${orderId}`}
        name="status"
        defaultValue={currentStatus}
        className="h-11 min-w-[200px] rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white outline-none transition focus:border-sky-300"
        disabled={isPending}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition",
          isPending ? "bg-slate-500 text-white/80" : "bg-sky-400 text-slate-950 hover:bg-sky-300"
        )}
      >
        {isPending ? "Saving..." : "Update status"}
      </button>
    </form>
  );
}
