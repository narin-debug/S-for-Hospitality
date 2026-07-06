export type RequestStatus = "not_started" | "requested" | "received" | "verified";

export const REQUEST_STATUS_LABEL: Record<RequestStatus, string> = {
  not_started: "미시작",
  requested: "요청함",
  received: "수령함",
  verified: "검증완료",
};

export const REQUEST_STATUS_ORDER: RequestStatus[] = [
  "not_started",
  "requested",
  "received",
  "verified",
];

export type Indicator = {
  id: string;
  name: string;
  code: string | null;
  category: string | null;
  definition: string | null;
  calculation_formula: string | null;
  department: string | null;
  contact_name: string | null;
  contact_info: string | null;
  evidence_criteria: string | null;
  last_confirmed_at: string | null;
  last_confirmed_by: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type IndicatorRequest = {
  id: string;
  indicator_id: string;
  reporting_period: string;
  status: RequestStatus;
  received_by: string | null;
  memo: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};
