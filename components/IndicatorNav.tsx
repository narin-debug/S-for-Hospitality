"use client";

import { usePathname } from "next/navigation";
import { IndicatorCard } from "@/components/IndicatorCard";
import type { Indicator, RequestStatus } from "@/lib/types";

export function IndicatorNav({
  indicators,
  statusByIndicator,
}: {
  indicators: Indicator[];
  statusByIndicator: Record<string, RequestStatus>;
}) {
  const pathname = usePathname();

  if (indicators.length === 0) {
    return (
      <p className="text-sm text-slate">
        등록된 지표가 없습니다. Supabase에 schema.sql을 실행하고 시드 데이터를 확인해주세요.
      </p>
    );
  }

  return (
    <>
      {indicators.map((indicator) => (
        <IndicatorCard
          key={indicator.id}
          id={indicator.id}
          name={indicator.name}
          department={indicator.department}
          contactName={indicator.contact_name}
          status={statusByIndicator[indicator.id] ?? "not_started"}
          active={pathname === `/indicators/${indicator.id}`}
        />
      ))}
    </>
  );
}
