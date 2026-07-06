"use client";

import { useActionState, useState } from "react";
import { upsertRequestStatus, type ActionResult } from "@/lib/actions";
import { REQUEST_STATUS_LABEL, REQUEST_STATUS_ORDER, type IndicatorRequest } from "@/lib/types";

const initialState: ActionResult = { ok: true };

export function ChecklistForm({
  indicatorId,
  reportingPeriod,
  request,
}: {
  indicatorId: string;
  reportingPeriod: string;
  request: IndicatorRequest | null;
}) {
  const [saved, setSaved] = useState(false);
  const action = upsertRequestStatus.bind(null, indicatorId, reportingPeriod);
  const [state, formAction, pending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    const result = await action(formData);
    setSaved(result.ok);
    return result;
  }, initialState);

  return (
    <form
      action={formAction}
      onChange={() => setSaved(false)}
      className="space-y-3 border border-slate/20 p-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate mb-1" htmlFor="status">
            상태
          </label>
          <select
            id="status"
            name="status"
            defaultValue={request?.status ?? "not_started"}
            className="w-full border border-slate/30 bg-paper px-3 py-2 text-sm text-ink focus-visible:border-shilla-gold"
          >
            {REQUEST_STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {REQUEST_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate mb-1" htmlFor="received_by">
            수령자
          </label>
          <input
            id="received_by"
            name="received_by"
            defaultValue={request?.received_by ?? ""}
            placeholder="누가 받았는지"
            className="w-full border border-slate/30 bg-paper px-3 py-2 text-sm text-ink focus-visible:border-shilla-gold"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-slate mb-1" htmlFor="memo">
          메모 (언제, 어떤 증빙으로 받았는지)
        </label>
        <textarea
          id="memo"
          name="memo"
          defaultValue={request?.memo ?? ""}
          rows={3}
          className="w-full border border-slate/30 bg-paper px-3 py-2 text-sm text-ink focus-visible:border-shilla-gold"
        />
      </div>

      {!state.ok && <p className="text-sm text-pending-amber">{state.error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="bg-shilla-gold text-paper px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {pending ? "저장 중" : saved ? "저장됨" : "저장"}
        </button>
      </div>
    </form>
  );
}
