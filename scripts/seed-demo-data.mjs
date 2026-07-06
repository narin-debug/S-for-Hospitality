// 박람회 부스 데모용 예시 데이터 시딩 스크립트.
// 가상 회사("ljus hotel") 기준 담당자/증빙 정보로 8개 지표를 채우고,
// 이번 보고 주기 체크리스트를 전부 초기 상태로 되돌린다.
// 방문객이 여러 번 만져서 데이터가 지저분해졌을 때, 부스에서 재실행해 리셋하는 용도로도 쓴다.
//
// 실행: node scripts/seed-demo-data.mjs

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const text = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
  const env = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadEnvLocal();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const COMPANY = "ljus hotel"; // 가상 회사명 (데모 전용, 실존 기업 아님)
const DOMAIN = "ljushotel.example.com";

const DEMO_DATA = [
  {
    name: "목표 수립 및 공시",
    contact_name: "김도윤 팀장",
    contact_info: `dayoon.kim@${DOMAIN} · 내선 2401`,
    evidence_criteria: `${COMPANY} 연간 지속가능경영보고서 내 사회 부문 목표 챕터(PDF) + 이사회 승인 회의록`,
    last_confirmed_at: "2026-05-18T09:00:00+09:00",
    last_confirmed_by: "김도윤 팀장",
  },
  {
    name: "신규 채용 및 고용 유지",
    contact_name: "이서준 주임",
    contact_info: `seojun.lee@${DOMAIN} · 내선 3110`,
    evidence_criteria: "채용시스템(ATS) 연간 채용 현황 리포트 + 인사팀 고용 유지율 집계표(xlsx)",
    last_confirmed_at: "2026-03-04T09:00:00+09:00",
    last_confirmed_by: "이서준 주임",
  },
  {
    name: "정규직 비율",
    contact_name: "박하은 대리",
    contact_info: `haeun.park@${DOMAIN} · 내선 3112`,
    evidence_criteria: "인사관리시스템(HRIS) 고용형태별 인원 현황 스냅샷 (분기별 추출)",
    last_confirmed_at: "2026-06-02T09:00:00+09:00",
    last_confirmed_by: "박하은 대리",
  },
  {
    name: "자발적 이직률",
    contact_name: "정우진 대리",
    contact_info: `woojin.jung@${DOMAIN} · 내선 3115`,
    evidence_criteria: "퇴사 사유 코드 기준 인사팀 이직률 집계표, 4개년 추세 그래프 포함",
    last_confirmed_at: "2026-04-21T09:00:00+09:00",
    last_confirmed_by: "정우진 대리",
  },
  {
    name: "1인당 교육훈련비",
    contact_name: "한소영 과장",
    contact_info: `soyoung.han@${DOMAIN} · 내선 3320`,
    evidence_criteria: "교육팀 연간 교육예산 집행 내역 + 1인당 환산 계산 시트",
    last_confirmed_at: "2026-02-10T09:00:00+09:00",
    last_confirmed_by: "한소영 과장",
  },
  {
    name: "여성 구성원 비율",
    contact_name: "박하은 대리",
    contact_info: `haeun.park@${DOMAIN} · 내선 3112`,
    evidence_criteria: "HRIS 성별 인원 현황 + 등기/미등기임원 구분 통계",
    last_confirmed_at: "2026-06-02T09:00:00+09:00",
    last_confirmed_by: "박하은 대리",
  },
  {
    name: "여성 급여 비율",
    contact_name: "최지민 과장",
    contact_info: `jimin.choi@${DOMAIN} · 내선 4205`,
    evidence_criteria: "재무팀 급여대장 기준 성별 평균 보수 비교표 (개인정보 마스킹 처리본)",
    last_confirmed_at: "2026-01-15T09:00:00+09:00",
    last_confirmed_by: "최지민 과장",
  },
  {
    name: "장애인 고용률",
    contact_name: "이서준 주임",
    contact_info: `seojun.lee@${DOMAIN} · 내선 3110`,
    evidence_criteria: "장애인 고용현황 신고서(고용노동부 제출본 사본)",
    last_confirmed_at: "2026-03-04T09:00:00+09:00",
    last_confirmed_by: "이서준 주임",
  },
];

async function main() {
  for (const row of DEMO_DATA) {
    const { name, ...fields } = row;
    const { error } = await supabase.from("indicators").update(fields).eq("name", name);
    if (error) throw new Error(`${name} 업데이트 실패: ${error.message}`);
    console.log(`업데이트 완료: ${name}`);
  }

  const { error: resetError } = await supabase
    .from("requests")
    .update({ status: "not_started", memo: null, received_by: null, completed_at: null })
    .not("id", "is", null);
  if (resetError) throw new Error(`체크리스트 초기화 실패: ${resetError.message}`);
  console.log("이번 보고 주기 체크리스트를 전부 미시작 상태로 초기화했습니다.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
