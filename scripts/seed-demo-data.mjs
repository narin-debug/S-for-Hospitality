// 박람회 부스 데모용 예시 데이터 시딩 스크립트.
// 가상 회사("ljus hotel") 기준 담당자/증빙 정보로 22개 지표를 채우고,
// 이번 보고 주기 체크리스트를 아래 CHECKLIST_STATE에 지정된 "적당히 사용 중인" 상태로 되돌린다.
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
    name: "복리후생비",
    contact_name: "장은비 대리",
    contact_info: `eunbi.jang@${DOMAIN} · 내선 3121`,
    evidence_criteria: "복리후생 항목별 지출 집계표 + 1인당 환산액 산출 시트",
    last_confirmed_at: "2026-03-19T09:00:00+09:00",
    last_confirmed_by: "장은비 대리",
  },
  {
    name: "결사의 자유 보장",
    contact_name: "권도윤 과장",
    contact_info: `doyoon.kwon@${DOMAIN} · 내선 3410`,
    evidence_criteria: "노동조합 가입 현황 + 단체협약서 사본",
    last_confirmed_at: "2026-01-08T09:00:00+09:00",
    last_confirmed_by: "권도윤 과장",
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
  {
    name: "안전보건 추진체계",
    contact_name: "오지훈 과장",
    contact_info: `jihoon.oh@${DOMAIN} · 내선 5010`,
    evidence_criteria: "안전보건 경영방침 문서 + 안전보건관리책임자 선임 현황",
    last_confirmed_at: "2026-04-08T09:00:00+09:00",
    last_confirmed_by: "오지훈 과장",
  },
  {
    name: "산업재해율",
    contact_name: "오지훈 과장",
    contact_info: `jihoon.oh@${DOMAIN} · 내선 5010`,
    evidence_criteria: "안전보건 관리시스템 산업재해 발생 현황 리포트, 4개년 추세 포함",
    last_confirmed_at: "2026-04-08T09:00:00+09:00",
    last_confirmed_by: "오지훈 과장",
  },
  {
    name: "안전정책 수립",
    contact_name: "윤채린 변호사",
    contact_info: `chaerin.yoon@${DOMAIN} · 내선 6021`,
    evidence_criteria: "인권 경영방침 문서 + 이사회 승인 회의록",
    last_confirmed_at: "2026-02-27T09:00:00+09:00",
    last_confirmed_by: "윤채린 변호사",
  },
  {
    name: "인권 리스크 평가",
    contact_name: "윤채린 변호사",
    contact_info: `chaerin.yoon@${DOMAIN} · 내선 6021`,
    evidence_criteria: "인권 영향평가 결과보고서 + 개선조치 이행 트래커(xlsx)",
    last_confirmed_at: "2026-02-27T09:00:00+09:00",
    last_confirmed_by: "윤채린 변호사",
  },
  {
    name: "협력사 ESG 경영",
    contact_name: "장민서 대리",
    contact_info: `minseo.jang@${DOMAIN} · 내선 4410`,
    evidence_criteria: "협력사 ESG 자가진단 결과 취합본 + 등급별 관리 현황표",
    last_confirmed_at: "2026-05-30T09:00:00+09:00",
    last_confirmed_by: "장민서 대리",
  },
  {
    name: "협력사 ESG 지원",
    contact_name: "장민서 대리",
    contact_info: `minseo.jang@${DOMAIN} · 내선 4410`,
    evidence_criteria: "협력사 ESG 교육·컨설팅 지원 실적표 + 지원금 집행 내역",
    last_confirmed_at: "2026-05-30T09:00:00+09:00",
    last_confirmed_by: "장민서 대리",
  },
  {
    name: "협력사 ESG 협약사항",
    contact_name: "노현우 사원",
    contact_info: `hyunwoo.noh@${DOMAIN} · 내선 4412`,
    evidence_criteria: "협력사 계약서 내 ESG 준수 조항 반영 현황 체크리스트",
    last_confirmed_at: "2026-05-30T09:00:00+09:00",
    last_confirmed_by: "노현우 사원",
  },
  {
    name: "전략적 사회공헌",
    contact_name: "임하람 매니저",
    contact_info: `haram.lim@${DOMAIN} · 내선 6110`,
    evidence_criteria: "연간 사회공헌 프로그램 운영보고서 + 예산 집행 내역",
    last_confirmed_at: "2026-06-15T09:00:00+09:00",
    last_confirmed_by: "임하람 매니저",
  },
  {
    name: "구성원 봉사참여",
    contact_name: "임하람 매니저",
    contact_info: `haram.lim@${DOMAIN} · 내선 6110`,
    evidence_criteria: "임직원 봉사활동 참여 신청·실적 집계표",
    last_confirmed_at: "2026-06-15T09:00:00+09:00",
    last_confirmed_by: "임하람 매니저",
  },
  {
    name: "정보보호 시스템 구축",
    contact_name: "서도현 팀장",
    contact_info: `dohyun.seo@${DOMAIN} · 내선 7001`,
    evidence_criteria: "ISMS 인증서 사본 + 정보보호 관리체계 운영 현황 보고서",
    last_confirmed_at: "2026-01-22T09:00:00+09:00",
    last_confirmed_by: "서도현 팀장",
  },
  {
    name: "개인정보 침해 및 구제",
    contact_name: "서도현 팀장",
    contact_info: `dohyun.seo@${DOMAIN} · 내선 7001`,
    evidence_criteria: "개인정보 침해사고 대응 이력 + 피해구제 조치 결과보고서",
    last_confirmed_at: "2026-01-22T09:00:00+09:00",
    last_confirmed_by: "서도현 팀장",
  },
  {
    name: "사회 법/규제 위반",
    contact_name: "윤채린 변호사",
    contact_info: `chaerin.yoon@${DOMAIN} · 내선 6021`,
    evidence_criteria: "사회 부문 법령 위반·제재 현황 집계표 (해당 회차 무위반 시 '해당없음' 명시)",
    last_confirmed_at: "2026-02-27T09:00:00+09:00",
    last_confirmed_by: "윤채린 변호사",
  },
];

