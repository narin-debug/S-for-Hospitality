-- ESG S지표 담당자·증빙 확인 도구 — 스키마 + 시드 데이터
-- CLAUDE.md 7.1절 기준. 스키마를 바꾸면 CLAUDE.md 7.1절도 함께 갱신할 것.

-- 지표 마스터 테이블
create table indicators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  definition text,
  calculation_formula text,
  department text,           -- 담당 부서
  contact_name text,         -- 담당자명
  contact_info text,         -- 연락처 (이메일/전화)
  evidence_criteria text,    -- 증빙 기준
  last_confirmed_at timestamptz,
  last_confirmed_by text,
  sort_order integer not null default 0,  -- 목록 표시 순서 (시드 데이터가 동일 시각에 insert되어 created_at으로는 순서가 안정적이지 않음)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 지표 변경 이력 (Should 항목, 이번 MVP에서는 조회 UI 없이 테이블만 준비)
create table indicator_history (
  id uuid primary key default gen_random_uuid(),
  indicator_id uuid references indicators(id) on delete cascade,
  field_changed text,
  old_value text,
  new_value text,
  changed_by text,
  changed_at timestamptz default now()
);

-- 보고 주기별 요청 체크리스트
create table requests (
  id uuid primary key default gen_random_uuid(),
  indicator_id uuid references indicators(id) on delete cascade,
  reporting_period text not null,   -- 예: '2026'
  status text not null default 'not_started',  -- not_started | requested | received | verified
  received_by text,
  memo text,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (indicator_id, reporting_period)  -- 지표 x 보고주기당 1행, upsert 대상 키
);

-- RLS: 파일럿은 단일 조직 기준이므로 인증된 사용자 전체 허용
alter table indicators enable row level security;
alter table indicator_history enable row level security;
alter table requests enable row level security;

create policy "authenticated users can do everything on indicators"
  on indicators for all
  using (auth.role() = 'authenticated');

create policy "authenticated users can do everything on requests"
  on requests for all
  using (auth.role() = 'authenticated');

create policy "authenticated users can read history"
  on indicator_history for select
  using (auth.role() = 'authenticated');

-- 시드 데이터: K-ESG 가이드라인 기준 S(사회) 지표 8개 (CLAUDE.md 2절)
-- department/contact_name/contact_info/evidence_criteria/last_confirmed_at은
-- 실제 파일럿 기업 온보딩 시 채워 넣을 것 (현재는 NULL, "미확인" 상태로 노출됨).
insert into indicators (name, category, definition, department, sort_order) values
  ('목표 수립 및 공시', '사회', '사회 분야 단기/중장기 목표 수립·공시 여부 (0~100점, 5단계)', 'ESG사무국', 1),
  ('신규 채용 및 고용 유지', '사회', '신규채용지수, 고용 규모 CAGR', '인사(HR)', 2),
  ('정규직 비율', '사회', '(총 근로자 - 비정규직) / 총 근로자', '인사(HR)', 3),
  ('자발적 이직률', '사회', '자발적 퇴사자 수 / 연말 총 직원수, 4개년 추세', '인사(HR)', 4),
  ('1인당 교육훈련비', '사회', '교육훈련 지출 / 총 구성원 수, 4개년 추세', '인사(HR)/교육팀', 5),
  ('여성 구성원 비율', '사회', '전체 대비 여성 비율 vs 미등기임원 대비 여성 비율 격차', '인사(HR)', 6),
  ('여성 급여 비율', '사회', '조직 1인 평균 급여 대비 여성(또는 남성) 1인 평균 급여', '인사(HR)/재무', 7),
  ('장애인 고용률', '사회', '장애인 상시근로자 수 / 전체 상시근로자 수, 의무고용률 대비', '인사(HR)', 8);
