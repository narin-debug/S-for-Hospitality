"use client";

import { useActionState, useState } from "react";
import { updateIndicatorInfo, type ActionResult } from "@/lib/actions";
import type { Indicator } from "@/lib/types";

const initialState: ActionResult = { ok: true };

export function UpdateInfoForm({ indicator }: { indicator: Indicator }) {
  const [editing, setEditing] = useState(false);
  const action = updateIndicatorInfo.bind(null, indicator.id);
  const [state, formAction, pending] = useActionState(async (_prev: ActionResult, formData: FormData) => {
    const result = await action(formData);
    if (result.ok) setEditing(false);
    return result;
  }, initialState);

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-sm font-medium text-shilla-gold hover:underline underline-offset-2"
      >
        정보가 바뀌었어요
      </button>
    );
  }

  return (
    <form action={formAction} className="mt-4 space-y-3 border border-slate/20 p-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="담당 부서" name="department" defaultValue={indicator.department} />
        <Field label="담당자명" name="contact_name" defaultValue={indicator.contact_name} />
      </div>
      <Field label="연락처 (이메일/전화)" name="contact_info" defaultValue={indicator.contact_info} />
      <div>
        <label className="block text-xs text-slate mb-1" htmlFor="evidence_criteria">
          증빙 기준
        </label>
        <textarea
          id="evidence_criteria"
          name="evidence_criteria"
          defaultValue={indicator.evidence_criteria ?? ""}
          rows={3}
          className="w-full border border-slate/30 bg-paper px-3 py-2 text-sm text-ink focus-visible:border-shilla-gold"
        />
      </div>
      <Field label="확인자 (본인 이름)" name="confirmed_by" required />

      {!state.ok && <p className="text-sm text-pending-amber">{state.error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="bg-shilla-gold text-paper px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {pending ? "저장 중" : "저장"}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-sm text-slate hover:text-ink"
        >
          취소
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-slate mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="w-full border border-slate/30 bg-paper px-3 py-2 text-sm text-ink focus-visible:border-shilla-gold"
      />
    </div>
  );
}
