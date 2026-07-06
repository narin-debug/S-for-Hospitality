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
      <div>
        <p className="text-xs text-slate">{indicator.category ?? "지표"}</p>
        <h2 className="font-display text-2xl text-ink mt-1">{indicator.name}</h2>
        {indicator.definition && (
          <p className="mt-2 text-sm text-slate">{indicator.definition}</p>
        )}
      </div>

      <section>
        <h3 className="text-sm font-medium text-ink mb-3">담당자·증빙 기준</h3>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-slate">담당 부서</dt>
            <dd className="text-ink">{indicator.department ?? "미확인"}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate">담당자명</dt>
            <dd className="text-ink">{indicator.contact_name ?? "미확인"}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate">연락처</dt>
            <dd className="text-ink">{indicator.contact_info ?? "미확인"}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate">최종 확인일</dt>
            <dd className="text-ink font-mono">
              {formatDate(indicator.last_confirmed_at)}
              {indicator.last_confirmed_by && (
                <span className="text-slate"> · {indicator.last_confirmed_by}</span>
              )}
            </dd>
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

      <section>
        <h3 className="text-sm font-medium text-ink mb-3">
          {reportingPeriod}년 보고 주기 요청 체크
        </h3>
        <ChecklistForm indicatorId={indicator.id} reportingPeriod={reportingPeriod} request={request} />
      </section>
    </div>
  );
}
