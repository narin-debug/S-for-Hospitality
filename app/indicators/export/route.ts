import { getIndicators, getRequestsForPeriod, currentReportingPeriod } from "@/lib/data";
import { REQUEST_STATUS_LABEL, type RequestStatus } from "@/lib/types";

function csvEscape(value: string | number | null | undefined): string {
  const s = value == null ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 10);
}

export async function GET() {
  const reportingPeriod = currentReportingPeriod();
  const [indicators, requests] = await Promise.all([
    getIndicators(),
    getRequestsForPeriod(reportingPeriod),
  ]);
  const requestByIndicator = new Map(requests.map((r) => [r.indicator_id, r]));

  const header = [
    "지표명",
    "담당 부서",
    "담당자명",
    "연락처",
    "증빙 기준",
    "최종 확인일",
    "최종 확인자",
    "보고 주기",
    "상태",
    "수령자",
    "메모",
  ];

  const rows = indicators.map((indicator) => {
    const request = requestByIndicator.get(indicator.id);
    const status: RequestStatus = request?.status ?? "not_started";
    return [
      indicator.name,
      indicator.department,
      indicator.contact_name,
      indicator.contact_info,
      indicator.evidence_criteria,
      formatDate(indicator.last_confirmed_at),
      indicator.last_confirmed_by,
      reportingPeriod,
      REQUEST_STATUS_LABEL[status],
      request?.received_by,
      request?.memo,
    ].map(csvEscape);
  });

  const csv = [header.map(csvEscape), ...rows].map((row) => row.join(",")).join("\r\n");
  const withBom = "﻿" + csv;

  return new Response(withBom, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="esg-indicators-${reportingPeriod}.csv"`,
    },
  });
}
