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

  // 지표는 이미 sort_order로 카테고리별로 뭉쳐서 정렬되어 있으므로,
  // 연속된 동일 category를 묶어 그룹 헤더를 붙인다 (접고 펼치기는 없음, 항상 펼쳐둠).
  const groups: { category: string; items: Indicator[] }[] = [];
  for (const indicator of indicators) {
    const category = indicator.category ?? "기타";
    const last = groups[groups.length - 1];
    if (last?.category === category) {
      last.items.push(indicator);
    } else {
      groups.push({ category, items: [indicator] });
    }
  }

  return (
    <>
      {groups.map((group) => (
        <div key={group.category}>
          <p className="px-1 mb-2 text-xs font-medium text-slate uppercase tracking-wide">
            {group.category}
          </p>
          <div className="space-y-2">
            {group.items.map((indicator) => (
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
          </div>
        </div>
      ))}
    </>
  );
}
