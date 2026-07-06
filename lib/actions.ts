"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { REQUEST_STATUS_ORDER, type RequestStatus } from "@/lib/types";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function updateIndicatorInfo(
  indicatorId: string,
  formData: FormData
): Promise<ActionResult> {
  const department = String(formData.get("department") ?? "").trim();
  const contactName = String(formData.get("contact_name") ?? "").trim();
  const contactInfo = String(formData.get("contact_info") ?? "").trim();
  const evidenceCriteria = String(formData.get("evidence_criteria") ?? "").trim();
  const confirmedBy = String(formData.get("confirmed_by") ?? "").trim();

  if (!confirmedBy) {
    return { ok: false, error: "확인자 이름을 입력해주세요." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("indicators")
    .update({
      department,
      contact_name: contactName,
      contact_info: contactInfo,
      evidence_criteria: evidenceCriteria,
      last_confirmed_at: new Date().toISOString(),
      last_confirmed_by: confirmedBy,
      updated_at: new Date().toISOString(),
    })
    .eq("id", indicatorId);

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/indicators/${indicatorId}`);
  revalidatePath("/indicators");
  return { ok: true };
}

export async function upsertRequestStatus(
  indicatorId: string,
  reportingPeriod: string,
  formData: FormData
): Promise<ActionResult> {
  const status = String(formData.get("status") ?? "not_started") as RequestStatus;
  const memo = String(formData.get("memo") ?? "").trim();
  const receivedBy = String(formData.get("received_by") ?? "").trim();

  if (!REQUEST_STATUS_ORDER.includes(status)) {
    return { ok: false, error: "잘못된 상태 값입니다." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("requests").upsert(
    {
      indicator_id: indicatorId,
      reporting_period: reportingPeriod,
      status,
      memo,
      received_by: receivedBy || null,
      completed_at: status === "verified" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "indicator_id,reporting_period" }
  );

  if (error) return { ok: false, error: error.message };

  revalidatePath(`/indicators/${indicatorId}`);
  revalidatePath("/indicators");
  return { ok: true };
}
