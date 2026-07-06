# RESEARCH — 배경 리서치 (Claude Code 빌드에는 직접 쓰이지 않음)

> 이 문서는 "왜 이 제품을 만드는가"에 대한 근거 자료입니다.
> 실제 빌드 스펙은 `CLAUDE.md`를 참고하세요. 이 문서는 판단이 애매할 때 참고용입니다.

---

## 1. 문제 정의

ESG S 지표는 임직원, 협력사, 고객, 지역사회 등 다양한 이해관계자에 걸쳐 있어 데이터가 여러 부서와 담당자에게 분산되어 관리된다. 이 데이터는 이메일·엑셀 기반으로 부서 간 수작업으로 취합되며, 데이터 탐색 및 검증 과정에 지속가능팀 근무시간의 최대 30%가 소요된다(출처: SAM Corporate). 이로 인해 보고서 작성 과정에서 반복적인 취합과 검증 지연이 발생하며 조직 전체의 리소스 비효율이 지속적으로 누적된다. 또한 검증 지연이 공시 기한을 초과할 경우, 개정 산업안전보건법 제10조의2에 따라 상시근로자 500인 이상 사업자 기준 최대 1천만 원의 과태료 등 직접적인 재무 리스크로 이어질 수 있다.

### 근거가 되는 공통 패턴

| 공통 패턴 | 근거 |
|---|---|
| ESG S는 일회성이 아니라 지속적인 운영 업무 | K-ESG 가이드라인(매년 관리 지표), LVMH(75개 메종 공통 프레임워크), 호텔신라(SCI 매년 측정) |
| 데이터가 여러 부서에 분산 | PwC(이메일·엑셀 수집), K-ESG(HR·안전·협력사·고객·개인정보 등 다부서 평가) |
| 활동보다 정량 성과 측정이 중요 | K-ESG 대부분 정량 KPI 기반 평가 |
| 담당자 교체 시 연속성 단절 | Deloitte("담당자 퇴사 시 보고 중단") |
| 소규모 팀이 전담 | Conference Board(2024): 조사 기업의 60% 이상이 핵심 지속가능성 팀 1~5명 |

---

## 2. 사용자 정의

| 항목 | 내용 |
|---|---|
| **사용자** | 상시근로자 500인 이상(개정 산업안전보건법 제10조의2 공시 의무 대상)이면서 ESG 전담 인력은 1~3인에 불과한 중견 호텔기업의 ESG 담당자 |
| **역할** | S 지표에 필요한 데이터를 여러 부서(HR, 구매, CS, 사회공헌 등)로부터 취합하고 보고서를 작성하며, 매년 반복되는 공시 주기(연 1회 이상)를 담당 |
| **목표** | 필요한 데이터를 빠르고 정확하게 수집하여 공시 기준에 맞는 지속가능경영보고서를 작성하고, 담당자 교체·인수인계 상황에서도 업무 연속성을 유지 |
| **페인포인트** | 담당 부서·담당자·과거 증빙 기준에 대한 정보가 조직의 기록으로 남지 않아, 인사이동·담당자 교체 시마다 "누구에게, 무엇을 근거로" 요청해야 하는지 처음부터 다시 알아내야 함 |
| **As-Is 유저플로우** | 공시 기준 확인 → (전임자 자료 부재 시) 작년 보고서 역추적으로 담당 부서 추정 → 담당 부서·담당자 재확인 → 이메일·메신저 요청 → 엑셀 취합 → 지표 정의 불일치 확인 및 조율 → 누락 확인 및 재요청 → 보고서 작성 |
| **Job to be Done** | "매 보고 주기마다 '누구에게, 무엇을, 어떤 기준으로' 요청해야 하는지 처음부터 다시 알아내는 시간을 없애고 싶다" (담당자 교체 여부와 무관하게 데이터 출처·기준·증빙 이력이 조직의 자산으로 남아있기를 원함) |

---

## 3. 가설 및 검증 계획

