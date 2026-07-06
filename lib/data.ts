import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Indicator, IndicatorRequest, RequestStatus } from "@/lib/types";

export function currentReportingPeriod(): string {
  return String(new Date().getFullYear());
}

export async function getIndicators(): Promise<Indicator[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("indicators")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(`지표 목록을 불러오지 못했습니다: ${error.message}`);
  return data ?? [];
}

export async function getIndicator(id: string): Promise<Indicator | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("indicators")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`지표 정보를 불러오지 못했습니다: ${error.message}`);
  return data;
}

export async function getRequest(
  indicatorId: string,
  reportingPeriod: string
): Promise<IndicatorRequest | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("indicator_id", indicatorId)
    .eq("reporting_period", reportingPeriod)
    .maybeSingle();

  if (error) throw new Error(`요청 상태를 불러오지 못했습니다: ${error.message}`);
  return data;
}

export async function getRequestsForPeriod(
  reportingPeriod: string
): Promise<IndicatorRequest[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("reporting_period", reportingPeriod);

  if (error) throw new Error(`요청 상태를 불러오지 못했습니다: ${error.message}`);
  return data ?? [];
}

export function isRequestComplete(status: RequestStatus): boolean {
  return status === "verified";
}
