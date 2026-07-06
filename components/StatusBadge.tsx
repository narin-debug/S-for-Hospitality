import { REQUEST_STATUS_LABEL, type RequestStatus } from "@/lib/types";

const STYLE: Record<RequestStatus, string> = {
  not_started: "border-slate/40 text-slate bg-transparent",
  requested: "border-pending-amber/50 text-pending-amber bg-pending-amber/10",
  received: "border-pending-amber/50 text-pending-amber bg-pending-amber/10",
  verified: "border-confirmed-green/50 text-confirmed-green bg-confirmed-green/10",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono ${STYLE[status]}`}
    >
      {REQUEST_STATUS_LABEL[status]}
    </span>
  );
}
