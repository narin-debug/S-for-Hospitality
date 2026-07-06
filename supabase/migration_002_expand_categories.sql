-- 이미 schema.sql(8개 지표)을 실행한 기존 Supabase 프로젝트에
-- code 컬럼을 추가하고, 카테고리를 세분화하고, 나머지 6개 K-ESG 카테고리의
-- 대표 지표 1개씩을 추가하는 마이그레이션.
-- 새 프로젝트라면 이 파일 대신 schema.sql만 실행하면 됩니다.

alter table indicators add column if not exists code text;

update indicators set code = 'S-1-1', category = '목표' where name = '목표 수립 및 공시';
update indicators set code = 'S-2-1', category = '노동' where name = '신규 채용 및 고용 유지';
update indicators set code = 'S-2-2', category = '노동' where name = '정규직 비율';
update indicators set code = 'S-2-3', category = '노동' where name = '자발적 이직률';
update indicators set code = 'S-2-4', category = '노동' where name = '1인당 교육훈련비';
update indicators set code = 'S-3-1', category = '다양성 및 양성평등' where name = '여성 구성원 비율';
update indicators set code = 'S-3-2', category = '다양성 및 양성평등' where name = '여성 급여 비율';
update indicators set code = 'S-3-3', category = '다양성 및 양성평등' where name = '장애인 고용률';

insert into indicators (name, code, category, definition, department, sort_order) values
  ('산업재해율', 'S-4-2', '산업안전', '산업재해 발생 건수 기준 재해율, 업종 평균 대비 추세', '안전보건팀', 9),
  ('인권 리스크 평가', 'S-5-2', '인권', '인권 영향평가 실시 여부 및 개선조치 이행 현황', '컴플라이언스팀', 10),
  ('협력사 ESG 경영', 'S-6-1', '동반성장', '협력사 대상 ESG 평가·관리체계 운영 현황', '구매팀', 11),
  ('전략적 사회공헌', 'S-7-1', '지역사회', '중장기 사회공헌 전략 수립 및 핵심 프로그램 운영 현황', '사회공헌팀', 12),
  ('정보보호 시스템 구축', 'S-8-1', '정보보호', '정보보호 관리체계(ISMS 등) 구축·인증 현황', '정보보안팀', 13),
  ('사회 법/규제 위반', 'S-9-1', '법/규제위반', '사회 부문 법령 위반 및 제재 건수·금액 현황', '법무팀', 14);
