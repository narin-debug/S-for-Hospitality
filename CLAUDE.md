# ESG S TRACE (MVP) — 빌드 스펙

> 이 파일은 Claude Code가 세션 시작 시 자동으로 읽는 프로젝트 컨텍스트 파일입니다.
> 배경 리서치·근거 자료는 `RESEARCH.md`를 참고하세요. 이 문서는 실제 코드 작성 기준입니다.

---

## 0. 한 줄 요약

호텔업계 ESG 담당자가 S(사회) 지표별 담당 부서·담당자·증빙 기준을 한곳에서 조회·체크·이력 관리할 수 있는 내부 업무 도구.

- **제작 기간**: 3일
- **도메인**: Travel & Hospitality (신라호텔 아이덴티티를 디자인 톤의 레퍼런스로 사용)

---

## 1. 스코프

**In Scope (3일 빌드)**
- S 지표 마스터 정보 조회 (담당 부서/담당자/증빙 기준)
- 정보 최종 확인일 표시 + 갱신(정보가 바뀌었을 때 업데이트) 기능
- 보고 주기별 요청 체크리스트 (완료 여부 + 메모)
- CSV 다운로드

**Out of Scope (이번 MVP 제외)**
- 이메일/메신저 자동 발송 연동
- 다중 조직(멀티테넌시) 지원 — 파일럿은 단일 기업 기준
- 부서 조직도 자동 동기화
- 지표 정의 표준화/거버넌스 기능
- 권한별 접근 제어 (역할 기반 RBAC)

---

## 2. S 지표 마스터 리스트 (K-ESG 가이드라인 기준, 시드 데이터)

K-ESG S(사회) 진단 항목은 22개, 9개 카테고리로 구성된다. MVP에서는 22개를 전부 넣지 않고,
**9개 카테고리 전부 최소 1개씩** 대표 항목만 시딩해 "이 도구가 특정 부서(HR)에만 국한되지
않고 어떤 담당 부서의 지표에도 통한다"는 걸 보여주는 선에서 그친다. 나머지 항목은 실제
파일럿 온보딩 시 필요에 따라 추가한다.

| # | 코드 | 카테고리 | 지표명 | 정의 요약 | 예상 주관 부서(가정) |
|---|---|---|---|---|---|
| 1 | S-1-1 | 목표 | 목표 수립 및 공시 | 사회 분야 단기/중장기 목표 수립·공시 여부 (0~100점, 5단계) | ESG사무국 |
| 2 | S-2-1 | 노동 | 신규 채용 및 고용 유지 | 신규채용지수, 고용 규모 CAGR | 인사(HR) |
| 3 | S-2-2 | 노동 | 정규직 비율 | (총 근로자 - 비정규직) / 총 근로자 | 인사(HR) |
| 4 | S-2-3 | 노동 | 자발적 이직률 | 자발적 퇴사자 수 / 연말 총 직원수, 4개년 추세 | 인사(HR) |
| 5 | S-2-4 | 노동 | 1인당 교육훈련비 | 교육훈련 지출 / 총 구성원 수, 4개년 추세 | 인사(HR)/교육팀 |
| 6 | S-3-1 | 다양성 및 양성평등 | 여성 구성원 비율 | 전체 대비 여성 비율 vs 미등기임원 대비 여성 비율 격차 | 인사(HR) |
| 7 | S-3-2 | 다양성 및 양성평등 | 여성 급여 비율 | 조직 1인 평균 급여 대비 여성(또는 남성) 1인 평균 급여 | 인사(HR)/재무 |
| 8 | S-3-3 | 다양성 및 양성평등 | 장애인 고용률 | 장애인 상시근로자 수 / 전체 상시근로자 수, 의무고용률 대비 | 인사(HR) |
| 9 | S-4-2 | 산업안전 | 산업재해율 | 산업재해 발생 건수 기준 재해율, 업종 평균 대비 추세 | 안전보건팀 |
| 10 | S-5-2 | 인권 | 인권 리스크 평가 | 인권 영향평가 실시 여부 및 개선조치 이행 현황 | 컴플라이언스팀 |
| 11 | S-6-1 | 동반성장 | 협력사 ESG 경영 | 협력사 대상 ESG 평가·관리체계 운영 현황 | 구매팀 |
| 12 | S-7-1 | 지역사회 | 전략적 사회공헌 | 중장기 사회공헌 전략 수립 및 핵심 프로그램 운영 현황 | 사회공헌팀 |
| 13 | S-8-1 | 정보보호 | 정보보호 시스템 구축 | 정보보호 관리체계(ISMS 등) 구축·인증 현황 | 정보보안팀 |
| 14 | S-9-1 | 법/규제위반 | 사회 법/규제 위반 | 사회 부문 법령 위반 및 제재 건수·금액 현황 | 법무팀 |

