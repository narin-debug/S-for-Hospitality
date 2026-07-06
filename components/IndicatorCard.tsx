import Link from "next/link";
import type { RequestStatus } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";

export function IndicatorCard({
  id,
  name,
  department,
  status,
  active,
}: {
  id: string;
  name: string;
  department: string | null;
  status: RequestStatus;
  active: boolean;
}) {
  return (
    <Link
      href={`/indicators/${id}`}
      className={`group relative block border px-4 py-3 transition-colors ${
        active
          ? "border-shilla-gold bg-shilla-gold/10"
          : "border-slate/20 hover:border-shilla-gold/60 hover:bg-shilla-gold/5"
      }`}
      style={{
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
      }}
    >
      <span
        aria-hidden
        className={`absolute right-0 top-0 h-[14px] w-[14px] ${
          active ? "bg-shilla-gold" : "bg-slate/30 group-hover:bg-shilla-gold/60"
        }`}
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
      />
      <p className="font-medium text-ink pr-2">{name}</p>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <span className="text-xs text-slate">{department ?? "담당 부서 미확인"}</span>
        <StatusBadge status={status} />
      </div>
    </Link>
  );
}
