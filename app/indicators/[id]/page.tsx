import { notFound } from "next/navigation";
import { getIndicator, getRequest, currentReportingPeriod } from "@/lib/data";
import { UpdateInfoForm } from "@/components/UpdateInfoForm";
import { ChecklistForm } from "@/components/ChecklistForm";

function formatDate(iso: string | null): string {
  if (!iso) return "미확인";
  return new Date(iso).toISOString().slice(0, 10);
}

export default async function IndicatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reportingPeriod = currentReportingPeriod();
  const [indicator, request] = await Promise.all([
    getIndicator(id),
    getRequest(id, reportingPeriod),
  ]);

  if (!indicator) notFound();

  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="font-display text-2xl text-ink">{indicator.name}</h2>

      <section
        className="border-l-4 border-shilla-gold bg-shilla-gold/5 pl-4 py-3"
        aria-label="담당자 요약"
      >
        <p className="font-display text-xl text-ink">
          이 지표 담당자: {indicator.department ?? "부서 미확인"}
          {" / "}
          {indicator.contact_name ?? "담당자 미확인"}
        </p>
        <p className="mt-1 text-sm text-slate font-mono">
          최종 확인일: {formatDate(indicator.last_confirmed_at)}
          {indicator.last_confirmed_by && ` · ${indicator.last_confirmed_by} 확인`}
        </p>
      </section>

      <section>
        <h3 className="font-display text-lg text-ink mb-3">증빙 기준</h3>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-slate">연락처</dt>
            <dd className="text-ink">{indicator.contact_info ?? "미확인"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-slate">증빙 기준</dt>
            <dd className="text-ink whitespace-pre-wrap">
              {indicator.evidence_criteria ?? "미확인"}
            </dd>
          </div>
        </dl>

        <div className="mt-3">
          <UpdateInfoForm indicator={indicator} />
        </div>
      </section>

      <details className="group border-t border-slate/20 pt-4">
        <summary className="text-xs text-slate cursor-pointer select-none hover:text-ink">
          {reportingPeriod}년 보고 주기 요청 체크 (보조 기능)
        </summary>
        <div className="mt-3">
          <ChecklistForm indicatorId={indicator.id} reportingPeriod={reportingPeriod} request={request} />
        </div>
      </details>

      <details className="group border-t border-slate/20 pt-4">
        <summary className="text-xs text-slate cursor-pointer select-none hover:text-ink">
          📌 K-ESG 기준 보기
        </summary>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-slate">진단 항목 코드</dt>
            <dd className="text-ink font-mono">{indicator.code ?? "미확인"}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate">카테고리</dt>
            <dd className="text-ink">{indicator.category ?? "미확인"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-slate">공식 정의</dt>
            <dd className="text-ink whitespace-pre-wrap">{indicator.definition ?? "미확인"}</dd>
          </div>
        </dl>
      </details>
    </div>
  );
}