> 주관 부서는 가정치입니다. 실제 파일럿 기업의 조직도에 맞춰 시딩 시 수정 필요.

---

## 3. To-Be 유저플로우

```
[지표 리스트 화면]
  ↓ S 지표 선택 (8개 카드/리스트)
[담당자·증빙 확인 화면]
  - 담당 부서, 담당자명, 연락처, 증빙 기준 표시
  - "최종 확인일: YYYY-MM-DD" 타임스탬프 노출
  - [정보가 바뀌었어요] 버튼 → 수정 폼 → 저장 시 확인일 갱신
  ↓
[요청 체크 화면]
  - 이번 보고 주기(예: 2026년 사업연도) 기준 요청 상태 체크
  - 상태: 미시작 / 요청함 / 수령함 / 검증완료
  - 메모 필드 (누가, 언제, 어떤 증빙으로 받았는지)
  ↓
[CSV 다운로드]
  - 이번 회차 전체 지표의 담당자/상태/메모를 CSV로 내보내기
```

## 4. 기능 요구사항 (MoSCoW)

**Must (3일 내 필수)**
- 지표 목록 조회 (8개 시드 데이터)
- 지표별 담당 부서/담당자/증빙 기준 상세 조회
- 최종 확인일 표시 + 정보 갱신 기능
- 보고 주기별 체크리스트 (상태 변경 + 메모)
- CSV 다운로드

**Should (시간 남으면)**
- 지표별 변경 이력(누가 언제 무엇을 바꿨는지) 조회
- 진행률 요약(예: "8개 중 5개 완료")

**Won't (이번 MVP 제외)**
- 자동 알림/이메일 발송
- 다중 사용자 권한 분리
- 지표 정의 표준화 가이드 기능

---

## 5. 디자인 가이드

### 5.1 톤앤매너

내부 업무 도구다. **신뢰감·명료함·차분함**이 최우선이며 장식은 배제한다. 다만 호텔업계 대상 도구라는 정체성을 위해, **신라호텔 브랜드 아이덴티티**(짙은 워드마크 + 무궁화 문양의 골드/브론즈 보조 패턴, Landor 리브랜딩 기준)에서 톤을 가져오되 딱 한 곳(시그니처 요소)에만 절제해서 사용한다.

> ⚠️ 아래 컬러는 신라호텔의 **공식 브랜드 가이드라인이 아니며**, 공개된 리브랜딩 사례 설명을 근거로 유추한 근사치입니다. 실제 신라호텔 자산(로고 파일, PPT 템플릿 등)을 구할 수 있다면 그 값으로 교체할 것.

### 5.2 컬러 토큰

| 이름 | 용도 | Hex |
|---|---|---|
| Ink | 기본 텍스트 | `#1A1A1A` |
| Paper | 배경 | `#F7F4EE` |
| Shilla Gold | 시그니처 강조색 (버튼, 활성 상태) | `#A8813D` |
| Slate | 보조 텍스트/테두리 | `#55524C` |
| Confirmed Green | "확인 완료" 상태 전용 | `#2F6B4F` |
| Pending Amber | "요청 대기/지연" 상태 전용 | `#C1531B` |

- Shilla Gold는 신라호텔 무궁화 패턴의 골드/브론즈 톤에서 가져온 시그니처 색으로, 버튼·활성 탭·강조 텍스트 등 "지금 조작 가능한 것"에만 쓴다.
- Confirmed Green / Pending Amber는 브랜드색이 아니라 **상태를 나타내는 기능색**이므로 장식 목적으로 섞어 쓰지 않는다.

### 5.3 타이포그래피

- **Display (제목, 절제해서 사용)**: Fraunces — 세리프체, 큰 제목에만 사용
- **Body/UI (대부분의 텍스트)**: Inter — 데이터 밀도 높은 화면에 가독성 우선
- **Utility (날짜, ID, CSV 미리보기)**: IBM Plex Mono