> ESG S 지표별 담당 부서·데이터 항목·증빙 기준을 한곳에서 즉시 확인할 수 있다면, 데이터 요청 대상 탐색과 기준 재확인에 소요되는 시간이 약 35% 감소할 것으로 기대된다(출처: McKinsey Global Institute, *"The Social Economy"*, 2012). 이는 보고 지연 및 수치 오류 가능성을 낮추는 데 기여하며, 검증 지연이 누적되어 법정 공시 기한을 초과하는 경우에 한해 산업안전보건법 제10조의2에 따른 과태료(최대 1천만 원) 리스크 완화에도 기여할 수 있다.

- **검증 기간**: MVP 배포 후 **8주** (근거: B2B SaaS 파일럿은 6~8주가 이상적 — Dipam Shah, Medium)
- **성공 기준(1차, 정성적)**: "담당자·기준 확인에 이메일/메신저로 1~2일 걸리던 것"이 "도구 내 당일 확인"으로 전환되는지
- **성공 기준(2차, 정량적, 8주 후 측정)**: 탐색·재확인 소요 시간 감소율(목표 참고치 35%는 파일럿 실측치로 반드시 대체할 것)
- ⚠️ 35%는 스코프가 다른 벤치마크(사내 소셜 지식 공유 도구, 2012년 연구)에서 가져온 참고치이며, 우리 MVP의 실제 성과와 다를 수 있음.

---

## 4. 참고 자료 (출처 모음)

| 구분 | 출처 |
|---|---|
| 문제 정의 데이터 | SAM Corporate, *"Five Reasons Manual ESG Reporting Costs SMEs More Than They Think"*, https://samcorporate.com/manual-esg-reporting-costs-smes-hidden-expenses/ |
| 담당자 교체·연속성 문제 | Deloitte, *"ESG Explained #3: What are the challenges in ESG reporting?"*, https://www.deloitte.com/ce/en/services/consulting/perspectives/esg-explained-3-what-are-the-challenges-in-esg-reporting.html |
| 데이터 수작업 취합 | PwC, *"Tech-enabled ESG reporting"*, https://www.pwc.ca/en/services/sustainability/insights/esg-reporting-insights/tech-enabled-reporting-playbook.html |
| S 이니셔티브 측정 어려움 | KPMG, *"Social Sustainability"*, https://kpmg.com/ca/en/services/environmental-social-and-governance/social-sustainability.html |
| ESG 소프트웨어 사용률(9%) | WEF/Diligent, https://www.weforum.org/stories/2021/10/no-1-esg-challenge-data-environmental-social-governance-reporting/ |
| 팀 규모(1~5인, 60%) | The Conference Board, *"Best Practices for Corporate Sustainability Teams"*, https://corpgov.law.harvard.edu/2025/09/06/best-practices-for-corporate-sustainability-teams/ |
| 탐색 시간 35% 절감 | McKinsey Global Institute, *"The Social Economy"*, 2012, https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy |
| 파일럿 기간(6~8주) | Dipam Shah, *"B2B SaaS Pilots: A Disciplined Approach"*, Medium, https://medium.com/@dipam.iitm/b2b-saas-pilots-a-disciplined-approach-d586e912063a |
| K-ESG 가이드라인 사회 항목 | 한국생산성본부 지속가능경영지원센터, K-ESG 가이드라인 |
| LVMH 사례 | https://www.lvmh.com/en/suppliers , https://www.lvmh.com/group/lvmh-commitments/social-environmental-responsibility/ |
| 호텔신라 사례 | 2024 호텔신라 지속가능경영보고서 (KIND 공시) |
| 산업안전보건법 제10조의2 | 개정 산업안전보건법 (2026.8.1 시행) |
| 신라호텔 브랜드 아이덴티티 | Sodiumpartners × Landor, *"The Shilla"* 리브랜딩 사례, https://www.sodiumpartners.com/wk_shilla (⚠️ 공식 Hex 코드는 비공개 — CLAUDE.md의 컬러는 이 사례에서 유추한 근사치) |
