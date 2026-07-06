export function ProgressSummary({
  total,
  completed,
  reportingPeriod,
}: {
  total: number;
  completed: number;
  reportingPeriod: string;
}) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate font-mono">{reportingPeriod} 보고 주기</span>
      <div className="h-1.5 w-32 rounded-full bg-slate/15 overflow-hidden">
        <div
          className="h-full bg-confirmed-green transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-ink">
        {total}개 지표 중 <span className="font-medium">{completed}개</span> 검증완료
      </span>
    </div>
  );
}