### 5.4 레이아웃 원칙

- 단일 컬럼 중심 작업 흐름 (좌측 지표 리스트 → 우측 상세 패널의 2단 구성도 가능)
- 상단에 전체 진행률 표시 (예: "8개 지표 중 5개 확인 완료")
- 지표 카드는 호텔 룸키/체크인 카드 형태의 모서리 탭 디자인을 시그니처로 사용 — 이 하나로 절제하고 다른 곳엔 장식 추가 금지
- 모바일 반응형은 우선순위 낮음 (내부 데스크톱 업무 도구)
- 키보드 포커스 표시, 빈 상태(empty state)에는 "무엇을 해야 하는지" 명확히 안내

### 5.5 카피 원칙

- 사용자가 통제하는 것을 기준으로 이름 붙이기
- 능동태, 현재형 유지: "저장" → "저장됨" (같은 동사 유지)
- 오류 메시지는 사과하지 않고 무엇이 잘못됐는지와 다음 행동을 명확히 안내
- 빈 화면은 행동을 유도하는 문구로 채움

---

## 6. 기술 스택 & 아키텍처

- **프레임워크**: Next.js (App Router, TypeScript)
- **스타일링**: Tailwind CSS
- **백엔드/DB**: Supabase (Postgres + Auth)
- **배포**: GitHub → Vercel (GitHub 연동으로 push 시 자동 배포)
- **인증**: Supabase Auth, 이메일 매직링크 (소규모 팀 1~3인 기준 단순화)

---

## 7. Supabase 설정

### 7.1 스키마 (SQL)

```sql
-- 지표 마스터 테이블
create table indicators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text,                 -- K-ESG S지표 진단 항목 코드 (예: 'S-4-2')
  category text,
  definition text,
  calculation_formula text,
  department text,           -- 담당 부서
  contact_name text,         -- 담당자명
  contact_info text,         -- 연락처 (이메일/전화)
  evidence_criteria text,    -- 증빙 기준
  last_confirmed_at timestamptz,
  last_confirmed_by text,
  sort_order integer not null default 0,  -- 목록 표시 순서. 시드 데이터가 동일 시각에 insert되어
                                           -- created_at만으로는 정렬이 안정적이지 않아 구현 중 추가함.
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 지표 변경 이력 (Should 항목, 시간 남으면 구현)
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
  updated_at timestamptz default now()
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
```

### 7.2 시드 데이터

`indicators` 테이블에 위 2절의 8개 K-ESG 지표를 초기 데이터로 삽입. `department`, `contact_name`, `contact_info`, `evidence_criteria`, `last_confirmed_at`은 실제 파일럿 기업 온보딩 시 채워 넣을 것.

### 7.3 환경 변수

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # 서버 액션에서만 사용, 클라이언트 노출 금지
```

---

## 8. GitHub / Vercel 배포 설정

1. GitHub 레포 생성 (private 권장 — 내부 조직 정보 포함 가능성)
2. `.env.example` 파일에 환경 변수 키 이름만 커밋 (실제 값은 커밋 금지)
3. Vercel에서 GitHub 레포 연동 (Import Project)
4. Vercel 대시보드 → Settings → Environment Variables에 실제 Supabase 값 등록
5. `main` 브랜치 push → 자동 프로덕션 배포 / 그 외 브랜치 push → 자동 Preview URL 생성
6. 별도 CI 파이프라인은 3일 MVP 단계에서 생략

---

## 9. Claude Code 작업 시 유의사항

- 이 문서의 1~8절을 기준으로 코드를 작성할 것. 스코프를 임의로 확장하지 말 것(1절 Out of Scope 참고).
- 디자인 관련 결정을 내릴 때는 5절의 컬러/타이포/시그니처 요소를 반드시 따를 것.
- Supabase 스키마를 변경해야 할 경우, 이 문서의 7.1절도 함께 업데이트할 것.
- 3일이라는 시간 제약을 항상 염두에 두고, Should/Won't 항목에 시간을 쓰지 말 것.
- "왜 이렇게 만드는지"에 대한 배경이 필요하면 `RESEARCH.md`를 참고할 것(코드에는 반영하지 않음).
