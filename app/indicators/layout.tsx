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
      <header className="border-b border-slate/20 px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="font-display text-xl text-ink">ESG S TRACE</h1>
        <div className="flex items-center gap-4">
          <ProgressSummary total={indicators.length} completed={completed} reportingPeriod={reportingPeriod} />
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- 파일 다운로드용 라우트 핸들러라 Link 대상이 아님 */}
          <a
            href="/indicators/export"
            className="bg-shilla-gold text-paper px-3 py-1.5 text-sm font-medium whitespace-nowrap"
          >
            CSV 다운로드
          </a>
        </div>
      </header>
      <div className="border-b border-slate/20 bg-slate/5 px-6 py-2 text-sm text-slate text-center space-y-0.5">
        <p>예시 데이터로 만든 데모입니다. 왼쪽에서 지표를 하나 골라 담당자를 5초 안에 찾아보세요 →</p>
        <p>&quot;정보가 바뀌었어요&quot;를 클릭하여 담당자를 변경해 보세요.</p>
      </div>
      <div className="flex flex-1 min-h-0">
        <nav className="w-80 shrink-0 border-r border-slate/20 overflow-y-auto p-4 space-y-5">
          <IndicatorNav indicators={indicators} statusByIndicator={statusByIndicator} />
        </nav>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
