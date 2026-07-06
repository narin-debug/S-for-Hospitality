import { getIndicators, getRequestsForPeriod, currentReportingPeriod, isRequestComplete } from "@/lib/data";
import { IndicatorNav } from "@/components/IndicatorNav";
import { ProgressSummary } from "@/components/ProgressSummary";

export default async function IndicatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reportingPeriod = currentReportingPeriod();
  const [indicators, requests] = await Promise.all([
    getIndicators(),
    getRequestsForPeriod(reportingPeriod),
  ]);
  const statusByIndicator = Object.fromEntries(requests.map((r) => [r.indicator_id, r.status]));
  const completed = requests.filter((r) => isRequestComplete(r.status)).length;

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-slate/20 px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl text-ink">ESG S지표 확인 도구</h1>
        <ProgressSummary total={indicators.length} completed={completed} reportingPeriod={reportingPeriod} />
      </header>
      <div className="flex flex-1 min-h-0">
        <nav className="w-80 shrink-0 border-r border-slate/20 overflow-y-auto p-4 space-y-2">
          <IndicatorNav indicators={indicators} statusByIndicator={statusByIndicator} />
        </nav>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
