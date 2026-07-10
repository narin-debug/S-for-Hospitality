-- 기존 14개 지표 프로젝트를 K-ESG S지표 22개 전체로 확장하는 마이그레이션.
-- 새 프로젝트라면 이 파일 대신 schema.sql만 실행하면 됩니다.

-- 1) 기존 14개 지표의 sort_order를 22개 기준 정식 순번으로 재정렬
update indicators set sort_order = 8  where name = '여성 구성원 비율';
update indicators set sort_order = 9  where name = '여성 급여 비율';
update indicators set sort_order = 10 where name = '장애인 고용률';
update indicators set sort_order = 12 where name = '산업재해율';
update indicators set sort_order = 14 where name = '인권 리스크 평가';
update indicators set sort_order = 15 where name = '협력사 ESG 경영';
update indicators set sort_order = 18 where name = '전략적 사회공헌';
update indicators set sort_order = 20 where name = '정보보호 시스템 구축';
update indicators set sort_order = 22 where name = '사회 법/규제 위반';

-- 2) 나머지 8개 지표 추가
insert into indicators (name, code, category, definition, department, sort_order) values
  ('복리후생비', 'S-2-5', '노동', '복리후생 항목별 지출 총액 및 종업원 1인당 환산액, 산업 평균 대비', '인사(HR)', 6),
  ('결사의 자유 보장', 'S-2-6', '노동', '노동조합 가입률, 단체협약 적용률 등 결사의 자유 보장 현황', '노무팀', 7),
  ('안전보건 추진체계', 'S-4-1', '산업안전', '안전보건 경영방침 및 조직·인력 운영 현황 (안전보건관리책임자 선임 등)', '안전보건팀', 11),
  ('안전정책 수립', 'S-5-1', '인권', '인권 경영방침 수립 및 공식화 여부, 이사회/경영진 승인 현황', '컴플라이언스팀', 13),
  ('협력사 ESG 지원', 'S-6-2', '동반성장', '협력사 대상 ESG 교육·컨설팅·자금 지원 실적', '구매팀', 16),
  ('협력사 ESG 협약사항', 'S-6-3', '동반성장', '협력사와의 계약서 내 ESG 준수 조항 반영 비율', '구매팀', 17),
  ('구성원 봉사참여', 'S-7-2', '지역사회', '임직원 자원봉사 참여율 및 1인당 봉사시간', '사회공헌팀', 19),
  ('개인정보 침해 및 구제', 'S-8-2', '정보보호', '개인정보 침해사고 건수 및 피해구제 조치 현황', '정보보안팀', 21);