// 리셋할 때 되돌아갈 체크리스트 상태. "전부 미시작"이 아니라, 실제로 몇 개는
// 진행 중인 것처럼 보이도록 고정해둔다 (2026-07-07 실제 데모 중 캡처한 상태).
const CHECKLIST_STATE = {
  "목표 수립 및 공시": { status: "not_started" },
  "신규 채용 및 고용 유지": {
    status: "requested",
    received_by: "김순영 주임",
    memo: "7월 6일, 직전사업연도 채용 현황 리포트 요청",
  },
  "정규직 비율": { status: "not_started" },
  "자발적 이직률": { status: "not_started" },
  "1인당 교육훈련비": {
    status: "received",
    received_by: "박수현 과장",
    memo: "7월 7일, 이메일로 직전 사업연도 교육예산 집행 내역 자료 수령",
  },
  "복리후생비": { status: "not_started" },
  "결사의 자유 보장": { status: "not_started" },
  "여성 구성원 비율": { status: "not_started" },
  "여성 급여 비율": { status: "not_started" },
  "장애인 고용률": { status: "not_started" },
  "안전보건 추진체계": { status: "not_started" },
  "산업재해율": { status: "not_started" },
  "안전정책 수립": { status: "not_started" },
  "인권 리스크 평가": {
    status: "not_started",
    received_by: "윤훈선 주임",
    memo: "6월 27일, 직전 사업연도 인권 영향평가 결과보고서 요청\n6월 27일, 이메일로 수령 완료",
  },
  "협력사 ESG 경영": { status: "not_started" },
  "협력사 ESG 지원": { status: "not_started" },
  "협력사 ESG 협약사항": { status: "not_started" },
  "전략적 사회공헌": { status: "not_started" },
  "구성원 봉사참여": { status: "not_started" },
  "정보보호 시스템 구축": { status: "not_started" },
  "개인정보 침해 및 구제": { status: "not_started" },
  "사회 법/규제 위반": { status: "not_started" },
};

const REPORTING_PERIOD = String(2026);

async function main() {
  for (const row of DEMO_DATA) {
    const { name, ...fields } = row;
    const { error } = await supabase.from("indicators").update(fields).eq("name", name);
    if (error) throw new Error(`${name} 업데이트 실패: ${error.message}`);
    console.log(`업데이트 완료: ${name}`);
  }

  const { data: indicators, error: indicatorsError } = await supabase
    .from("indicators")
    .select("id,name");
  if (indicatorsError) throw new Error(`지표 조회 실패: ${indicatorsError.message}`);
  const indicatorIdByName = Object.fromEntries(indicators.map((i) => [i.name, i.id]));

  for (const [name, state] of Object.entries(CHECKLIST_STATE)) {
    const indicatorId = indicatorIdByName[name];
    if (!indicatorId) {
      console.warn(`체크리스트 초기화 건너뜀 (지표 없음): ${name}`);
      continue;
    }
    const { error } = await supabase.from("requests").upsert(
      {
        indicator_id: indicatorId,
        reporting_period: REPORTING_PERIOD,
        status: state.status,
        received_by: state.received_by ?? null,
        memo: state.memo ?? null,
        completed_at: state.status === "verified" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "indicator_id,reporting_period" }
    );
    if (error) throw new Error(`체크리스트 초기화 실패 (${name}): ${error.message}`);
  }
  console.log("이번 보고 주기 체크리스트를 지정된 데모 상태로 되돌렸습니다.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
